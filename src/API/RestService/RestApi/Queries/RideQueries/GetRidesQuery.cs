﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using DataTransferObjects;
using DataTransferObjects.GroupDtos;
using DataTransferObjects.VehicleDtos;
using Domain.Contracts.Repositories;
using Domain.Enums;
using IdentifiersShared.Identifiers;
using MediatR;
using Microsoft.AspNetCore.Http;
using RestApi.DTOs.Ride;
using RestApi.DTOs.Stop;
using RestApi.DTOs.User;

namespace RestApi.Queries.RideQueries
{
	public class GetRidesQuery : IRequest<IEnumerable<RideDto>>
	{
		public GetRidesQuery(GroupId groupId,
			RideDirection rideDirection,
			DateTime dateTime,
			AppUserId tokenUserId)
		{
			GroupId = groupId;
			RideDirection = rideDirection;
			DateTime = dateTime;
			TokenUserId = tokenUserId;
		}

		public GroupId GroupId { get; }
		public RideDirection RideDirection { get; }
		public DateTime DateTime { get; }

		public AppUserId TokenUserId { get; }
	}

	public class GetRidesQueryHandler : IRequestHandler<GetRidesQuery, IEnumerable<RideDto>>
	{
		private readonly IGroupRepository _groupRepository;
		private readonly IRideRepository _rideRepository;

		public GetRidesQueryHandler(IRideRepository repository, IGroupRepository groupRepository)
		{
			_rideRepository = repository;
			_groupRepository = groupRepository;
		}

		public async Task<IEnumerable<RideDto>> Handle(GetRidesQuery request,
			CancellationToken cancellationToken)
		{
			var isUserInGroup = await _groupRepository.DoesUserExistsInGroup(request.GroupId,
				request.TokenUserId,
				cancellationToken);

			if (!isUserInGroup)
				throw new ApiException("User does not have access to this group rides", StatusCodes.Status403Forbidden);

			var rides = await _rideRepository.GetPartWhereUserNotParticipantAsNoTrackingAsync(request.GroupId,
				request.TokenUserId,
				request.RideDirection,
				request.DateTime,
				cancellationToken);
			try
			{
				var rideDtos = rides.Select(x => new RideDto(new RideOwnerDto(x.Owner.Rating,
						x.Owner.FirstName,
						x.Owner.LastName,
						x.Owner.Id),
					new GroupDto(x.Group.UserGroups.Count, x.Group.Id,
						new LocationDto(x.Group.Location.Longitude, x.Group.Location.Latitude), x.Group.Name),
					new LocationDto(x.Location.Longitude, x.Location.Latitude),
					x.Price,
					x.RideDirection,
					x.Stops.Select(a => new StopDto(new LocationDto(a.Location.Longitude, a.Location.Latitude),
						 new ParticipantDto(a.Participant.Id, a.Participant.FirstName, a.Participant.LastName)))
						.ToList(),
					x.Date,
					x.Id,
					x.SeatsLimit,
					x.RecurringRideId));

				return rideDtos;
			}
			catch (Exception ex)
			{
				throw new ApiException(ex);
			}
		}
	}
}
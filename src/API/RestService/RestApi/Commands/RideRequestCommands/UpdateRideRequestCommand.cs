﻿using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Domain.Contracts;
using Domain.Contracts.Repositories;
using Domain.Entities.Intersections;
using IdentifiersShared.Identifiers;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace RestApi.Commands.RideRequestCommands
{
	public class UpdateRideRequestCommand : IRequest
	{
		public UpdateRideRequestCommand(RideRequestId rideRequestId, bool isAccepted, AppUserId tokenUserId)
		{
			RideRequestId = rideRequestId;
			IsAccepted = isAccepted;
			TokenUserId = tokenUserId;
		}

		public RideRequestId RideRequestId { get; }
		public bool IsAccepted { get; }
		public AppUserId TokenUserId { get; }
	}

	public class UpdateRideRequestCommandHandler : AsyncRequestHandler<UpdateRideRequestCommand>
	{
		private readonly IRideParticipantRepository _rideParticipantRepository;
		private readonly IRideRequestRepository _rideRequestRepository;
		private readonly IUnitOfWork _unitOfWork;

		public UpdateRideRequestCommandHandler(IRideRequestRepository rideRequestRepository,
			IUnitOfWork unitOfWork,
			IRideParticipantRepository rideParticipantRepository)
		{
			_rideRequestRepository = rideRequestRepository;
			_unitOfWork = unitOfWork;
			_rideParticipantRepository = rideParticipantRepository;
		}

		protected override async Task Handle(UpdateRideRequestCommand request, CancellationToken cancellationToken)
		{
			var rideRequest = await _rideRequestRepository.GetByIdAsync(request.RideRequestId, cancellationToken);

			if (rideRequest.RideOwnerId != request.TokenUserId)
				throw new ApiException("User does not have access to update group invite",
					StatusCodes.Status403Forbidden);

			rideRequest.IsAccepted = request.IsAccepted;
			rideRequest.IsPending = false;

			if (request.IsAccepted)
			{
				var rideParticipants = await _rideParticipantRepository.GetParticipantsByRideId(rideRequest.RideId,
					cancellationToken);
				rideParticipants.Add(new UserParticipatedRide(request.TokenUserId, rideRequest.RideId));
			}

			try
			{
				await _unitOfWork.SaveAsync(cancellationToken);
			}
			catch (DbUpdateException ex)
			{
				throw new ApiException(ex);
			}
		}
	}
}
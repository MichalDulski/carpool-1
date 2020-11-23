﻿using System;
using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using DataAccessLayer.Repositories.Group;
using DataAccessLayer.Repositories.User;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace RestApi.Commands.GroupCommands
{
	public class AddGroupCommandHandler : IRequestHandler<AddGroupCommand, Guid>
	{
		private readonly IGroupRepository _repository;
		private readonly IUserRepository _userRepository;

		public AddGroupCommandHandler(IGroupRepository repository, IUserRepository userRepository)
		{
			_repository = repository ?? throw new ArgumentNullException(nameof(repository));
			_userRepository = userRepository;
		}

		public async Task<Guid> Handle(AddGroupCommand request, CancellationToken cancellationToken)
		{
			if (!string.IsNullOrEmpty(request.Code)
			    && await _repository.GroupCodeExists(request.Code).ConfigureAwait(false))
				throw new ApiProblemDetailsException($"Group code {request.Code} already exists",
					StatusCodes.Status409Conflict);

			if (!await _userRepository.ExistsWithId(request.OwnerId, cancellationToken).ConfigureAwait(false))
				throw new ApiProblemDetailsException($"ApplicationUser with id {request.OwnerId} does not exist.",
					StatusCodes.Status404NotFound);


			var group = new Group
			{
				Name = request.Name,
				Code = request.Code,
				OwnerId = request.OwnerId
			};

			group.Location = request.Location ?? throw new ApiException("Group location cannot be empty");


			await _repository.AddAsync(group, cancellationToken).ConfigureAwait(false);
			try
			{
				await _repository.SaveAsync(cancellationToken).ConfigureAwait(false);
			}
			catch (DbUpdateException ex)
			{
				throw new ApiException(ex);
			}

			return group.Id;
		}
	}
}
﻿using System;
using System.Collections.Generic;
using Domain.Entities;
using MediatR;

namespace RestApi.Queries.RideQueries
{
	public class GetUserOwnedRidesQuery : IRequest<IEnumerable<Ride>>
	{
		public GetUserOwnedRidesQuery(Guid userId, bool past)
		{
			UserId = userId;
			Past = past;
		}

		public Guid UserId { get; set; }
		public bool Past { get; set; }
	}
}
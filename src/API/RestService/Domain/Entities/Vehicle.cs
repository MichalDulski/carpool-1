﻿using Domain.Abstract;
using IdentifiersShared.Identifiers;

namespace Domain.Entities
{
	public class Vehicle : BaseEntity<VehicleId>
	{
		public string Name { get; set; }
		public AppUserId AppUserId { get; set; }
	}
}
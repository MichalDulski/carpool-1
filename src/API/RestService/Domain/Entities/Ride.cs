﻿using System;
using System.Collections.Generic;
using Domain.Abstract;
using Domain.Entities.Intersections;
using Domain.Enums;
using Domain.ValueObjects;
using IdentifiersShared.Identifiers;

namespace Domain.Entities
{
	public class Ride : BaseEntity<RideId>
	{
		private Ride(){}
		
		public Ride(RideId rideId, 
			AppUserId ownerId, 
			GroupId groupId,
			DateTime date,
			double price,
			Location location,
			RideDirection rideDirection,
			List<Stop> stops,
			byte seatsLimit,
			RecurringRideId? recurringRideId = null)
		{
			Id = rideId;
			OwnerId = ownerId;
			GroupId = groupId;
			Date = date;
			Price = price;
			Location = location;
			RideDirection = rideDirection;
			Stops = stops;
			SeatsLimit = seatsLimit;
			RecurringRideId = recurringRideId;
		}
		
		public AppUserId OwnerId { get; set; }
		public ApplicationUser Owner { get; set; }
		public GroupId GroupId { get; set; }
		public Group Group { get; set; }
		public DateTime Date { get; set; }
		public double Price { get; set; }
		public Location Location { get; set; }
		public RideDirection RideDirection { get; set; }
		public List<Stop> Stops { get; set; }
		public byte SeatsLimit { get; set; }
		public RecurringRideId? RecurringRideId { get; set; }
	}
}
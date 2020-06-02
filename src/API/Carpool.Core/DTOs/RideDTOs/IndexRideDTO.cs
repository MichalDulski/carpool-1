﻿using Carpool.Core.DTOs.StopDTOs;
using Carpool.Core.DTOs.UserDTOs;
using Carpool.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Carpool.Core.DTOs.RideDTOs
{
	public class IndexRideDTO
	{
		public Guid Id { get; set; }
		public IndexUserDTO Owner { get; set; }
		public List<IndexUserDTO> Participants { get; set; }

		public List<IndexStopDTO> Stops { get; set; }

		public Location Destination { get; set; }
		public Location StartingLocation { get; set; }

		public DateTime Date { get; set; }

		public bool IsUserParticipant { get; set; }

		private IndexRideDTO()
		{
		}

		public static IndexRideDTO FromRide(Ride ride)
		{
			return new IndexRideDTO()
			{
				Id = ride.Id,
				Owner = IndexUserDTO.FromUser(ride.Owner),
				Participants = ride.Participants.Select(participant => participant.User != null ? IndexUserDTO.FromUser(participant.User) : null).ToList(),
				Stops = ride.Stops.Select(stop => stop != null ? IndexStopDTO.GetFromStop(stop) : null).ToList(),
				Destination = ride.Destination ?? null,
				StartingLocation = ride.StartingLocation ?? null,
				Date = ride.Date,
			};
		}
	}
}
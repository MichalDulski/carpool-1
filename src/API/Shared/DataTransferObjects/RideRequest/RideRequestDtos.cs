﻿using IdentifiersShared.Identifiers;
using Newtonsoft.Json;
using RestApi.DTOs.Ride;
using RestApi.DTOs.User;

namespace DataTransferObjects.RideRequest
{
	public record RideRequestDto([JsonProperty("rideRequestId")]RideRequestId RideRequestId,
		[JsonProperty("ride")]RideRequestRideDto Ride,
		[JsonProperty("rideOwner")]RideOwnerDto RideOwner,
		[JsonProperty("requestingUser")]RideRequestingUserDto RequestingUser,
		[JsonProperty("isAccepted")]bool IsAccepted,
		[JsonProperty("isPending")]bool IsPending);

	public record AddRideRequestDto([JsonProperty("rideId")] RideId RideId,
		[JsonProperty("requestingUserId")] AppUserId RequestingUserId,
		[JsonProperty("rideOwnerId")]AppUserId RideOwnerId);

	public record UpdateRideRequestDto([JsonProperty("rideRequestId")] RideRequestId RideRequestId,
		[JsonProperty("isAccepted")] bool IsAccepted);
}
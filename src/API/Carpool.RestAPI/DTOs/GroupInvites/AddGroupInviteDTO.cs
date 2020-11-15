﻿using System;
using System.ComponentModel.DataAnnotations;

namespace Carpool.RestAPI.DTOs.GroupInvites
{
	public class AddGroupInviteDTO
	{
		public Guid Id { get; set; }

		[Required] public Guid GroupId { get; set; }

		[Required] public Guid InvitedUserId { get; set; }
	}
}
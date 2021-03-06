﻿using System.Threading.Tasks;
using DataTransferObjects.User;
using IdentifiersShared.Identifiers;
using RestEase;

namespace AuthServer.Services
{
	[Header("Authorization", "Bearer")]
	public interface IUserManagementService
	{
		[Post("api/users")]
		Task CreateUser([Body] AddUserDto addUser);

		[Put("api/users/{appUserId}")]
		Task UpdateUser([Path] long appUserId, [Body]UpdateUserDto updateUserDto);
		
		[Delete("api/users/{appUserId}")]
		Task<IndexUserDto> DeleteUser([Path] long appUserId);
	}
}
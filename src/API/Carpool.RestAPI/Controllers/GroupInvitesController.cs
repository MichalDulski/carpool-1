﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Carpool.Core.Models;
using Carpool.DAL.DatabaseContexts;
using Carpool.Core.DTOs.GroupInvitesDTOs;
using Carpool.Core.Models.Intersections;

namespace Carpool.RestAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class GroupInvitesController : Controller
	{
		private readonly CarpoolDbContext _context;

		public GroupInvitesController(CarpoolDbContext context)
		{
			_context = context;
		}

		// GET: api/GroupInvites
		[HttpGet]
		public async Task<ActionResult<IEnumerable<GroupInvite>>> GetGroupInvites()
		{
			return await _context.GroupInvites.ToListAsync();
		}

		// GET: api/GroupInvites/5
		[HttpGet("{id}")]
		public async Task<ActionResult<GroupInvite>> GetGroupInvite(Guid id)
		{
			var groupInvite = await _context.GroupInvites.FindAsync(id);

			if (groupInvite == null)
			{
				return NotFound();
			}

			return groupInvite;
		}

		[HttpGet("GetUserInvites/{userId}")]
		public async Task<ActionResult<List<GroupInvite>>> GetUserInvites(Guid userId)
		{
			var groupInviteDTOs = await _context.GroupInvites
				.Include(groupInvite => groupInvite.InvitedUser)
				.Include(groupInvite => groupInvite.Group)
				.Where(groupInvite => groupInvite.InvitedUserId == userId && groupInvite.IsPending == true)
				.Select(groupInvite => IndexGroupInviteDTO.FromGroupInvite(groupInvite))
				.ToListAsync();
			return Json(groupInviteDTOs);
		}

		// PUT: api/GroupInvites/5
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPut]
		public async Task<IActionResult> PutGroupInvite([FromBody]ChangeGroupInviteDTO changeGroupInviteDTO)
		{
			//if (id != groupInvite.Id)
			//{
			//	return BadRequest();
			//}

			var groupInvite = await _context.GroupInvites.Include(groupInvite => groupInvite.InvitedUser).ThenInclude(user => user.UserGroups).Include(groupInvite => groupInvite.Group).FirstOrDefaultAsync(groupInvite => groupInvite.Id == changeGroupInviteDTO.Id);

			groupInvite.IsPending = false;
			groupInvite.IsAccepted = changeGroupInviteDTO.IsAccepted;

			if (groupInvite.IsAccepted)
			{
				var userGroup = new UserGroup()
				{
					Group = groupInvite.Group,
					User = groupInvite.InvitedUser
				};
				groupInvite.InvitedUser.UserGroups.Add(userGroup);
			}

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!GroupInviteExists(changeGroupInviteDTO.Id))
				{
					return NotFound();
				}
				else
				{
					throw;
				}
			}

			return NoContent();
		}

		// POST: api/GroupInvites
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPost]
		public async Task<ActionResult<GroupInvite>> PostGroupInvite(AddGroupInviteDTO groupInviteDTO)
		{
			var groupInvite = new GroupInvite()
			{
				IsPending = true,
				Group = await _context.Groups.FirstOrDefaultAsync(group => group.Id == groupInviteDTO.GroupId),
				InvitedUser = await _context.Users.FirstOrDefaultAsync(user => user.Id == groupInviteDTO.InvitedUserId),
				IsAccepted = false,
			};
			_context.GroupInvites.Add(groupInvite);
			await _context.SaveChangesAsync();

			return CreatedAtAction("GetGroupInvite", new { id = groupInvite.Id }, groupInvite);
		}

		// DELETE: api/GroupInvites/5
		[HttpDelete("{id}")]
		public async Task<ActionResult<GroupInvite>> DeleteGroupInvite(Guid id)
		{
			var groupInvite = await _context.GroupInvites.FindAsync(id);
			if (groupInvite == null)
			{
				return NotFound();
			}

			_context.GroupInvites.Remove(groupInvite);
			await _context.SaveChangesAsync();

			return groupInvite;
		}

		private bool GroupInviteExists(Guid id)
		{
			return _context.GroupInvites.Any(e => e.Id == id);
		}
	}
}
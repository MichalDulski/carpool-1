﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Carpool.Core.Models;
using Carpool.DAL.DatabaseContexts;

namespace Carpool.RestAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CompaniesController : ControllerBase
	{
		private readonly CarpoolDbContext _context;

		public CompaniesController(CarpoolDbContext context)
		{
			_context = context;
		}

		// GET: api/Companies
		//[HttpGet]
		//public async Task<ActionResult<IEnumerable<Company>>> GetCompanies()
		//{
		//	return await _context.Companies.ToListAsync();
		//}

		// GET: api/Companies/5
		[HttpGet("{id}")]
		public async Task<ActionResult<Company>> GetCompany(Guid id)
		{
			var company = await _context.Companies.FindAsync(id);

			if (company == null)
			{
				return NotFound();
			}

			return company;
		}

		// PUT: api/Companies/5
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPut("{companyId}")]
		public async Task<IActionResult> PutCompany(Guid companyId, Company company)
		{
			if (companyId != company.Id)
			{
				return BadRequest();
			}

			_context.Entry(company).State = EntityState.Modified;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!CompanyExists(companyId))
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

		// POST: api/Companies
		// To protect from overposting attacks, enable the specific properties you want to bind to, for
		// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
		[HttpPost]
		public async Task<ActionResult<Company>> PostCompany(Company company)
		{
			_context.Companies.Add(company);
			await _context.SaveChangesAsync();

			return CreatedAtAction("GetCompany", new { id = company.Id }, company);
		}

		// DELETE: api/Companies/5
		[HttpDelete("{id}")]
		public async Task<ActionResult<Company>> DeleteCompany(Guid id)
		{
			var company = await _context.Companies.FindAsync(id);
			if (company == null)
			{
				return NotFound();
			}

			_context.Companies.Remove(company);
			await _context.SaveChangesAsync();

			return company;
		}

		private bool CompanyExists(Guid id)
		{
			return _context.Companies.Any(e => e.Id == id);
		}
	}
}
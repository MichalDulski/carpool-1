﻿using Carpool.Core.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace Carpool.Core.Models
{
	public class Company : ParentModel
	{
		public string Name { get; set; }
		public List<User> Users { get; set; }
	}
}
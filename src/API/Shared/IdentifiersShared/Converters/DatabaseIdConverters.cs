﻿using System;
using System.ComponentModel;
using System.Linq.Expressions;
using IdentifiersShared.Identifiers;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace IdentifiersShared.Converters
{
	public class RideIdValueConverter : ValueConverter<RideId, long>
	{
		public RideIdValueConverter(ConverterMappingHints mappingHints = null)
			: base(id => id.Value,
				value => new RideId(value),
				mappingHints) { }
	}

	public class StopIdValueConverter : ValueConverter<StopId, long>
	{
		public StopIdValueConverter(ConverterMappingHints mappingHints = null)
			: base(id => id.Value,
				value => new StopId(value),
				mappingHints) { }
	}

	public class UserIdValueConverter : ValueConverter<AppUserId, long>
	{
		public UserIdValueConverter(ConverterMappingHints mappingHints = null)
			: base(id => id.Value,
				value => new AppUserId(value),
				mappingHints) { }
	}

	public class UserIdTypeConverter : TypeConverter { }

	public class GroupIdValueConverter : ValueConverter<GroupId, long>
	{
		public GroupIdValueConverter(ConverterMappingHints mappingHints = null)
			: base(id => id.Value,
				value => new GroupId(value),
				mappingHints) { }
	}

	public class VehicleIdValueConverter : ValueConverter<VehicleId, long>
	{
		public VehicleIdValueConverter(ConverterMappingHints mappingHints = null)
			: base(id => id.Value,
				value => new VehicleId(value),
				mappingHints) { }
	}

	public class GroupInviteIdValueConverter : ValueConverter<GroupInviteId, long>
	{
		public GroupInviteIdValueConverter(ConverterMappingHints mappingHints = null)
			: base(id => id.Value,
				value => new GroupInviteId(value),
				mappingHints) { }
	}

	public class RideRequestIdValueConverter : ValueConverter<RideRequestId, long>
	{
		public RideRequestIdValueConverter(ConverterMappingHints mappingHints = null)
			: base(id => id.Value,
				value => new RideRequestId(value),
				mappingHints) { }
	}
	
	public class RecurringRideIdValueConverter : ValueConverter<RecurringRideId, long>
	{
		public RecurringRideIdValueConverter(ConverterMappingHints mappingHints = null)
			: base(id => id.Value,
				value => new RecurringRideId(value),
				mappingHints) { }
	}
}
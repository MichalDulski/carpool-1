﻿// <auto-generated />
using System;
using Carpool.DAL.DatabaseContexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Carpool.DAL.Migrations
{
    [DbContext(typeof(CarpoolDbContext))]
    [Migration("20200602211914_added owner to group")]
    partial class addedownertogroup
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Carpool.Core.Models.Company", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Companies");
                });

            modelBuilder.Entity("Carpool.Core.Models.Coordinates", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<double>("Latitude")
                        .HasColumnType("float");

                    b.Property<double>("Longitude")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.ToTable("Coordinates");
                });

            modelBuilder.Entity("Carpool.Core.Models.Group", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Code")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("LocationId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("OwnerId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("LocationId");

                    b.HasIndex("OwnerId");

                    b.ToTable("Groups");
                });

            modelBuilder.Entity("Carpool.Core.Models.GroupInvite", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("DateAdded")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("GroupId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("InvitedUserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("IsAccepted")
                        .HasColumnType("bit");

                    b.Property<bool>("IsPending")
                        .HasColumnType("bit");

                    b.Property<Guid?>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("GroupId");

                    b.HasIndex("InvitedUserId");

                    b.HasIndex("UserId");

                    b.ToTable("GroupInvites");
                });

            modelBuilder.Entity("Carpool.Core.Models.Intersections.UserGroup", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("GroupId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("UserId", "GroupId");

                    b.HasIndex("GroupId");

                    b.ToTable("UserGroup");
                });

            modelBuilder.Entity("Carpool.Core.Models.Intersections.UserParticipatedRide", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("RideId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("UserId", "RideId");

                    b.HasIndex("RideId");

                    b.ToTable("UserParticipatedRides");
                });

            modelBuilder.Entity("Carpool.Core.Models.Location", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("CoordinatesId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("LocationNameId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("CoordinatesId");

                    b.HasIndex("LocationNameId");

                    b.HasIndex("UserId");

                    b.ToTable("Locations");
                });

            modelBuilder.Entity("Carpool.Core.Models.LocationName", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("LocationNames");
                });

            modelBuilder.Entity("Carpool.Core.Models.Rating", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Value")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Ratings");
                });

            modelBuilder.Entity("Carpool.Core.Models.Ride", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("DestinationId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("GroupId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("OwnerId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<double>("Price")
                        .HasColumnType("float");

                    b.Property<Guid?>("StartingLocationId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("DestinationId");

                    b.HasIndex("GroupId");

                    b.HasIndex("OwnerId");

                    b.HasIndex("StartingLocationId");

                    b.ToTable("Rides");
                });

            modelBuilder.Entity("Carpool.Core.Models.RideRequest", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("DestinationId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("RequesterId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("StartingLocationId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("DestinationId");

                    b.HasIndex("RequesterId");

                    b.HasIndex("StartingLocationId");

                    b.ToTable("RideRequests");
                });

            modelBuilder.Entity("Carpool.Core.Models.Stop", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("CoordinatesId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("RideId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("CoordinatesId");

                    b.HasIndex("RideId");

                    b.HasIndex("UserId");

                    b.ToTable("Stops");
                });

            modelBuilder.Entity("Carpool.Core.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("CompanyId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("VehicleId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.HasIndex("VehicleId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Carpool.Core.Models.Vehicle", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Vehicles");
                });

            modelBuilder.Entity("Carpool.Core.Models.Group", b =>
                {
                    b.HasOne("Carpool.Core.Models.Location", "Location")
                        .WithMany()
                        .HasForeignKey("LocationId");

                    b.HasOne("Carpool.Core.Models.User", "Owner")
                        .WithMany()
                        .HasForeignKey("OwnerId");
                });

            modelBuilder.Entity("Carpool.Core.Models.GroupInvite", b =>
                {
                    b.HasOne("Carpool.Core.Models.Group", "Group")
                        .WithMany()
                        .HasForeignKey("GroupId");

                    b.HasOne("Carpool.Core.Models.User", "InvitedUser")
                        .WithMany("GroupInvites")
                        .HasForeignKey("InvitedUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Carpool.Core.Models.User", null)
                        .WithMany("SentGroupInvites")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Carpool.Core.Models.Intersections.UserGroup", b =>
                {
                    b.HasOne("Carpool.Core.Models.Group", "Group")
                        .WithMany("UserGroups")
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Carpool.Core.Models.User", "User")
                        .WithMany("UserGroups")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Carpool.Core.Models.Intersections.UserParticipatedRide", b =>
                {
                    b.HasOne("Carpool.Core.Models.Ride", "Ride")
                        .WithMany("Participants")
                        .HasForeignKey("RideId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Carpool.Core.Models.User", "User")
                        .WithMany("ParticipatedRides")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Carpool.Core.Models.Location", b =>
                {
                    b.HasOne("Carpool.Core.Models.Coordinates", "Coordinates")
                        .WithMany()
                        .HasForeignKey("CoordinatesId");

                    b.HasOne("Carpool.Core.Models.LocationName", "LocationName")
                        .WithMany()
                        .HasForeignKey("LocationNameId");

                    b.HasOne("Carpool.Core.Models.User", null)
                        .WithMany("Locations")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Carpool.Core.Models.Rating", b =>
                {
                    b.HasOne("Carpool.Core.Models.User", null)
                        .WithMany("Ratings")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Carpool.Core.Models.Ride", b =>
                {
                    b.HasOne("Carpool.Core.Models.Location", "Destination")
                        .WithMany()
                        .HasForeignKey("DestinationId");

                    b.HasOne("Carpool.Core.Models.Group", "Group")
                        .WithMany("Rides")
                        .HasForeignKey("GroupId");

                    b.HasOne("Carpool.Core.Models.User", "Owner")
                        .WithMany("CreatedRides")
                        .HasForeignKey("OwnerId");

                    b.HasOne("Carpool.Core.Models.Location", "StartingLocation")
                        .WithMany()
                        .HasForeignKey("StartingLocationId");
                });

            modelBuilder.Entity("Carpool.Core.Models.RideRequest", b =>
                {
                    b.HasOne("Carpool.Core.Models.Location", "Destination")
                        .WithMany()
                        .HasForeignKey("DestinationId");

                    b.HasOne("Carpool.Core.Models.User", "Requester")
                        .WithMany("RideRequests")
                        .HasForeignKey("RequesterId");

                    b.HasOne("Carpool.Core.Models.Location", "StartingLocation")
                        .WithMany()
                        .HasForeignKey("StartingLocationId");
                });

            modelBuilder.Entity("Carpool.Core.Models.Stop", b =>
                {
                    b.HasOne("Carpool.Core.Models.Coordinates", "Coordinates")
                        .WithMany()
                        .HasForeignKey("CoordinatesId");

                    b.HasOne("Carpool.Core.Models.Ride", null)
                        .WithMany("Stops")
                        .HasForeignKey("RideId");

                    b.HasOne("Carpool.Core.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Carpool.Core.Models.User", b =>
                {
                    b.HasOne("Carpool.Core.Models.Company", null)
                        .WithMany("Users")
                        .HasForeignKey("CompanyId");

                    b.HasOne("Carpool.Core.Models.Vehicle", "Vehicle")
                        .WithMany()
                        .HasForeignKey("VehicleId");
                });
#pragma warning restore 612, 618
        }
    }
}

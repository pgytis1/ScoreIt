using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using ScoreIT.Models;

namespace ScoreIT.Migrations
{
    [DbContext(typeof(ScoreItDbContext))]
    [Migration("20161016225526_FirstMigrationAfterMigrationFixes")]
    partial class FirstMigrationAfterMigrationFixes
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ScoreIT.Models.Game", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedOn");

                    b.Property<int>("GoalLimit");

                    b.Property<bool>("IsCanceled");

                    b.Property<bool>("IsFinished");

                    b.Property<int>("Team1Score");

                    b.Property<int>("Team2Score");

                    b.Property<string>("Winner");

                    b.HasKey("Id");

                    b.ToTable("Games");
                });

            modelBuilder.Entity("ScoreIT.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<byte[]>("Avatar");

                    b.Property<string>("Email")
                        .IsRequired();

                    b.Property<int>("Level");

                    b.Property<int>("Losses");

                    b.Property<string>("Password")
                        .IsRequired();

                    b.Property<int>("Points");

                    b.Property<string>("Rankname");

                    b.Property<string>("Username")
                        .IsRequired();

                    b.Property<int>("Wins");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("ScoreIT.Models.UserGame", b =>
                {
                    b.Property<int>("GameId");

                    b.Property<int>("UserId");

                    b.Property<string>("Team");

                    b.HasKey("GameId", "UserId");

                    b.HasIndex("GameId");

                    b.HasIndex("UserId");

                    b.ToTable("UserGames");
                });

            modelBuilder.Entity("ScoreIT.Models.UserGame", b =>
                {
                    b.HasOne("ScoreIT.Models.Game", "Game")
                        .WithMany("UserGames")
                        .HasForeignKey("GameId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("ScoreIT.Models.User", "Player")
                        .WithMany("UserGames")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}

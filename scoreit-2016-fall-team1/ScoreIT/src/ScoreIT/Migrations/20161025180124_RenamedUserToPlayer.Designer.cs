using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using ScoreIT.Models;

namespace ScoreIT.Migrations
{
    [DbContext(typeof(ScoreItDbContext))]
    [Migration("20161025180124_RenamedUserToPlayer")]
    partial class RenamedUserToPlayer
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

            modelBuilder.Entity("ScoreIT.Models.Player", b =>
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

                    b.ToTable("Players");
                });

            modelBuilder.Entity("ScoreIT.Models.PlayerGame", b =>
                {
                    b.Property<int>("GameId");

                    b.Property<int>("PlayerId");

                    b.Property<string>("Team");

                    b.HasKey("GameId", "PlayerId");

                    b.HasIndex("GameId");

                    b.HasIndex("PlayerId");

                    b.ToTable("PlayerGames");
                });

            modelBuilder.Entity("ScoreIT.Models.PlayerGame", b =>
                {
                    b.HasOne("ScoreIT.Models.Game", "Game")
                        .WithMany("PlayerGames")
                        .HasForeignKey("GameId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("ScoreIT.Models.Player", "Player")
                        .WithMany("PlayerGames")
                        .HasForeignKey("PlayerId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}

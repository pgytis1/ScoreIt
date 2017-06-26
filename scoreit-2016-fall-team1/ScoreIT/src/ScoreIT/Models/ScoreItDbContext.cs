using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace ScoreIT.Models
{
    public class ScoreItDbContext : IdentityDbContext<User>
    {
        private readonly IOptions<AppSettingsConfiguration> _optionsAccessor;
        public DbSet<Player> Players { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<PlayerGame> PlayerGames { get; set; }

        public ScoreItDbContext(DbContextOptions<ScoreItDbContext> options,
            IOptions<AppSettingsConfiguration> optionsAccessor)
            : base(options)
        {
            _optionsAccessor = optionsAccessor;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);

            optionsBuilder.UseSqlServer("Server=localhost\\SQLEXPRESS;Database=ScoreIT;Trusted_Connection=True;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<PlayerGame>()
                .HasKey(ug => new {ug.GameId, UserId = ug.PlayerId});

            modelBuilder.Entity<Game>()
                .HasMany(u => u.PlayerGames)
                .WithOne(ug => ug.Game)
                .HasForeignKey(ug => ug.GameId);

            modelBuilder.Entity<Player>()
                .HasMany(u => u.PlayerGames)
                .WithOne(ug => ug.Player)
                .HasForeignKey(ug => ug.PlayerId);
        }
    }
}

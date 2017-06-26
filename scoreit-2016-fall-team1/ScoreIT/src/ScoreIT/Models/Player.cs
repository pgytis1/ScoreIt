using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ScoreIT.Models
{
    public class Player
    {
        public int Id { get; set; }
        public string Rankname { get; set; }
        public int Wins { get; set; }
        public int Losses { get; set; }
        public int Level { get; set; }
        public int Points { get; set; }
        public string Avatar { get; set; }
        public ICollection<PlayerGame> PlayerGames { get; set; }

        public string UserId { get; set; }
        public User User { get; set; }
    }
}

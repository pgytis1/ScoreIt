using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ScoreIT.Models
{
    public class Game
    {
        public int Id { get; set; }

        [Range(1, 20)]
        public int GoalLimit { get; set; }
        public int Team1Score { get; set; }
        public int Team2Score { get; set; }
        public bool IsFinished { get; set; }
        public bool IsCanceled { get; set; }
        public string Winner { get; set; }
        public DateTime CreatedOn { get; set; }

        public ICollection<PlayerGame> PlayerGames { get; set; }
    }
}

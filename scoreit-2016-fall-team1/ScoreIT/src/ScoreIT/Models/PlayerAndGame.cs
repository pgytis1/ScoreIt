using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScoreIT.Models
{
    public class PlayerAndGame
    {

        //player
        public int PlayerId { get; set; }
        public string UserId { get; set; }
        public string Avatar { get; set; }
        public int Wins { get; set; }
        public int Losses { get; set; }
        public int Points { get; set; }
        public int Level { get; set; }
        public string Rankname { get; set; }

        //game
        public int GameId { get; set; }
        public DateTime GameCreatedOn { get; set; }
        public int GoalLimit { get; set; }
        public bool GameIsFinished { get; set; }
        public bool GameIsCanceled { get; set; }
        public int Team1Score { get; set; }
        public int Team2Score { get; set; }
        public string Winner { get; set; }

        //playergame
        public string Team { get; set; }

    }

}
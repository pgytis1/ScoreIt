using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScoreIT.ViewModels
{
    public class GameViewModel
    {
        public int Team1Score { get; set; }
        public int Team2Score { get; set; }
        public int Team1Player1Id { get; set; }
        public int Team1Player2Id { get; set; }
        public int Team2Player1Id { get; set; }
        public int Team2Player2Id { get; set; }
        public string Team1Player1UserName { get; set; }
        public string Team1Player2UserName { get; set; }
        public string Team2Player1UserName { get; set; }
        public string Team2Player2UserName { get; set; }
        public SearchViewModel Team1Player1 { get; set; }
        public SearchViewModel Team1Player2 { get; set; }
        public SearchViewModel Team2Player1 { get; set; }
        public SearchViewModel Team2Player2 { get; set; }
        public string Winner { get; set; }
        public int GameId { get; set; }
        public int GoalLimit { get; set; }
    }
}

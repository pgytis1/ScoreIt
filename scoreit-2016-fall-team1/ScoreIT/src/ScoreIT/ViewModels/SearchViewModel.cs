using System.Collections.Generic;
using ScoreIT.Models;

namespace ScoreIT.ViewModels
{
    public class SearchViewModel
    {
        
        public int Id { get; set; }
        public string UserName { get; set; }
        public string RankName { get; set; }
        public int Level { get; set; }
        public int Wins { get; set; }
        public int Losses { get; set; }
        public int Points { get; set; }
        public int LevelProgress { get; set; }
        public int PointsToReachNextRank { get; set; }
        public string Avatar { get; set; }
        public List<GameViewModel> RecentGames { get; set; }
    }
}

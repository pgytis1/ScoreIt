using ScoreIT.Models;
using ScoreIT.RequestModels;
using ScoreIT.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static ScoreIT.SortTypeEnum;

namespace ScoreIT.Services
{
    public interface IPlayerService
    {
        IEnumerable<SearchViewModel> SearchByUsername(string query, int? limit, int? skip);
        SearchViewModel SearchPlayerById(int id, bool withRecentGames);
        SearchViewModel SearchPlayerByUserId(string userId, bool withRecentGames);
        IEnumerable<SearchViewModel> GetLeaderboard(string query, int? limit, SortType sortBy, int? skip);
        string[] UpdateAvatar(string userId, UpdateAvatarRequestModel data);
        GameViewModel GetUnfinishedGameForPlayer(string id);
        IEnumerable<SearchViewModel> GetPlayersFromLastGame(string userId);
        
    }
}

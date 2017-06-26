using System.Collections.Generic;
using ScoreIT.Models;
using ScoreIT.RequestModels;
using ScoreIT.ViewModels;

namespace ScoreIT.Services
{
    public interface IGameService
    {
        IEnumerable<GameViewModel> GetRecentGames(int? playerId, int? count, int? skip);
        string[] CreateNewGame(CreateGameRequestModel model);
        string[] UpdateScore(string userId, int gameId, string team, int scoreDelta);
        string[] CancelOrFinishGame(int gameId, string currentUserId, string status);
        IEnumerable<GameViewModel> GetRecentGamesByUserId(string id, int? count);
        
    }
}

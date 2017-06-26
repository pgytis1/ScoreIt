using System;
using System.Collections.Generic;
using System.Linq;
using ScoreIT.Models;
using ScoreIT.RequestModels;
using ScoreIT.ViewModels;
using static ScoreIT.SortTypeEnum;
using Microsoft.EntityFrameworkCore;

namespace ScoreIT.Services
{
    public class PlayerService : IPlayerService
    {

        private readonly ScoreItDbContext _dbContext;

        public PlayerService(ScoreItDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        public IEnumerable<SearchViewModel> SearchByUsername(string query, int? limit, int? skip)
        {
            var players = _dbContext.Players
                .Where(player => !player.PlayerGames.Any(playerGame => playerGame.Game.IsCanceled == false && playerGame.Game.IsFinished == false))
                .Skip(skip.GetValueOrDefault())
                .Take(limit.GetValueOrDefault());

            if (!string.IsNullOrEmpty(query))
            {
                players = players.Where(u => u.User.UserName
                .Contains(query));
            }

            var playersModels = players.Select(u => new SearchViewModel
            {
                Id = u.Id,
                UserName = u.User.UserName,
                Level = u.Level,
                RankName = u.Rankname,
                Wins = u.Wins,
                Losses = u.Losses,
                Avatar = u.Avatar,
                Points = u.Points
            });

            return playersModels;
        }

        public SearchViewModel SearchPlayerById(int id, bool withRecentGames)
        {
            var player = _dbContext.Players
                .Include(x => x.User)
                .SingleOrDefault(u => u.Id == id);
                

            if (player == null)
            {
                return null;
            }

            var playerSearchViewModel = new SearchViewModel
            {
                Id = player.Id,
                UserName = player.User.UserName,
                Level = player.Level,
                RankName = player.Rankname,
                Wins = player.Wins,
                Losses = player.Losses,
                Avatar = player.Avatar,
                Points = player.Points,
                PointsToReachNextRank = GetPointsToReachNextRank(player.Level, player.Points),
                LevelProgress = GetLevelProgress(player.Level, player.Points)
            };

            if (withRecentGames)
            {
                playerSearchViewModel.RecentGames = GetRecentGamesForPlayer(player.Id);
            }

            return playerSearchViewModel;
        }



        private List<GameViewModel> GetRecentGamesForPlayer(int id)
        {
            var result = new List<GameViewModel>();

            var playerGames = _dbContext.PlayerGames
                  .Where(playerGame => playerGame.PlayerId == id)
                  .ToList();

            var games = _dbContext.Games
                .Where(game => playerGames.Any(playerGame => playerGame.GameId == game.Id))
                .Where(game => game.IsFinished)
                .OrderByDescending(game => game.CreatedOn)
                .ToList();



            //2 is default number for player games
                games = games
                    .Take(2)
                    .ToList();

            foreach (var game in games)
            {
                var playerGamesTeam1 = _dbContext.PlayerGames
                    .Include(playerGame => playerGame.Player)
                        .ThenInclude(player => player.User)
                    .Where(playerGame => playerGame.GameId == game.Id && playerGame.Team == Constants.Team1)
                    .ToList();

                var playerGamesTeam2 = _dbContext.PlayerGames
                    .Include(playerGame => playerGame.Player)
                        .ThenInclude(player => player.User)
                    .Where(playerGame => playerGame.GameId == game.Id && playerGame.Team == Constants.Team2)
                    .ToList();

                var gameViewModel = new GameViewModel
                {
                    Winner = game.Winner,
                    Team1Score = game.Team1Score,
                    Team2Score = game.Team2Score,

                    Team1Player1Id = playerGamesTeam1[0].PlayerId,
                    Team1Player1UserName = playerGamesTeam1[0].Player.User.UserName,
                    Team1Player2Id = playerGamesTeam1[1].PlayerId,
                    Team1Player2UserName = playerGamesTeam1[1].Player.User.UserName,

                    Team2Player1Id = playerGamesTeam2[0].PlayerId,
                    Team2Player1UserName = playerGamesTeam2[0].Player.User.UserName,
                    Team2Player2Id = playerGamesTeam2[1].PlayerId,
                    Team2Player2UserName = playerGamesTeam2[1].Player.User.UserName
                };

                result.Add(gameViewModel);
            }
            return result;
        }

        public SearchViewModel SearchPlayerByUserId(string userId, bool withRecentGames)
        {
            var player = _dbContext.Players
                .Include(x => x.User)
                .SingleOrDefault(p => p.User.Id == userId);

            if (player == null)
            {
                return null;
            }

            var playerSearchViewModel = new SearchViewModel
            {
                Id = player.Id,
                UserName = player.User.UserName,
                Level = player.Level,
                RankName = player.Rankname,
                Wins = player.Wins,
                Losses = player.Losses,
                Avatar = player.Avatar,
                Points = player.Points,
                PointsToReachNextRank = GetPointsToReachNextRank(player.Level, player.Points),
                LevelProgress = GetLevelProgress(player.Level, player.Points)
            };

            if (withRecentGames)
            {
                playerSearchViewModel.RecentGames = GetRecentGamesForPlayer(player.Id);
            }

            return playerSearchViewModel;
        }

        private int GetLevelProgress(int currentLevel, int points)
        {
            int pointsToReachNextRank = currentLevel * Constants.Factor + Constants.BaseXP - points;

            double progressPercentage = 0.0;

            if(currentLevel == 0)
            {
                progressPercentage = (Constants.BaseXP - pointsToReachNextRank)*100.0/Constants.BaseXP;
            }else {
                progressPercentage = (Constants.Factor - pointsToReachNextRank)*100.0/Constants.Factor;
            }

            int incrementOf5 = (int) Math.Floor(progressPercentage/5);
            int progress = incrementOf5*5;

            return progress;
        }

        private int GetPointsToReachNextRank(int currentLevel, int points)
        {
            int pointsToReachNextRank = currentLevel * Constants.Factor + Constants.BaseXP - points;

            return pointsToReachNextRank;
        }

        public string[] UpdateAvatar(string userId, UpdateAvatarRequestModel data)
        {           
            var updateAvatar = _dbContext.Players.SingleOrDefault(n => n.UserId == userId);
            if (updateAvatar != null)
            {
                updateAvatar.Avatar = data.Avatar;
                _dbContext.Players.Update(updateAvatar);
                _dbContext.SaveChanges();
            }
            else return new[] { "This player doesn't exist." };
            return null;
        }

        public GameViewModel GetUnfinishedGameForPlayer(string id)
        {
            var player = _dbContext.Players
                .SingleOrDefault(player1 => player1.UserId == id);

            if (player == null)
            {
                return null;
            }

            var userGame = _dbContext.PlayerGames
                .Include(usergame => usergame.Game)
                .SingleOrDefault(x => x.PlayerId == player.Id && x.Game.IsFinished == false && x.Game.IsCanceled == false);

            if (userGame == null)
            {
                return null;
            }

            var game = userGame.Game;
            var gameViewModel = new GameViewModel
            {
                Team1Score = game.Team1Score,
                Team2Score = game.Team2Score,
                Winner = game.Winner,
                GameId = game.Id,
                GoalLimit = game.GoalLimit
                
            };
            var listTeam1 = _dbContext.PlayerGames
                .Where(x => x.GameId == userGame.GameId && x.Team == Constants.Team1)
                .Select(x => x.Player.Id).ToList();
            var listTeam2 = _dbContext.PlayerGames
                .Where(x => x.GameId == userGame.GameId && x.Team == Constants.Team2)
                .Select(x => x.Player.Id).ToList();
                gameViewModel.Team1Player1 = SearchPlayerById(listTeam1[0], false);
                gameViewModel.Team1Player2 = SearchPlayerById(listTeam1[1], false);
                gameViewModel.Team2Player1 = SearchPlayerById(listTeam2[0], false);
                gameViewModel.Team2Player2 = SearchPlayerById(listTeam2[1], false);

            return gameViewModel;
        }

        public IEnumerable<SearchViewModel> GetLeaderboard(string query, int? limit, SortType sortBy, int? skip)
        {
            var leaderboard = _dbContext.Players
                .Select(u => new SearchViewModel
                {
                    Id = u.Id,
                    UserName = u.User.UserName,
                    Level = u.Level,
                    RankName = u.Rankname,
                    Wins = u.Wins,
                    Losses = u.Losses,
                    Avatar = u.Avatar,
                    Points = u.Points,
                    PointsToReachNextRank = GetPointsToReachNextRank(u.Level, u.Points),
                    LevelProgress = GetLevelProgress(u.Level, u.Points)
                });

            if (sortBy == SortType.Level)
            {
                leaderboard = leaderboard.OrderByDescending(user => user.Level);
            }
            else if (sortBy == SortType.Wins)
            {
                leaderboard = leaderboard.OrderByDescending(user => user.Wins);
            }
            else if (sortBy == SortType.Points)
            {
                leaderboard = leaderboard.OrderByDescending(user => user.Points);
            }
            else
            {
                return null;
            }
            if (query != null)
            {
                leaderboard = leaderboard.Where(user => user.UserName.Contains(query));
            }

            leaderboard = leaderboard.Skip(skip.GetValueOrDefault()).Take(limit.GetValueOrDefault());


            return leaderboard;
        }

        public IEnumerable<SearchViewModel> GetPlayersFromLastGame(string userId)
        {
            //one big query in order to avoid further requsts to the database
            var games = _dbContext.Games
                .Include(x => x.PlayerGames)
                .ThenInclude(x => x.Player)
                .ThenInclude(x => x.User);

            //Getting the most recent game of the player
            var mostRecentGame =
                (from game in games
                    from playerGame in game.PlayerGames
                    where playerGame.Player.UserId == userId
                    orderby game.CreatedOn descending
                    select game).Take(1).SingleOrDefault();

            if (mostRecentGame == null) return null;

            var playersWhoHaveActiveGame = (from game in games
                where game.IsCanceled == false && game.IsFinished == false
                from playerGame in game.PlayerGames
                select playerGame.Player);

            //We select all players ( who were in the recentGame and don't have any active games)  except the one sending the request
            var players = mostRecentGame.PlayerGames
                .Where(x => x.Player.UserId != userId && !playersWhoHaveActiveGame.Contains(x.Player))
                .Select(x => new SearchViewModel
                {
                    Id = x.PlayerId,
                    UserName = x.Player.User.UserName,
                    Level = x.Player.Level,
                    RankName = x.Player.Rankname,
                    Wins = x.Player.Wins,
                    Losses = x.Player.Losses,
                    Avatar = x.Player.Avatar,
                    Points = x.Player.Points
                });


            return players;

        }
    }
}

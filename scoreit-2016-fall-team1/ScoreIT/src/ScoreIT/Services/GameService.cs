using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using ScoreIT.Models;
using ScoreIT.RequestModels;
using ScoreIT.ViewModels;

namespace ScoreIT.Services
{
    public class GameService : IGameService
    {
        private readonly ScoreItDbContext _dbContext;

        public GameService(ScoreItDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public string[] CreateNewGame(CreateGameRequestModel model)
        {
            // Has to return 4 if all user Id's are correct
            var countPlayers = _dbContext.Players
                .Count(u =>
                    u.Id == model.Player1Id || u.Id == model.Player2Id ||
                    u.Id == model.Player3Id || u.Id == model.Player4Id);

            if (countPlayers != 4)
            {
                return new[] { "Invalid player id's." };
            }

            var activeGames = _dbContext.PlayerGames
                .Where(ug => !ug.Game.IsCanceled && !ug.Game.IsFinished)
                .Where(ug => ug.PlayerId == model.Player1Id.Value ||
                             ug.PlayerId == model.Player2Id.Value ||
                             ug.PlayerId == model.Player3Id.Value ||
                             ug.PlayerId == model.Player4Id.Value);

            if (activeGames.Any())
            {
                return new[] { "Can't create a game when a player has currently an active game." };
            }

            var game = new Game
            {
                GoalLimit = model.GoalLimit.Value,
                CreatedOn = DateTime.Now
            };

            _dbContext.Games.Add(game);

            var playerGames = new List<PlayerGame>
            {
                new PlayerGame
                {
                    Game = game,
                    PlayerId = model.Player1Id.Value,
                    Team = Constants.Team1
                },
                new PlayerGame
                {
                    Game = game,
                    PlayerId = model.Player2Id.Value,
                    Team = Constants.Team1
                },
                new PlayerGame
                {
                    Game = game,
                    PlayerId = model.Player3Id.Value,
                    Team = Constants.Team2
                },
                new PlayerGame
                {
                    Game = game,
                    PlayerId = model.Player4Id.Value,
                    Team = Constants.Team2
                }
            };

            _dbContext.PlayerGames.AddRange(playerGames);
            _dbContext.SaveChanges();

            return null;
        }

        public IEnumerable<GameViewModel> GetRecentGames(int? playerId, int? count,int? skip= 0)
        {
            if (playerId != null)
            {
                var result = new List<GameViewModel>();

                var playerGames = _dbContext.PlayerGames
                    .Where(playerGame => playerGame.PlayerId == playerId.Value)
                    .ToList();
                var games = _dbContext.Games
                    .Where(game => playerGames.Any(playerGame => playerGame.GameId == game.Id))
                    .OrderByDescending(game => game.CreatedOn)
                    .ToList();

                if (count != null)
                {
                    games = games
                        .Skip(skip.Value)
                        .Take(count.Value)
                        .ToList();
                }

                foreach (var game in games)
                {
                    var playerGamesTeam1 = _dbContext.PlayerGames
                        .Include(playerGame => playerGame.Player)
                        .ThenInclude(player => player.User)
                        .Where(playerGame => playerGame.GameId == game.Id)
                        .Where(playerGame => playerGame.Team == Constants.Team1)
                        .ToList();

                    var playerGamesTeam2 = _dbContext.PlayerGames
                        .Include(playerGame => playerGame.Player)
                        .ThenInclude(player => player.User)
                        .Where(playerGame => playerGame.GameId == game.Id)
                        .Where(playerGame => playerGame.Team == Constants.Team2)
                        .ToList();

                    if (playerGamesTeam1.All(playerGame => playerGame.PlayerId != playerId))
                    {
                        var temp = playerGamesTeam1;
                        playerGamesTeam1 = playerGamesTeam2;
                        playerGamesTeam2 = temp;
                    }

                    if (playerGamesTeam1[0].PlayerId != playerId)
                    {
                        var temp = playerGamesTeam1[0];
                        playerGamesTeam1[0] = playerGamesTeam1[1];
                        playerGamesTeam1[1] = temp;
                    }

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
            else
            {
                var result = new List<GameViewModel>();

                var games = _dbContext.Games
                    .OrderByDescending(game => game.CreatedOn)
                    .Where(game => game.IsFinished)
                    .ToList();

                if (count != null)
                {
                    games = games
                        .Skip(skip.Value)
                        .Take(count.Value)
                        .ToList();
                }

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
        }

        public IEnumerable<GameViewModel> GetRecentGamesByUserId(string userId, int? count)
        {
            var result = new List<GameViewModel>();

            var myPlayer = _dbContext.Players
                .Include(x => x.User)
                .SingleOrDefault(p => p.User.Id == userId);

            if (myPlayer == null)
            {
                return null;
            }
            return GetRecentGames(myPlayer.Id, count);
        }

        public string[] UpdateScore(string userId, int gameId, string team, int scoreDelta)
        {
            var players =
                (
                from pg in _dbContext.PlayerGames
                where pg.GameId == gameId
                join g in _dbContext.Games on pg.GameId equals g.Id
                join p in _dbContext.Players on pg.PlayerId equals p.Id
                select new PlayerAndGame
                {
                    GameId = g.Id,
                    PlayerId = pg.PlayerId,
                    UserId = p.UserId,
                    Team = pg.Team,
                    Team1Score = g.Team1Score,
                    Team2Score = g.Team2Score,
                    GameIsFinished = g.IsFinished,
                    GameIsCanceled = g.IsCanceled,
                    GoalLimit = g.GoalLimit,
                    Winner = g.Winner,
                    GameCreatedOn = g.CreatedOn,
                    Avatar = p.Avatar,
                    Level = p.Level,
                    Losses = p.Losses,
                    Wins = p.Wins,
                    Points = p.Points,
                    Rankname = p.Rankname
                })
                .ToList();

            if (players == null)
            {
                return new[] { "Game doesn't exist." };
            }
            var player = players
                .SingleOrDefault(x => x.UserId == userId);

            if (player == null)
            {
                return new[] { "This player doesn't play." };
            }
            if (player.GameIsCanceled || player.GameIsFinished)
            {
                return new[] { "Game is cancelled or finished." };
            }


            if (scoreDelta == 1 || scoreDelta == -1)
            {
                if (team == Constants.Team1)
                {
                    player.Team1Score += scoreDelta;
                    if (player.GoalLimit == player.Team1Score)
                    {
                        player.Winner = Constants.Team1;
                        player.GameIsFinished = true;
                    }
                }
                else if (team == Constants.Team2)
                {
                    player.Team2Score += scoreDelta;
                    if (player.GoalLimit == player.Team2Score)
                    {
                        player.Winner = Constants.Team2;
                        player.GameIsFinished = true;
                    }
                }
                else return new[] { "Unknown team." };
            }
            else return new[] { "Invalid ScoreDelta." };

            var game = new Game
            {
                GoalLimit = player.GoalLimit,
                Id = player.GameId,
                IsCanceled = player.GameIsCanceled,
                IsFinished = player.GameIsFinished,
                Team1Score = player.Team1Score,
                Team2Score = player.Team2Score,
                Winner = player.Winner,
                CreatedOn = player.GameCreatedOn
            };

            _dbContext.Games.Update(game);

            if (game.IsFinished)
            {
                var winners = players
                                    .Where(x => x.Team == game.Winner)
                                    .ToList();

                var lossers = players
                                    .Where(x => x.Team != game.Winner)
                                    .ToList();


                UpdateScoresAndLevels(winners, lossers);
                return new[] { "finished" };
            }

            _dbContext.SaveChanges();

            return null;
        }

        public string[] CancelOrFinishGame(int gameId, string currentUserId, string status)
        {
            //string status can either be equal to 'finish' or 'cancel'
            var players =
                (
                from pg in _dbContext.PlayerGames
                where pg.GameId == gameId
                join g in _dbContext.Games on pg.GameId equals g.Id
                join p in _dbContext.Players on pg.PlayerId equals p.Id
                select new PlayerAndGame
                {
                    GameId = g.Id,
                    PlayerId = pg.PlayerId,
                    UserId = p.UserId,
                    Team = pg.Team,
                    Team1Score = g.Team1Score,
                    Team2Score = g.Team2Score,
                    GameIsFinished = g.IsFinished,
                    GameIsCanceled = g.IsCanceled,
                    GoalLimit = g.GoalLimit,
                    Winner = g.Winner,
                    GameCreatedOn = g.CreatedOn,
                    Avatar = p.Avatar,
                    Level = p.Level,
                    Losses = p.Losses,
                    Wins = p.Wins,
                    Points = p.Points,
                    Rankname = p.Rankname
                })
                .ToList();

            var player = players
                .SingleOrDefault(x => x.UserId == currentUserId);

            if (player == null)
            {
                return new[] { "User is not a player of this game." };
            }

            if (player.GameIsCanceled || player.GameIsFinished)
            {
                return new[] { "Game is already finished or canceled" };
            }

            if (status.Equals("cancel"))
            {
                player.GameIsCanceled = true;
            }
            else if (status.Equals("finish"))
            {
                if (player.Team1Score > player.Team2Score)
                {
                    player.Winner = Constants.Team1;
                    FindWinnersAndLosers(players, player.Winner);

                }
                if (player.Team2Score > player.Team1Score)
                {
                    player.Winner = Constants.Team2;
                    FindWinnersAndLosers(players, player.Winner);
                }

                player.GameIsFinished = true;

            }

            var gameUpdate = new Game
            {
                CreatedOn = player.GameCreatedOn,
                GoalLimit = player.GoalLimit,
                Id = player.GameId,
                IsCanceled = player.GameIsCanceled,
                IsFinished = player.GameIsFinished,
                Team1Score = player.Team1Score,
                Team2Score = player.Team2Score,
                Winner = player.Winner
            };
            _dbContext.Games.Update(gameUpdate);
            _dbContext.SaveChanges();

            return null;
        }

        private void FindWinnersAndLosers(List<PlayerAndGame> players, string winner)
        {
            var winners = players
                                 .Where(x => x.Team == winner)
                                 .ToList();

            var lossers = players
                                .Where(x => x.Team != winner)
                                .ToList();


            UpdateScoresAndLevels(winners, lossers);
        }

        private void UpdateScoresAndLevels(List<PlayerAndGame> winners, List<PlayerAndGame> lossers)
        {
            Action<List<PlayerAndGame>, bool> calc = (x, isWin) =>
            {

                foreach (var player in x)
                {

                    if (player == null)
                    {
                        continue;
                    }

                    if (isWin)
                    {
                        player.Wins += 1;
                        player.Points += 10;
                    }
                    else
                    {
                        player.Losses += 1;
                        player.Points += 4;
                    }

                    int pointsToReachNextRank = player.Level * Constants.Factor + Constants.BaseXP - player.Points;

                    if (pointsToReachNextRank <= 0)
                    {
                        player.Level++;

                        if (player.Level < 24)
                        {
                            player.Rankname = Constants.Title[player.Level];
                        }
                    }

                    var playerUpdate = new Player
                    {
                        Avatar = player.Avatar,
                        Id = player.PlayerId,
                        Level = player.Level,
                        Losses = player.Losses,
                        Points = player.Points,
                        Rankname = player.Rankname,
                        UserId = player.UserId,
                        Wins = player.Wins
                    };
                    _dbContext.Players.Update(playerUpdate);
                    
                }
            };

            calc(winners, true);
            calc(lossers, false);
            _dbContext.SaveChanges();
        }
    }
}

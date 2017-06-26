using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace ScoreIT.Models
{
    public static class DbInitializer
    {
        public static async void Initialize(ScoreItDbContext context, UserManager<User> userManager)
        {
            context.Database.Migrate();

            if (context.Players.Any())
            {
                return;
            }

            var users = await AddUsers(userManager);
            var players = AddPlayers(users);
            var games = AddGames();
            var playerGames = AddPlayerGames(players, games);

            context.AddRange(players);
            context.SaveChanges();
            context.AddRange(games);
            context.AddRange(playerGames);
            context.SaveChanges();
        }

        public static async Task< List<User> > AddUsers(UserManager<User> userManager )
        {
            var users = new List<User>
            {
                new User {Email = "antanas@gmail.com",        UserName = "Antanas"},
                new User {Email = "petras.sakys@gmail.com",   UserName = "Petras"},
                new User {Email = "petras2@gmail.com",        UserName = "Petras2"},
                new User {Email = "jonas.jonaitis@gmail.com", UserName = "Jonas"},
                new User {Email = "antanas2@gmail.com",       UserName = "Antanas2"},
                new User {Email = "petras3@gmail.com",        UserName = "Petras3"},
                new User {Email = "vardenis.pav@gmail.com",   UserName = "Vardenis"},
                new User {Email = "antanas3@gmail.com",       UserName = "Antanas3"},
                new User {Email = "tadas1@gmail.com",         UserName = "tadas1"},
                new User {Email = "tadas2@gmail.com",         UserName = "tadas2"},
                new User {Email = "tadas3.pav@gmail.com",     UserName = "tadas3"},
                new User {Email = "tadas4@gmail.com",         UserName = "tadas4"},
                new User {Email = "user1@gmail.com",          UserName = "user1"},
                new User {Email = "user2@gmail.com",          UserName = "user2"},
                new User {Email = "user3@gmail.com",          UserName = "user3"},
                new User {Email = "user4@gmail.com",          UserName = "user4"},
                new User {Email = "user5@gmail.com",          UserName = "user5"},
                new User {Email = "user6@gmail.com",          UserName = "user6"},
                new User {Email = "user7@gmail.com",          UserName = "user7"}
            };

            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "Testas123?");
            }

            return users;
        }

        public static List<Player> AddPlayers(List<User> users )
        {
            // Initial seed image in base64 format
            var avatarBase64 = "iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAYAAADj79JYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAe2" +
                               "SURBVHhe7Z1NaB1VFMenoYRqjKWUUqmhlHSlYNFVdaObuvEDRdGF2ZiNCn5hwdKFWdVFrVDwY1HdxE1cKIqiuLEb3agrpUJ101hKrMZSSo3VUiT6/rx7" +
                               "2/vOO/dzzpnMC/ODR+59b+bMuf97537PZMP09PR/VUdjjJm/HQ3RCd4wneAN0wneMJ3gDdMJ3jCd4A3TSD988YtTJsQzfd9uE9Ll9AffV6s33GhiwzTh" +
                               "h6rg5/YfqVb2PWpicbQSHMtwiqbwaoLniu0ileBcoV20RFcTnEvsjoMz1aYT31b/bp+qzsx/Zb71U5roFKFd29zxux6/oxr7608Tk0NFcJqA8cWfqqnn" +
                               "HjCxYUICTXzzZbX90DMmFidkK5aB9FyNUt6I4KmO1xFr6a3Pqiu7bzWxQUqvryG4eLfw4sOzJtQnx2kc6zs+lBn4jRN75+w92dd3CV2zFHHBzz/1igmV" +
                               "g4Rf36tKKJywPlFgY+Pykom1h9YOfG7q1dtc6UTVYQmJXcqWhTdNSAdVwdFY1oUTD0JzYuPYOmKDLQtvmJAOqoLvOPiECdXDK+IG87dHXaGbQlVwyX4s" +
                               "K6jpX2mK7ev5lNLaOrwtrE74515KGBnBfQ0kCP1Wl39u22tCMoyE4CmCaol+3Y/fmZAMqoKHpkJTyemNaIiOuR9JVAX/46UjJlTG5T13mtA1pp5/0IT4" +
                               "xlKzepFAVfC/77rXhMo4e3jBhPpsO3qgGj910sT6cKJjoaGttLYO50rq5PGPTGgQKnqdqoy7qyRppeC+ejuEW9WA0qqF3lXSiAs+efxjE5LDFfvynr1D" +
                               "H0CrGtDG+lx9Pnzru69Wmz+ZN7FBfnvt/Xg/F8N3YQ8x5bDpBN/do5kUu7NyaWwBoo2lzQWzk5gSdv20S4KSNCJ4EvDCmYxqA9KlG4gJvrLvkerc/tf7" +
                               "EQHxMC9dOlWKnsZQ41fDJ7QPtFEupZbg6H6V9Hk3f/petfWdQyY2fEegfpWY2uWqNsul3hhhee6YiaWz7ejLtToGRYKXVBm+25MrjVK38ukPf6hWJyZN" +
                               "rE/Idm66SvzM6hZemHkhyakcR7TEBrseu92E4oTuBh84JzeTkgWH4QszL5rYMHDQfmzc5Wr97kCd3bj8qwnJQf3IEYimyQdsoopKISo4jIWcTHEIoFGN" +
                               "sXP2bhPShWY+XdXhNh7ZdHK7CQDag5TMDNbhPgOpjRo9380Y+hv2kKRsa6DnoffAjTIpOb6kFKDQdr3Q+d4STp2wwFhqDwIDBxeuWrHExIY/nE/YNoHv" +
                               "YxNWtGfhS18q8NcnbMg2W8K5E1JLEoXagpPcdyFyxAnZ4q5L94zHfPHB+cjZGirhXL8aJ5aIzZE7dZojNgg1XphPd4HtOlO5Lpy4nO9DglMHSnPcQs+n" +
                               "GRqynys2CA1mfPPpFl+DmEqKVgOCn396zoTWLyFRMIFVF2qfFpoBwS8+9KQJ9UnJsRR8dqTsU0rujKbw9lLWmtAgqy5cRktmfshWawVfr7RWcM1drFyV" +
                               "I1kNhWwNCC61EEu5aof0+CUT6aLVNkgwILhUX9tLC1Z0QpksUQCoDZr5Q1UK7YvWdYLON0w9e78J9QnZLympoXO095ykaDUkONcXhaHSERkmeVzGf/nZ" +
                               "hNLIET22EsPNvWNXgUvpWIQTm/OdbTS5AzFCrFva7SMo1H7MboroOAbLXz583Uy6hYOORWLA91SxASs48J0A47TU+qCOhB6Ojd1B8Acf+tCT/T4GVqtc" +
                               "Us6J4SsoIdvRNU2fURDbt0HPpY7EfpeCXoebz0/1hd0R4BBLg7eEW2DAZwQXhqMpt2HKxBB2YjVByY4AvKwBafWJjbYgpcBkrdrTUsBhV25SS0zqcaVQ" +
                               "+76VpTPzX/eqyptNrO/HwF6bADk+r/k2CaAlOudnsh9QJTJuKPEzWqVw4EJZF+s5jsTgY3e7htCaJqY+220f9jOAR+yxSyv56XcoKuEcAw4nlI4YpQmy" +
                               "DAlY06e6/ljEBLege1ey/U0ik6SREtmlqEoJUfz0cQvEpgIP3SUCiJdw4DrKbchPfQWTFtjh5dt0REWWLuXigv8+d2zg6bUSh7lEY8Dhe1oCD6+OL570" +
                               "7jjIYeQEl3CY2gApdiSuTUeS0oKL1+EScInkMsGF/k53faUi/YgJpZWCA05033w2lxnawpWiKjiedKgDXfLDrU5nKkurn1Skdw+oCu4+VlIClvwwsnNx" +
                               "ezfaYgM6rVuX1lYpFu4pBgiN2TuKtNgatF5wwAlJ32tL74S2MhKCg1DpxdJdzvM8a8nICA58z0qGlu7axsgIjjrbfUmkC9d4SiH94khVwc8ellkyg6Cx" +
                               "d5FriS695U5V8JTFhhg+Ibk6HccWTQ03SKurlJjYnOiYj69T2rXuFIu44HVHlwCJ5hLOvZ7a13vRFq4UccHp6DIn4XhA1Xc8hPU9WhgSPef6dJuGROGh" +
                               "qC9AAAzRfV06gHo3tPPKJyhHSOCYHXpuznVTUREccAnHQgEe3cN+j5RJodIEp5Rq+78l0LBzvSkNsYGa4EhEaS8Fw3SJkWOK8D5GTnCw9Pbn1ZXpW0ws" +
                               "Tp23AIXIFV5LbKAquCWWYM0EusT8SH3BQh0aEbzjGq0e+KxHOsEbphO8YTrBG6YTvGE6wRumE7xRqup/QhuhfMTQzsoAAAAASUVORK5CYII=";

            var players = new List<Player>
            {
                new Player { User = users[0],  Rankname = Constants.Title[0],  Wins = 0, Losses = 0, Level = 0, Points = 0},
                new Player { User = users[1],  Rankname = Constants.Title[1],  Wins = 6,  Losses = 7,  Level = 1,  Points = 40 },
                new Player { User = users[2],  Rankname = Constants.Title[2],  Wins = 8,  Losses = 7,  Level = 2,  Points = 60 },
                new Player { User = users[3],  Rankname = Constants.Title[3],  Wins = 3,  Losses = 7,  Level = 3, Points = 80  },
                new Player { User = users[4],  Rankname = Constants.Title[4],  Wins = 1,  Losses = 7,  Level = 4,  Points = 100  },
                new Player { User = users[5],  Rankname = Constants.Title[5],  Wins = 1,  Losses = 7,  Level = 5,  Points = 120  },
                new Player { User = users[6],  Rankname = Constants.Title[6],  Wins = 1,  Losses = 7,  Level = 6,  Points = 140  },
                new Player { User = users[7],  Rankname = Constants.Title[7],  Wins = 1,  Losses = 7,  Level = 7,  Points = 160 },
                new Player { User = users[8],  Rankname = Constants.Title[8],  Wins = 0,  Losses = 0,  Level = 8,  Points = 180  },
                new Player { User = users[9],  Rankname = Constants.Title[9],  Wins = 0,  Losses = 0,  Level = 9,  Points = 200   },
                new Player { User = users[10], Rankname = Constants.Title[10], Wins = 9,  Losses = 5,  Level = 10,  Points = 220 },
                new Player { User = users[11], Rankname = Constants.Title[11], Wins = 1,  Losses = 5,  Level = 11,  Points = 240  },
                new Player { User = users[12], Rankname = Constants.Title[12], Wins = 1,  Losses = 5,  Level = 12,  Points = 260  },
                new Player { User = users[13], Rankname = Constants.Title[13], Wins = 1,  Losses = 5,  Level = 13,  Points = 280  },
                new Player { User = users[14], Rankname = Constants.Title[14], Wins = 1,  Losses = 5,  Level = 14,  Points = 300 },
                new Player { User = users[15], Rankname = Constants.Title[15], Wins = 1,  Losses = 5,  Level = 15,  Points = 320 },
                new Player { User = users[16], Rankname = Constants.Title[16],  Wins = 1,  Losses = 5,  Level = 16,  Points = 340 },
                new Player { User = users[17], Rankname = Constants.Title[17],  Wins = 1,  Losses = 5,  Level = 17,  Points = 360 },
                new Player { User = users[18], Rankname = Constants.Title[23], Wins = 1,  Losses = 5,  Level = 23,  Points = 480 }
            };

            foreach (var player in players)
            {
                player.Avatar = avatarBase64;
            }

            return players;
        }
        public static List<Game> AddGames()
        {
            var games = new List<Game>
            {
                new Game { GoalLimit = 7,  Team1Score = 7,  Team2Score = 4,  IsFinished = true,  IsCanceled = false, Winner = Constants.Team1, CreatedOn = new DateTime(2016, 10, 10, 21, 10, 05)},
                new Game { GoalLimit = 11, Team1Score = 7,  Team2Score = 8,  IsFinished = false, IsCanceled = false,                           CreatedOn = new DateTime(2016, 09, 01, 12, 00, 00)},
                new Game { GoalLimit = 10, Team1Score = 7,  Team2Score = 10, IsFinished = true,  IsCanceled = false, Winner = Constants.Team2, CreatedOn = new DateTime(2016, 10, 05, 10, 30, 30)},
                new Game { GoalLimit = 10, Team1Score = 10, Team2Score = 4,  IsFinished = true,  IsCanceled = false, Winner = Constants.Team1, CreatedOn = new DateTime(2016, 10, 10, 22, 10, 05)},
                new Game { GoalLimit = 8,  Team1Score = 7,  Team2Score = 8,  IsFinished = true,  IsCanceled = false, Winner = Constants.Team2, CreatedOn = new DateTime(2016, 09, 01, 12, 00, 00)},
                new Game { GoalLimit = 10, Team1Score = 7,  Team2Score = 10, IsFinished = true,  IsCanceled = false, Winner = Constants.Team2, CreatedOn = new DateTime(2016, 10, 05, 10, 30, 30)},
                new Game { GoalLimit = 11, Team1Score = 11, Team2Score = 8,  IsFinished = true,  IsCanceled = false,  Winner = Constants.Team1, CreatedOn = new DateTime(2016, 09, 01, 12, 00, 00)},
                new Game { GoalLimit = 10, Team1Score = 7,  Team2Score = 10, IsFinished = false, IsCanceled = true,                            CreatedOn = new DateTime(2016, 10, 05, 10, 30, 30)},
                new Game { GoalLimit = 3,  Team1Score = 1,  Team2Score = 2,  IsFinished = true,  IsCanceled = false, Winner = Constants.Team2, CreatedOn = new DateTime(2016, 10, 05, 10, 30, 30)}
            };

            return games;
        }
        public static List<PlayerGame> AddPlayerGames(List<Player> players, List<Game> games)
        {
            var playerGames = new List<PlayerGame>
            {
                new PlayerGame {Player = players[0],  Game = games[0], Team = Constants.Team1},
                new PlayerGame {Player = players[1],  Game = games[0], Team = Constants.Team1},
                new PlayerGame {Player = players[2],  Game = games[0], Team = Constants.Team2},
                new PlayerGame {Player = players[3],  Game = games[0], Team = Constants.Team2},

                new PlayerGame {Player = players[4],  Game = games[1], Team = Constants.Team1},
                new PlayerGame {Player = players[5],  Game = games[1], Team = Constants.Team1},
                new PlayerGame {Player = players[6],  Game = games[1], Team = Constants.Team2},
                new PlayerGame {Player = players[7],  Game = games[1], Team = Constants.Team2},

                new PlayerGame {Player = players[0],  Game = games[2], Team = Constants.Team1},
                new PlayerGame {Player = players[3],  Game = games[2], Team = Constants.Team1},
                new PlayerGame {Player = players[4],  Game = games[2], Team = Constants.Team2},
                new PlayerGame {Player = players[7],  Game = games[2], Team = Constants.Team2},

                new PlayerGame {Player = players[6],  Game = games[3], Team = Constants.Team1},
                new PlayerGame {Player = players[3],  Game = games[3], Team = Constants.Team1},
                new PlayerGame {Player = players[0],  Game = games[3], Team = Constants.Team2},
                new PlayerGame {Player = players[1],  Game = games[3], Team = Constants.Team2},

                new PlayerGame {Player = players[11], Game = games[4], Team = Constants.Team1},
                new PlayerGame {Player = players[8],  Game = games[4], Team = Constants.Team1},
                new PlayerGame {Player = players[9],  Game = games[4], Team = Constants.Team2},
                new PlayerGame {Player = players[10], Game = games[4], Team = Constants.Team2},

                new PlayerGame {Player = players[8],  Game = games[5], Team = Constants.Team1},
                new PlayerGame {Player = players[9],  Game = games[5], Team = Constants.Team1},
                new PlayerGame {Player = players[10], Game = games[5], Team = Constants.Team2},
                new PlayerGame {Player = players[11], Game = games[5], Team = Constants.Team2},

                new PlayerGame {Player = players[0],  Game = games[6], Team = Constants.Team1},
                new PlayerGame {Player = players[1],  Game = games[6], Team = Constants.Team1},
                new PlayerGame {Player = players[2],  Game = games[6], Team = Constants.Team2},
                new PlayerGame {Player = players[3],  Game = games[6], Team = Constants.Team2},

                new PlayerGame {Player = players[0],  Game = games[7], Team = Constants.Team1},
                new PlayerGame {Player = players[1],  Game = games[7], Team = Constants.Team1},
                new PlayerGame {Player = players[2],  Game = games[7], Team = Constants.Team2},
                new PlayerGame {Player = players[3],  Game = games[7], Team = Constants.Team2},

                new PlayerGame {Player = players[12], Game = games[8], Team = Constants.Team1},
                new PlayerGame {Player = players[13], Game = games[8], Team = Constants.Team1},
                new PlayerGame {Player = players[14], Game = games[8], Team = Constants.Team2},
                new PlayerGame {Player = players[15], Game = games[8], Team = Constants.Team2}
            };

            return playerGames;
        }
    }
}
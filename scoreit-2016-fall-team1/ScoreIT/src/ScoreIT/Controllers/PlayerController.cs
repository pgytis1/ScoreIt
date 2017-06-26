using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ScoreIT.Models;
using System.Web.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using static ScoreIT.SortTypeEnum;
using ScoreIT.RequestModels;
using ScoreIT.Services;
using ScoreIT.ViewModels;

namespace ScoreIT.Controllers
{
    
    [Route("api/[controller]")]
    public class PlayerController : Controller
    {
        private readonly IPlayerService _playerService;
        private readonly UserManager<User> _userManager;

        public PlayerController(IPlayerService playerService, UserManager<User> userManager )
        {
            _playerService = playerService;
            _userManager = userManager;
        }
        
        [HttpGet("searchByUsername/{query?}")]
        public IActionResult SearchByUsername([FromUri]string query, int? limit, int? skip)
        {
            var usersModels =_playerService.SearchByUsername(query, limit, skip);

            return Ok(usersModels);
        }


        [HttpGet("getPlayersFromLastGame")]
        public async Task<IActionResult> GetPlayersFromLastGame()
        {
            var user = await _userManager.GetUserAsync(HttpContext.User);

            var result = _playerService.GetPlayersFromLastGame(user.Id);

            return Ok(result);
        }

        [HttpGet("{id?}")]
        public async Task<IActionResult> SearchPlayerById(int? id)
        {
            SearchViewModel model;

            if (id == null)
            {
                var user = await _userManager.GetUserAsync(User);

                if (user == null)
                {
                    return Unauthorized();
                }

                model = _playerService.SearchPlayerByUserId(user.Id, false);
            }
            else
            {
                model = _playerService.SearchPlayerById(id.Value, false);
            }

            if (model == null)
            {
                return NotFound();
            }

            return Ok(model);
        }

        [HttpGet("getPlayerWithRecentGames/{id?}")]
        public async Task<IActionResult> GetPlayerWithRecentGames(int? id)
        {

            SearchViewModel playerWithRecentGames;

            if (id == null)
            {
                var user = await _userManager.GetUserAsync(User);

                if (user == null)
                {
                    return Unauthorized();
                }

                playerWithRecentGames = _playerService.SearchPlayerByUserId(user.Id, true);
            }

            else
            {
                playerWithRecentGames = _playerService.SearchPlayerById(id.Value, true);
            }

            return Ok(playerWithRecentGames);
        }

        [HttpGet("GetLeaderboard")]
        public IActionResult GetLeaderboard([FromUri] string query, int? limit, SortType sortBy, int? skip)
        {
            var leaderboard = _playerService.GetLeaderboard(query, limit, sortBy, skip);

            if (leaderboard == null)
            {
                return BadRequest();
            }
           

            return Ok(leaderboard.ToList());
        }

        [Authorize]
        [HttpPut("UpdateAvatar")]
        public async Task<IActionResult> UpdateAvatar([FromBody] UpdateAvatarRequestModel data)
        {
            if (!ModelState.IsValid)
            {
                var modelErrors = ModelStateHandler.GetModelStateErrors(ModelState);

                return BadRequest(new ApiResponse(false, messages: modelErrors.ToArray()));
            }

            var user = await _userManager.GetUserAsync(HttpContext.User);

            var errors = _playerService.UpdateAvatar(user.Id, data);
            if (errors != null)
            {
                return NotFound(errors);
            }
            return Ok();
        }

        [HttpGet("GetUnfinishedGame")]
        public async Task<IActionResult> GetUnfinishedGameForUser()
        {
            var user = await _userManager.GetUserAsync(HttpContext.User);

            var gameViewModel = _playerService.GetUnfinishedGameForPlayer(user.Id);

            return Ok(gameViewModel);
        }        
    }
}

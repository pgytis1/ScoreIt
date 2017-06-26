using System.Linq;
using System.Web.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ScoreIT.Models;
using ScoreIT.RequestModels;
using ScoreIT.Services;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using ScoreIT.ViewModels;

namespace ScoreIT.Controllers
{   
    [Route("api/[controller]")]
    public class GameController : Controller
    {
        private readonly IGameService _gameService;
        private readonly UserManager<User> _userManager;

        public GameController(IGameService gameService, UserManager<User> userManager )
        {
            _gameService = gameService;
            _userManager = userManager;
        }

        [Authorize]
        [HttpPost("createNewGame")]
        public IActionResult CreateNewGame([FromBody] CreateGameRequestModel model)
        {
            if (!ModelState.IsValid)
            {
                var modelErrors = ModelStateHandler.GetModelStateErrors(ModelState);

                return BadRequest(new ApiResponse(false, messages: modelErrors.ToArray()));
            }

            var errorMessages = _gameService.CreateNewGame(model);

            if (errorMessages != null)
            {
                return Forbid(errorMessages);
            }

            return Ok();
        }

        [HttpGet("RecentGames")]
        public async Task<IActionResult> GetRecentGames([FromUri] int? playerId, [FromUri] int? count,[FromUri] int? skip=0)
        {
            IEnumerable<GameViewModel> recentGames;
            if (playerId == -1)
            {
                var user = await _userManager.GetUserAsync(User);
                if (user == null)
                {
                    return Unauthorized();
                }

                recentGames = _gameService.GetRecentGamesByUserId(user.Id, count);
            }
            else
            {
                recentGames = _gameService.GetRecentGames(playerId, count, skip);
            }

            if (recentGames == null)
            {
                return BadRequest();
            }

            return Ok(recentGames.ToList());
        }

        [Authorize]
        [HttpPut("UpdateScore")]
        public async Task<IActionResult> UpdateScore([FromBody] UpdateScoreRequestModel data)
        {
            var user = await _userManager.GetUserAsync(HttpContext.User);

            var errorMessages = _gameService.UpdateScore(user.Id, data.GameId, data.Team, data.ScoreDelta);

            if (errorMessages != null)
            {
                if (errorMessages[0] == "finished")
                {
                    return Ok(errorMessages[0]);
                }
                return NotFound(errorMessages);
            }

            return Ok();
        }

        [Authorize]
        [HttpPost("cancelGame/{id}")]
        public async Task<IActionResult> CancelGame(int id)
        {

            var user = await _userManager.GetUserAsync(HttpContext.User);

            var errorMessages = _gameService.CancelOrFinishGame(id, user.Id, "cancel");

            if (errorMessages != null)
            {
                return NotFound(errorMessages);
            }

            return Ok();
        }

        [Authorize]
        [HttpPost("finishGame/{id}")]
        public async Task<IActionResult> FinishGame(int id)
        {
            var user =  await  _userManager.GetUserAsync(HttpContext.User);

            var errorMessages = _gameService.CancelOrFinishGame(id, user.Id, "finish");

            if (errorMessages != null)
            {
                return NotFound(errorMessages);
            }

            return Ok();
        }
    }
}
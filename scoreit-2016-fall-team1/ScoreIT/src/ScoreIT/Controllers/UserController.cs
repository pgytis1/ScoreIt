using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ScoreIT.Models;
using ScoreIT.ViewModels;
using System.Linq;

namespace ScoreIT.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ScoreItDbContext _dbContext;

        public UserController(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            ScoreItDbContext dbContext)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _dbContext = dbContext;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
        {
            if (!ModelState.IsValid)
            {
                var modelErrors = ModelStateHandler.GetModelStateErrors(ModelState);
                return BadRequest(modelErrors);
            }

            var user = new User
            {
                UserName = model.UserName,
                Email = model.Email
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                var player = new Player
                {
                    Rankname = Constants.Title[0],
                    User = user,
                    Avatar = Constants.DefaultAvatar
                };

                _dbContext.Players.Add(player);
                await _dbContext.SaveChangesAsync();
                await _signInManager.PasswordSignInAsync(model.UserName, model.Password, false, false);

                return Ok();
            }

            return BadRequest(result.Errors);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            var result = await _signInManager.PasswordSignInAsync(model.UserName, model.Password, false, false);

            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest(result);
        }

        [HttpGet("UserInfo")]
        public async Task<IActionResult> GetUserInfo()
        {
            if (_signInManager.IsSignedIn(User))
            {
                var user = await _userManager.GetUserAsync(User);

                var player = _dbContext.Players
                    .SingleOrDefault(x => x.UserId == user.Id);

                var result = new LoggedUserViewModel
                {
                    Id = player.Id,
                    UserName = user.UserName,
                    Avatar = player.Avatar
                };

                return Ok(result);
            }

            return Ok(null);

        }

        [HttpPost("LogOff")]
        public async Task<IActionResult> LogOff()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }
    }
}

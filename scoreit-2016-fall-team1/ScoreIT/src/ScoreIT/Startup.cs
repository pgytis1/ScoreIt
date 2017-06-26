using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using ScoreIT.Models;
using ScoreIT.Services;

namespace ScoreIT
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            if (env.IsEnvironment("Development"))
            {

            }

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            var connection = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<ScoreItDbContext>(options => options.UseSqlServer(connection));

            services.AddOptions();

            // Configure AppSettingsConfiguration using config by installing Microsoft.Extensions.Options.ConfigurationExtensions

            services.Configure<AppSettingsConfiguration>(myOptions =>
            {
                myOptions.DefaultConnection = connection;
            });

            services.AddDbContext<ScoreItDbContext>(options =>
                    options.UseSqlServer(connection));

            services.AddIdentity<User, IdentityRole>(options =>
                {
                    options.Password.RequireDigit = false;

                    options.Cookies.ApplicationCookie.Events = new CookieAuthenticationEvents
                    {
                        OnRedirectToLogin = ctx =>
                        {
                            if (ctx.Request.Path.StartsWithSegments("/api") &&
                                ctx.Response.StatusCode == (int) HttpStatusCode.OK)
                            {
                                ctx.Response.StatusCode = (int) HttpStatusCode.Unauthorized;
                            }
                            else
                            {
                                ctx.Response.Redirect(ctx.RedirectUri);
                            }
                            return Task.FromResult(0);
                        }
                    };
                })
                .AddEntityFrameworkStores<ScoreItDbContext>()
                .AddDefaultTokenProviders();

            services.AddMvc();

            services.AddTransient<IGameService, GameService>();
            services.AddTransient<IPlayerService, PlayerService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, ScoreItDbContext context)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseIdentity();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseMvc();

            var userManager = app.ApplicationServices.GetService<UserManager<User>>();
            DbInitializer.Initialize(context, userManager);
        }
    }
}

using Github.InterfacesServices;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;

namespace Github.Services
{
    public class AuthService : IAuthServices
    {
        private readonly IConfiguration _config;
        public AuthService(IConfiguration config, IServer server)
        {
            _config = config;

        }
        public LoginResponse Login(LoginRequest req)
        {
            //check if user exist in the db..

            //mock check
            if (req.Password != null && req.UserName != null)
            {
                if (req.UserName == req.UserName && req.Password == req.Password)
                {
                    return new LoginResponse() { Token = this.GenerateJWToken(req) };
                }
            }

            return null;
        }
        private string GenerateJWToken(LoginRequest userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sub, userInfo.UserName),
                new Claim(JwtRegisteredClaimNames.AuthTime,DateTime.Now.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
    };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Issuer"],
                claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}

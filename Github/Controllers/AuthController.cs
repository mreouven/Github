using Github.InterfacesServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HttpPostAttribute = Microsoft.AspNetCore.Mvc.HttpPostAttribute;

namespace Github.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        IAuthServices _authService;
        public AuthController(IAuthServices authService)
        {
            _authService = authService;
        }
        
        [Microsoft.AspNetCore.Mvc.HttpPost("login")]
        public IActionResult Login(LoginRequest request)
        {
            LoginResponse res = _authService.Login(request);
            if (res==null)
            {
                return Unauthorized();
            }
            return Ok(res);
        }


        [Authorize]
        [HttpPost("clientContext")]
        public IActionResult ClientContext()
        {
            
            return Ok();
        }


    }
}

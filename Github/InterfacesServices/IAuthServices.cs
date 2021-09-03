using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Github.InterfacesServices
{
    public interface IAuthServices
    {
        LoginResponse Login(LoginRequest req);
    }
}

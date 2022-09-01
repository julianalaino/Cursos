using System.Linq;
using System.Security.Claims;
using Aplicacion.Contratos;
using Microsoft.AspNetCore.Http;

namespace Seguridad
{
    public class UsuarioSesion : IUsuarioSesion
    {
        private readonly IHttpContextAccessor _iHttpContextAccessor;
        public UsuarioSesion (IHttpContextAccessor iHttpContextAccessor){
                _iHttpContextAccessor = iHttpContextAccessor;
        }
        public string ObtenerUsuarioSesion()
        {
            var username = _iHttpContextAccessor.HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            return username;
        }
    }
}
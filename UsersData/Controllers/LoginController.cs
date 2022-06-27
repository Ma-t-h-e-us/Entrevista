using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using UsersData.Domains;
using UsersData.Interfaces;
using UsersData.Repositories;
using UsersData.ViewModels;

namespace UsersData.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IUserURepository UserURepository { get; set; }

        public LoginController()
        {
            UserURepository = new UserURepository();
        }

        [HttpPost]
        public IActionResult Login(LoginViewModel Login)
        {
            try
            {
                UserU usuarioBuscado = UserURepository.Login(Login.Email, Login.Senha);
                if (usuarioBuscado == null)
                {
                    return NotFound("Email e/ou Senha inválidos");
                }
                var Claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Email, usuarioBuscado.Email),
                        new Claim(JwtRegisteredClaimNames.Jti, usuarioBuscado.IdUser.ToString()),
                        new Claim(ClaimTypes.Role, usuarioBuscado.IdType.ToString()),
                        new Claim( "status", usuarioBuscado.IdStatus.ToString()),
                        new Claim( "role", usuarioBuscado.IdType.ToString() ),
                    };

                var Key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("Walterwhitheuserdata"));
                var Creds = new SigningCredentials(Key, SecurityAlgorithms.HmacSha256);
                var meuToken = new JwtSecurityToken(
                        issuer: "UsersData",
                        audience: "UsersData",
                        claims: Claims,
                        expires: DateTime.Now.AddMinutes(360),
                        signingCredentials: Creds
                    );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(meuToken)
                });
            }
            catch (Exception Erro)
            {
                return BadRequest(Erro.Message);
            }
        }
    }
}

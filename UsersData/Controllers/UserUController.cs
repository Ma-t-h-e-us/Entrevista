using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using UsersData.Domains;
using UsersData.Interfaces;
using UsersData.Repositories;

namespace UsersData.Controllers
{
    [Produces("application/json")]
    [Microsoft.AspNetCore.Mvc.Route("api/[controller]")]
    [ApiController]
    public class UserUControllers : ControllerBase
    {
        private IUserURepository UserURepository { get; set; }

        public UserUControllers()
        {
            UserURepository = new UserURepository();
        }

        //Cadastrar usuario
        [Authorize(Roles = "2,3")]
        [HttpPost]
        public IActionResult RegisterUser(UserU NewUser)
        {
            try
            {
                if (NewUser == null)
                {
                    return BadRequest();
                }
                UserURepository.Register(NewUser);
                return StatusCode(201);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }

        //Listar usuarios
        [Authorize(Roles = "2,3")]
        [HttpGet("ListAll")]
        public IActionResult ListAll()
        {
            return Ok(UserURepository.ListAll());
        }

        //Listar Usuario
        [HttpGet("ListMe/{id}")]
        public IActionResult ListMe(int id)
        {
            return Ok(UserURepository.ListUser(id));
        }

        //Alterar Status
        [Authorize(Roles = "2,3")]
        [HttpPatch("AlterStatus/{id}")]
        public IActionResult AlterStatus(int id)
        {
            if (id <= 0)
            {
                return BadRequest(new
                {
                    Message = "Id inválido ou inexistente"
                });
            }
            UserURepository.AlterStatus(id);
            return StatusCode(204);
        }

        //Alterar Dados usuário
        [HttpPut]
        public IActionResult AlterUser(UserU UserAlter)
        {
            try
            {
                UserURepository.AlterUser(UserAlter);
                return StatusCode(204);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }

        //Excluir Usuário
        [Authorize(Roles = "3")]
        [HttpDelete("{idUser}")]
        public IActionResult DeleteUser(int idUser)
        {
            UserURepository.Remove(idUser);
            return StatusCode(204);
        }
    }
}


using UsersData.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UsersData.Interfaces
{
    interface IUserURepository
    {
        void Register(UserU NewUser);
        List<UserU> ListAll();
        void AlterUser(UserU UserAlter);
        void Remove(int id);
        UserU ListUser(int id);
        void AlterStatus(int id);
        UserU Login(string Email, string Senha);
    }
}

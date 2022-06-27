using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UsersData.Context;
using UsersData.Domains;
using UsersData.Interfaces;

namespace UsersData.Repositories
{
    public class UserURepository : IUserURepository
    {
        UsersDataContext ctx = new UsersDataContext();
        public void AlterStatus(int idUser)
        {
            UserU user = ListUser(idUser);
            if (user != null)
            {
                if (user.IdStatus == 1)
                {
                    user.IdStatus = 2;
                } else
                {
                    user.IdStatus = 1;
                }
            }
            ctx.UserUs.Update(user);
            ctx.SaveChanges();
        }

        public void AlterUser(UserU UserAlter)
        {
            UserU user = ListUser(UserAlter.IdUser);
            if (user != null)
            {
                user.Email = UserAlter.Email;
                user.Passwd = UserAlter.Passwd;
                user.IdStatus = UserAlter.IdStatus;
                user.IdType = UserAlter.IdType;
                user.NameUser = UserAlter.NameUser;
            }
            ctx.UserUs.Update(user);
            ctx.SaveChanges();
        }

        public List<UserU> ListAll()
        {
            return ctx.UserUs.ToList();
        }

        public UserU ListUser(int id)
        {
            return ctx.UserUs.FirstOrDefault(u => u.IdUser == id);
        }

        public void Register(UserU NewUser)
        {
            ctx.UserUs.Add(NewUser);
            ctx.SaveChanges();
        }

        public void Remove(int id)
        {
            ctx.UserUs.Remove(ListUser(id));
            ctx.SaveChanges();
        }

        public UserU Login(string Email, string Senha)
        {
            return ctx.UserUs.FirstOrDefault(u => u.Email == Email && u.Passwd == Senha);
        }
    }
}

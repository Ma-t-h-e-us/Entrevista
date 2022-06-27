using System;
using System.Collections.Generic;

#nullable disable

namespace UsersData.Domains
{
    public partial class UserU
    {
        public int IdUser { get; set; }
        public int? IdType { get; set; }
        public int? IdStatus { get; set; }
        public string NameUser { get; set; }
        public string Email { get; set; }
        public string Passwd { get; set; }

        public virtual UserStatus IdStatusNavigation { get; set; }
        public virtual UserType IdTypeNavigation { get; set; }
    }
}

using System;
using System.Collections.Generic;

#nullable disable

namespace UsersData.Domains
{
    public partial class UserStatus
    {
        public UserStatus()
        {
            UserUs = new HashSet<UserU>();
        }

        public int IdStatus { get; set; }
        public string StatusName { get; set; }

        public virtual ICollection<UserU> UserUs { get; set; }
    }
}

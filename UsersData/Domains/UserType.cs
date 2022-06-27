using System;
using System.Collections.Generic;

#nullable disable

namespace UsersData.Domains
{
    public partial class UserType
    {
        public UserType()
        {
            UserUs = new HashSet<UserU>();
        }

        public int IdType { get; set; }
        public string TypeName { get; set; }

        public virtual ICollection<UserU> UserUs { get; set; }
    }
}

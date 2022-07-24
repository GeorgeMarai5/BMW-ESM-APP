using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BMW_ESM_APP_API.Models
{
    public class AppUser : IdentityUser
    {
        [Key]
        public int UserID { get; set; }
        public string User_Email { get; set; }
        public bool Is_Active { get; set; }
        public virtual User_Type UserTypeID { get; set; }
    }
}

using System;
using System.ComponentModel.DataAnnotations;

namespace BMW_ESM_APP_API.Models.Entities
{
    public class Password
    {
        [Key]
        public int PasswordID { get; set; }
        public string Hashed_Password { get; set; }
        public DateTime Date_Set { get; set; }
        public virtual AppUser UserID { get; set; }
    }
}

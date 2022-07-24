using System.ComponentModel.DataAnnotations;

namespace BMW_ESM_APP_API.Models.Entities
{
    public class User
    {
        [Key]
        public int UserID { get; set; }
        public string User_Email { get; set; }
        public bool Is_Active { get; set; }
        public virtual User_Type UserTypeID { get; set; }
    }
}

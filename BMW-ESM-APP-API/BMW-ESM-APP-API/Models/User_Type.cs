using System.ComponentModel.DataAnnotations;

namespace BMW_ESM_APP_API.Models
  { 
    public class User_Type
    {
        [Key]
        public int UserTypeID { get; set; }
        public string Type_Name { get; set; }

    }
}

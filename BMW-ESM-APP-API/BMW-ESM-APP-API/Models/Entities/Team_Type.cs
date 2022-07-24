using System.ComponentModel.DataAnnotations;

namespace BMW_ESM_APP_API.Models.Entities
{
    public class Team_Type
    {
        [Key]
        public int TeamTypeID { get; set; }
        public string Type_Name { get; set; }

    }
}

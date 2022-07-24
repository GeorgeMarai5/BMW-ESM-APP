using System.ComponentModel.DataAnnotations;

namespace BMW_ESM_APP_API.Models.Entities
{
    public class Service_Type
    {
        [Key]
        public int ServiceTypeID { get; set; }
        public string Type_Description { get; set; }

    }
}

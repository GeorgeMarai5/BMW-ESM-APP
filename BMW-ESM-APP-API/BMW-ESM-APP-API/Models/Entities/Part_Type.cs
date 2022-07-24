using System.ComponentModel.DataAnnotations;

namespace BMW_ESM_APP_API.Models.Entities
{
    public class Part_Type
    {
        [Key]
        public int PartTypeID { get; set; }
        public string Type_Description { get; set; }

    }
}

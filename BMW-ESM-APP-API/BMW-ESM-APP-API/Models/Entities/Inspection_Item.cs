using System.ComponentModel.DataAnnotations;

namespace BMW_ESM_APP_API.Models.Entities
{
    public class Inspection_Item
    {
        [Key]
        public int InspectionItemID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

    }
}

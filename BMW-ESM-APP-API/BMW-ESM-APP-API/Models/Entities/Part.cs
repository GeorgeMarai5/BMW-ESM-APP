using System.ComponentModel.DataAnnotations;

namespace BMW_ESM_APP_API.Models.Entities
{
    public class Part
    {
        [Key]
        public int PartID { get; set; }
        public string Part_Name { get; set; }
        public bool Part_In_Stock { get; set; }
        public string Part_Description { get; set; }
        public virtual Part_Type PartTypeID { get; set; }

    }
}

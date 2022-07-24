using System.ComponentModel.DataAnnotations;

namespace BMW_ESM_APP_API.Models.Entities
{
    public class Service_Note
    {
        [Key]
        public int ServiceNoteID { get; set; }
        public virtual Service ServiceID { get; set; }
        public string Description { get; set; }
        
    }
}

using System.ComponentModel.DataAnnotations;

namespace BMW_ESM_APP_API.Models.Entities
{
    public class Status
    {
        [Key]
        public int StatusID { get; set; }
        public string Status_Name { get; set; }

    }
}

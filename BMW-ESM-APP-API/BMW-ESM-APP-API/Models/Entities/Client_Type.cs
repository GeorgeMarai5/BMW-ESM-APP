using System.ComponentModel.DataAnnotations;

namespace BMW_ESM_APP_API.Models.Entities
{
    public class Client_Type
    {
        [Key]
        public int ClientTypeID { get; set; }
        public string Description { get; set; }

    }
}

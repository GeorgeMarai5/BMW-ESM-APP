using System.ComponentModel.DataAnnotations;

namespace BMW_ESM_APP_API.Models.Entities
{
    public class Dealership
    {
        [Key]
        public int DealershipID { get; set; }
        public string Dealership_Name { get; set; }
        public virtual Address AddressID { get; set; }
    }
}

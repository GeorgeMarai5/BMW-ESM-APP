using System.ComponentModel.DataAnnotations;

namespace BMW_ESM_APP_API.Models.Entities
{
    public class Service_Price
    {
        [Key]
        public int ServicePriceID { get; set; }
        public virtual Service ServiceID { get; set; }
        public virtual Vehicle VehicleID { get; set; }
        public float Price { get; set; }
        public float Labour_Price { get; set; }
        
    }
}

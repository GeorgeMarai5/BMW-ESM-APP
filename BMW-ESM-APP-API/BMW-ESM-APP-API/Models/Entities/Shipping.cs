using System.ComponentModel.DataAnnotations;

namespace BMW_ESM_APP_API.Models.Entities
{
    public class Shipping
    {
        [Key]
        public int ShippingID { get; set; }
        public int Quantity { get; set; }
        public float Shipping_Cost { get; set; }
        public string Address { get; set; }

    }
}

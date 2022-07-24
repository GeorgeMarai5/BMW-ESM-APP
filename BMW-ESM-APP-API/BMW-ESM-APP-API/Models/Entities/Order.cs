using System;
using System.ComponentModel.DataAnnotations;

namespace BMW_ESM_APP_API.Models.Entities
{
    public class Order
    {
        [Key]
        public int OrderID { get; set; }
        public virtual Supplier SupplierID { get; set; }
        public virtual Shipping ShippingID { get; set; }
        public DateTime Date { get; set; }
    }
}

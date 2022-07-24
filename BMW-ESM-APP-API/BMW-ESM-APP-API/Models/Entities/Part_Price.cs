using System;
using System.ComponentModel.DataAnnotations;

namespace BMW_ESM_APP_API.Models.Entities
{
    public class Part_Price
    {
        [Key]
        public int PartPriceID { get; set; }
        public float Price { get; set; }
        public DateTime Date { get; set; }
        public virtual Part PartID { get; set; }
    }
}

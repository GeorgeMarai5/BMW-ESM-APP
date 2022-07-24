using System;
using System.ComponentModel.DataAnnotations;

namespace BMW_ESM_APP_API.Models.Entities
{
    public class Service_Flat_Rate
    {
        [Key]
        public int ServiceFlatRateID { get; set; }
        public float Amount { get; set; }
        public DateTime Date_Set { get; set; }

    }
}

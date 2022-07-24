using System;
using System.ComponentModel.DataAnnotations;

namespace BMW_ESM_APP_API.Models.Entities
{
    public class Address
    {
        [Key]
        public int AddressID { get; set; }
        public string address { get; set; }
        public string Postal_Code { get; set; }
        public DateTime Date_Of_Update { get; set; }

    }
}

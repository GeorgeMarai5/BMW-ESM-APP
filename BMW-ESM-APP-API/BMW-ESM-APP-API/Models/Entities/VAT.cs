using System;
using System.ComponentModel.DataAnnotations;

namespace BMW_ESM_APP_API.Models
{
    public class VAT
    {
        [Key]
        public int VATID { get; set; }
        public float Amount { get; set; }
        public DateTime Date { get; set; }

    }
}

using System;
using System.ComponentModel.DataAnnotations;

namespace BMW_ESM_APP_API.Models.Entities
{
    public class Booking
    {
        [Key]
        public int BookingID { get; set; }
        public string Reference_Num { get; set; }
        public DateTime Booking_Date { get; set; }
        public virtual Client ClientID { get; set; }

    }
}

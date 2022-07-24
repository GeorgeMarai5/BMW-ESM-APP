using System;
using System.ComponentModel.DataAnnotations;

namespace BMW_ESM_APP_API.Models.Entities
{
    public class Booking_Instance
    {
        [Key]
        public int BookingInstanceID { get; set; }
        public virtual Booking BookingID { get; set; }
        public virtual Service ServiceID { get; set; }
        public virtual Session SessionID { get; set; }
        public bool Booking_Status { get; set; }
        public DateTime Date { get; set; }
        
    }
}

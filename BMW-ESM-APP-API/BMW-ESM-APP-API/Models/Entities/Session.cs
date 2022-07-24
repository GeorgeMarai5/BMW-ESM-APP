using System;
using System.ComponentModel.DataAnnotations;

namespace BMW_ESM_APP_API.Models.Entities
{
    public class Session
    {
        [Key]
        public int SessionID { get; set; }
        public DateTime Start_Time { get; set; }
        public DateTime End_Time { get; set; }
    }
}

using System;
using System.ComponentModel.DataAnnotations;

namespace BMW_ESM_APP_API.Models.Entities
{
    public class Feedback
    {
        [Key]
        public int FeedbackID { get; set; }
        public virtual Quote QuoteID { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }

    }
}

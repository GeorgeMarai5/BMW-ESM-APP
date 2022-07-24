using System;
using System.ComponentModel.DataAnnotations;

namespace BMW_ESM_APP_API.Models.Entities
{
    public class Quote
    {
        [Key]
        public int QuoteID { get; set; }
        public virtual Client ClientID { get; set; }
        public virtual Service_Note ServiceNoteID { get; set; }
        public virtual Service_Price ServicePriceID { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public bool Is_Accepted { get; set; }

    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BMW_ESM_APP_API.Models.Entities
{
    public class Inspection
    {
        [Key]
        public int InspectionID { get; set; }
        public virtual ICollection<Inspection_Item> Items { get; set; }
        public DateTime Date { get; set; }
        public virtual Status StatusID { get; set; }

    }
}

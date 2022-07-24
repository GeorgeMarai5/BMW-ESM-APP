using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BMW_ESM_APP_API.Models.Entities
{
    public class Service
    {
        [Key]
        public int ServiceID { get; set; }
        public virtual Dealership DealershipID { get; set; }
        public virtual Team TeamID { get; set; }
        public virtual Service_Type ServiceTypeID { get; set; }
        public virtual ICollection<Inspection> Inspections { get; set; }
        public bool Service_Is_Completed { get; set; }

    }
}

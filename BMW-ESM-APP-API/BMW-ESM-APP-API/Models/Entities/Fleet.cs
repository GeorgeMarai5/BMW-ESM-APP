using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BMW_ESM_APP_API.Models.Entities
{
    public class Fleet
    {
        [Key]
        public int FleetID { get; set; }
        public string Fleet_Name { get; set; }
        public string Fleet_Location { get; set; }
        public virtual Client ClientID { get; set; }
        public virtual ICollection<Vehicle> Vehicles { get; set; }

    }
}

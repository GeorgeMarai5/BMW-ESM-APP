using BMW_ESM_APP_API.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BMW_ESM_APP_API.ViewModels
{
  public class FleetViewModel
  {
    public int FleetID { get; set; }
    public string Fleet_Name { get; set; }
    public string Fleet_Location { get; set; }
    public virtual Client ClientID { get; set; }
    public virtual ICollection<Vehicle> Vehicles { get; set; }
  }
}

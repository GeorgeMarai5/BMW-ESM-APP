using BMW_ESM_APP_API.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BMW_ESM_APP_API.ViewModels
{
  public class TeamViewModel
  {
    public int TeamID { get; set; }
    public string Team_Name { get; set; }
    public int Quantity { get; set; }
    public enum Is_Active { Active, Not_Working }
    public virtual Dealership DealershipID { get; set; }
    public virtual Team_Type TeamTypeID { get; set; }
  }
}

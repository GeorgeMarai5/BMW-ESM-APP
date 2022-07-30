using BMW_ESM_APP_API.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BMW_ESM_APP_API.ViewModels
{
  public class DealershipViewModel
  {
    public int DealershipID { get; set; }
    public string Dealership_Name { get; set; }
    public virtual Address AddressID { get; set; }
  }
}

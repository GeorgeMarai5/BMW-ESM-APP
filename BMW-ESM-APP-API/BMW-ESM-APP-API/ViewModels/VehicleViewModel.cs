using BMW_ESM_APP_API.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BMW_ESM_APP_API.ViewModels
{
  public class VehicleViewModel
  {
    public int VehicleID { get; set; }
    public virtual Vehicle_Model VehicleModelID { get; set; }
    public string VIN_Number { get; set; }
    public virtual Warranty_Plan WarrantyPlanID { get; set; }
    public virtual Maintenance_Plan MaintenancePlanID { get; set; }
  }
}

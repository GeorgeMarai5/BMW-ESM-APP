using System.ComponentModel.DataAnnotations;

namespace BMW_ESM_APP_API.Models.Entities
{
    public class Vehicle
    {
        [Key]
        public int VehicleID { get; set; }
        public virtual Vehicle_Model VehicleModelID { get; set; }
        public string VIN_Number { get; set; }
        public virtual Warranty_Plan WarrantyPlanID { get; set; }
        public virtual Maintenance_Plan MaintenancePlanID { get; set; }

    }
}

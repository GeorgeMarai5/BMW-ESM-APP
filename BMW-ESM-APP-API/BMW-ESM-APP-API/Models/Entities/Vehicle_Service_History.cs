using System.ComponentModel.DataAnnotations;

namespace BMW_ESM_APP_API.Models.Entities
{
    public class Vehicle_Service_History
    {
        [Key]
        public int VehicleServiceHistoryID { get; set; }
        public virtual Service ServiceID { get; set; }
        public virtual Vehicle VehicleID { get; set; }
        public virtual Quote QuoteID { get; set; }

    }
}

using System.ComponentModel.DataAnnotations;

namespace BMW_ESM_APP_API.Models.Entities
{
    public class Vehicle_Model
    {
        [Key]
        public int VehicleModelID { get; set; }
        public string Model_Name { get; set; }
        public int Year { get; set; }

    }
}

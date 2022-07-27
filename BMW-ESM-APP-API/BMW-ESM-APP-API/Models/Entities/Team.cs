using System.ComponentModel.DataAnnotations;

namespace BMW_ESM_APP_API.Models.Entities
{
    public class Team
    {
        [Key]
        public int TeamID { get; set; }
        public string Team_Name { get; set; }
        public int Quantity { get; set; }
        public enum Is_Active { Active, Not_Working }
        public virtual Dealership DealershipID { get; set; }
        public virtual Team_Type TeamTypeID { get; set; }
    }
}

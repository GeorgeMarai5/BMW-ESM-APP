using System.ComponentModel.DataAnnotations;

namespace BMW_ESM_APP_API.Models.Entities
{
    public class Employee
    {
        [Key]
        public int EmployeeID { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Phone_Num { get; set; }
        public string Email { get; set; }
        public virtual User UserID { get; set; }
        public virtual Employee_Role EmployeeRoleID { get; set; }
        public virtual Team TeamID { get; set; }
    }
}

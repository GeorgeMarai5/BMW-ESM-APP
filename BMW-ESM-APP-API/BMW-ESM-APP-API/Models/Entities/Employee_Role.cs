using System.ComponentModel.DataAnnotations;

namespace BMW_ESM_APP_API.Models.Entities
{
    public class Employee_Role
    {
        [Key]
        public int EmployeeRoleID { get; set; }
        public string Role_Name { get; set; }

    }
}

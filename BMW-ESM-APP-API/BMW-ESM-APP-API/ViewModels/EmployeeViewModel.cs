using BMW_ESM_APP_API.Models;
using BMW_ESM_APP_API.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BMW_ESM_APP_API.ViewModels
{
  public class EmployeeViewModel
  {
    public int EmployeeID { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Phone_Num { get; set; }
    public string Email { get; set; }
    public virtual AppUser UserID { get; set; }
    public virtual Employee_Role EmployeeRoleID { get; set; }
    public virtual Team TeamID { get; set; }
  }
}

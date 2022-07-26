using BMW_ESM_APP_API.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BMW_ESM_APP_API.ViewModels
{
  public class ServiceNoteViewModel
  {
    public int ServiceNoteID { get; set; }
    public virtual Service ServiceID { get; set; }
    public string Description { get; set; }

  }
}

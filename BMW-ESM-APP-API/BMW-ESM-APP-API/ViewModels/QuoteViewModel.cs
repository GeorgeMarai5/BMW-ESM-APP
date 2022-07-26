using BMW_ESM_APP_API.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace BMW_ESM_APP_API.ViewModels
{
  public class QuoteViewModel
  {
    public virtual Service ServiceNoteID { get; set; }
    public virtual Service ServicePriceID { get; set; }
    public int ClientID { get; set; }
    public DateTime Date { get; set; }
    public string Description { get; set; }
    public Boolean isAccepted { get; set; }
  }
}

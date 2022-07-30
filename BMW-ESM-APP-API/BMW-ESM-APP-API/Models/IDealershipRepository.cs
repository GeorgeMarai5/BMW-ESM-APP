using BMW_ESM_APP_API.Models.Entities;
using System.Threading.Tasks;

namespace BMW_ESM_APP_API.Models
{
  public class IDealershipRepository
  {
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;
    Task<bool> SaveChangesAsync();
    Task<Service_Note[]> GetAllDealershipsAsync();
    Task<Service_Note> GetDealershipsAsync(string name);
  }
}

using BMW_ESM_APP_API.Models;
using BMW_ESM_APP_API.Models.Entities;
using BMW_ESM_APP_API.ViewModels;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace BMW_ESM_APP_API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class DealershipController : ControllerBase
  {
    private readonly IDealershipRepository _courseRepository;
    private readonly IMapper _mapper;

    public DealershipController(IDealershipRepository courseRepository, IMapper mapper)
    {
      _courseRepository = courseRepository;
      _mapper = mapper;
    }

    [HttpGet]
    [Route("GetAllDealerships")]
    public async Task<IActionResult> GetAllDealerships()
    {
      try
      {
        var results = await _courseRepository.GetAllDealershipsAsync();
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpPost]
    [Route("AddDealership")]
    public async Task<IActionResult> AddDealership(DealershipViewModel dvm)
    {
      var dealership = new Dealership
      {
        DealershipID = dvm.DealershipID,
        Dealership_Name = dvm.Dealership_Name,
        AddressID = dvm.AddressID
      };

      try
      {
        _courseRepository.Add(dealership);
        await _courseRepository.SaveChangesAsync();
      }
      catch (Exception)
      {
        return BadRequest("Invalid transaction");
      }

      return Ok("Record saved in database");
    }


    [HttpDelete]
    [Route("DeleteDealership")]
    public async Task<IActionResult> DeleteDealership(string name)
    {
      try
      {
        var existingDealership = await _courseRepository.GetDealershipsAsync(name);

        if (existingDealership == null) return NotFound();

        _courseRepository.Delete(existingDealership);

        if (await _courseRepository.SaveChangesAsync())
        {
          return Ok();
        }
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error! Contact Support");
      }

      return BadRequest();
    }
  }
}

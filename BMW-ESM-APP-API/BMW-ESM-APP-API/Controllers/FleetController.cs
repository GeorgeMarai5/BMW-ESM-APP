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
  public class FleetController : ControllerBase
  {
    private readonly IFleetRepository _courseRepository;
    private readonly IMapper _mapper;

    public FleetController(IFleetRepository courseRepository, IMapper mapper)
    {
      _courseRepository = courseRepository;
      _mapper = mapper;
    }

    [HttpGet]
    [Route("GetAllFleet")]
    public async Task<IActionResult> GetAllFleets()
    {
      try
      {
        var results = await _courseRepository.GetAllFleetsAsync();
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpPost]
    [Route("AddFleet")]
    public async Task<IActionResult> AddFleet(FleetViewModel fvm)
    {
      var fleet = new Fleet
      {
        FleetID = fvm.FleetID,
        Fleet_Name = fvm.Fleet_Name,
        Fleet_Location = fvm.Fleet_Location,
        ClientID = fvm.ClientID,
        Vehicles = fvm.Vehicles
      };

      try
      {
        _courseRepository.Add(fleet);
        await _courseRepository.SaveChangesAsync();
      }
      catch (Exception)
      {
        return BadRequest("Invalid transaction");
      }

      return Ok("Record saved in database");
    }


    [HttpDelete]
    [Route("DeleteFleet")]
    public async Task<IActionResult> DeleteFleet(string name)
    {
      try
      {
        var existingFleet = await _courseRepository.GetFleetsAsync(name);

        if (existingFleet == null) return NotFound();

        _courseRepository.Delete(existingFleet);

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

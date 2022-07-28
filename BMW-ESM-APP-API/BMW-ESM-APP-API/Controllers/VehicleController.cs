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
  public class VehicleController : ControllerBase
  {
    private readonly IVehicleCourseRepository _courseRepository;
    private readonly IMapper _mapper;

    public VehicleController(IVehicleCourseRepository courseRepository, IMapper mapper)
    {
      _courseRepository = courseRepository;
      _mapper = mapper;
    }

    [HttpGet]
    [Route("GetAllVehicles")]
    public async Task<IActionResult> GetAllVehicles()
    {
      try
      {
        var results = await _courseRepository.GetAllVehiclesAsync();
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpPost]
    [Route("AddVehicle")]
    public async Task<IActionResult> AddVehicle(VehicleViewModel vvm)
    {
      var vehicle = new Vehicle
      {
        VehicleID = vvm.VehicleID,
        VehicleModelID = vvm.VehicleModelID,
        VIN_Number = vvm.VIN_Number,
        WarrantyPlanID = vvm.WarrantyPlanID,
        MaintenancePlanID = vvm.MaintenancePlanID
      };

      try
      {
        _courseRepository.Add(vehicle);
        await _courseRepository.SaveChangesAsync();
      }
      catch (Exception)
      {
        return BadRequest("Invalid transaction");
      }

      return Ok("Record saved in database");
    }


    [HttpDelete]
    [Route("DeleteVehicle")]
    public async Task<IActionResult> DeleteVehicle(string name)
    {
      try
      {
        var existingVehicle = await _courseRepository.GetVehiclesAsync(name);

        if (existingVehicle == null) return NotFound();

        _courseRepository.Delete(existingVehicle);

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

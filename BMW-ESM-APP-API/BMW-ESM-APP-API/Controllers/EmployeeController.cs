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
  public class EmployeeController : ControllerBase
  {
    private readonly IEmployeeRepository _courseRepository;
    private readonly IMapper _mapper;

    public EmployeeController(IEmployeeRepository courseRepository, IMapper mapper)
    {
      _courseRepository = courseRepository;
      _mapper = mapper;
    }

    [HttpGet]
    [Route("GetAllEmployees")]
    public async Task<IActionResult> GetAllEmployees()
    {
      try
      {
        var results = await _courseRepository.GetAllEmployeesAsync();
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpPost]
    [Route("AddEmployee")]
    public async Task<IActionResult> AddEmployee(EmployeeViewModel evm)
    {
      var employee = new Employee
      {
        EmployeeID = evm.EmployeeID,
        Name = evm.Name,
        Surname = evm.Surname,
        Phone_Num = evm.Phone_Num,
        Email = evm.Email,
        UserID = evm.UserID,
        EmployeeRoleID = evm.EmployeeRoleID,
        TeamID = evm.TeamID
      };

      try
      {
        _courseRepository.Add(team);
        await _courseRepository.SaveChangesAsync();
      }
      catch (Exception)
      {
        return BadRequest("Invalid transaction");
      }

      return Ok("Record saved in database");
    }


    [HttpDelete]
    [Route("DeleteEmployee")]
    public async Task<IActionResult> DeleteEmployee(string name)
    {
      try
      {
        var existingEmployee = await _courseRepository.GetTeamsAsync(name);

        if (existingEmployee == null) return NotFound();

        _courseRepository.Delete(existingEmployee);

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

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
  public class TeamController : ControllerBase
  {
    private readonly ITeamCourseRepository _courseRepository;
    private readonly IMapper _mapper;

    public TeamController(ITeamCourseRepository courseRepository, IMapper mapper)
    {
      _courseRepository = courseRepository;
      _mapper = mapper;
    }

    [HttpGet]
    [Route("GetAllTeams")]
    public async Task<IActionResult> GetAllTeams()
    {
      try
      {
        var results = await _courseRepository.GetAllTeamsAsync();
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpPost]
    [Route("AddTeam")]
    public async Task<IActionResult> AddTeam(TeamViewModel tvm)
    {
      var team = new Team
      {
        TeamID = tvm.TeamID,
        Team_Name = tvm.Team_Name,
        Quantity = tvm.Quantity,
        DealershipID = tvm.DealershipID,
        TeamTypeID = tvm.TeamTypeID
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
    [Route("DeleteTeam")]
    public async Task<IActionResult> DeleteTeam(string name)
    {
      try
      {
        var existingTeam = await _courseRepository.GetTeamsAsync(name);

        if (existingTeam == null) return NotFound();

        _courseRepository.Delete(existingTeam);

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

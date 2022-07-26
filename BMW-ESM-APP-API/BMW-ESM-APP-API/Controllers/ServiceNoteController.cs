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
  public class ServiceNoteController : ControllerBase
  {
    private readonly ICourseRepository _courseRepository;
    private readonly IMapper _mapper;

    public ServiceNoteController(ICourseRepository courseRepository, IMapper mapper)
    {
      _courseRepository = courseRepository;
      _mapper = mapper;
    }

    [HttpGet]
    [Route("GetAllServiceNotes")]
    public async Task<IActionResult> GetAllServiceNotesAsync()
    {
      try
      {
        var results = await _courseRepository.GetAllServiceNotesAsync();
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpPost]
    [Route("AddServiceNote")]
    public async Task<IActionResult> AddServiceNote(ServiceNoteViewModel snvm)
    {
      var serviceNote = new Service_Note { ServiceID = snvm.ServiceID, Description = snvm.Description };

      try
      {
        _courseRepository.Add(serviceNote);
        await _courseRepository.SaveChangesAsync();
      }
      catch (Exception)
      {
        return BadRequest("Invalid transaction");
      }

      return Ok("Record saved in database");
    }


    [HttpDelete]
    [Route("DeleteServiceNote")]
    public async Task<IActionResult> DeleteServiceNote(string name)
    {
      try
      {
        var existingServiceNote = await _courseRepository.GetServiceNoteAsync(name);

        if (existingServiceNote == null) return NotFound();

        _courseRepository.Delete(existingServiceNote);

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

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
  public class ClientController : ControllerBase
  {
    private readonly IClientRepository _courseRepository;
    private readonly IMapper _mapper;

    public ClientController(IClientRepository courseRepository, IMapper mapper)
    {
      _courseRepository = courseRepository;
      _mapper = mapper;
    }

    [HttpGet]
    [Route("GetAllClients")]
    public async Task<IActionResult> GetAllClients()
    {
      try
      {
        var results = await _courseRepository.GetAllClientsAsync();
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpPost]
    [Route("AddClient")]
    public async Task<IActionResult> AddClient(ClientViewModel cvm)
    {
      var client = new Client
      {
        ClientID = cvm.ClientID,
        First_Name = cvm.First_Name,
        Last_Name = cvm.Last_Name,
        Phone_Number = cvm.Phone_Number,
        Email = cvm.Email,
        Registration_Date = cvm.Registration_Date,
        Last_Update = cvm.Last_Update,
        UserID = cvm.UserID,
        AddressID = cvm.AddressID,
        TitleID = cvm.TitleID,
        ClientTypeID = cvm.ClientTypeID
      };

      try
      {
        _courseRepository.Add(client);
        await _courseRepository.SaveChangesAsync();
      }
      catch (Exception)
      {
        return BadRequest("Invalid transaction");
      }

      return Ok("Record saved in database");
    }


    [HttpDelete]
    [Route("DeleteClient")]
    public async Task<IActionResult> DeleteClient(string name)
    {
      try
      {
        var existingClient = await _courseRepository.GetClientAsync(name);

        if (existingClient == null) return NotFound();

        _courseRepository.Delete(existingClient);

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

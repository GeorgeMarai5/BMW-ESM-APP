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
  public class QuoteController : ControllerBase
  {
    private readonly IQuoteRepository _quoteRepository;
    private readonly IMapper _mapper;

    public QuoteController(IQuoteRepository quoteRepository, IMapper mapper)
    {
      _quoteRepository = quoteRepository;
      _mapper = mapper;
    }

    [HttpGet]
    [Route("GetAllQuotes")]
    public async Task<IActionResult> GetAllQuotesAsync()
    {
      try
      {
        var results = await _quotesRepository.GetAllQuotesAsync();
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
      }
    }

    [HttpPost]
    [Route("AddQuote")]
    public async Task<IActionResult> AddQuote(QuoteViewModel qv)
    {
      var quote = new Quote { QuoteID = qv.QuoteID,
        ClientID = qv.ClientID,
        Description = qv.Description,
        ServiceNoteID = qv.ServiceNoteID,
        ServicePriceID = qv.ServicePriceID,
        Date = qv.Date,
        Is_Accepted = qv.isAccepted
      };

      try
      {
        _quoteRepository.Add(quote);
        await _quoteRepository.SaveChangesAsync();
      }
      catch (Exception)
      {
        return BadRequest("Invalid transaction");
      }

      return Ok("Record saved in database");
    }


    [HttpDelete]
    [Route("DeleteQuote")]
    public async Task<IActionResult> DeleteQuote(string name)
    {
      try
      {
        var existingQuote = await _quoteRepository.GetQuotesAsync(name);

        if (existingQuote == null) return NotFound();

        _quoteRepository.Delete(existingServiceNote);

        if (await _quoteRepository.SaveChangesAsync())
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


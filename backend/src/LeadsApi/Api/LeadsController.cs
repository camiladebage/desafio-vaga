using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/leads")]
public class LeadsController : ControllerBase
{
    private readonly AppDbContext _context;

    public LeadsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("getLeads")]
    public async Task<IActionResult> Get(string? search, LeadStatus? status)
    {
        var query = _context.Leads.Include(l => l.Tasks).AsQueryable();

        if (!string.IsNullOrEmpty(search))
        {
            query = query.Where(l => l.Name.Contains(search) || l.Email.Contains(search));
        }

        if (status.HasValue)
        {
            query = query.Where(l => l.Status == status);
        }

        var result = await query
        .Select(l => new LeadDto(
            l.Id,
            l.Name,
            l.Email,
            l.Status,
            l.CreatedAt,
            l.UpdatedAt,
            l.Tasks.Count
        ))
        .ToListAsync();

        return Ok(result);
    }

    [HttpGet("getLeadsById")]
    public async Task<IActionResult> GetById(int id)
    {
        var query = _context.Leads
            .Include(l => l.Tasks)
            .Where(L => L.Id == id);

        var result = await query
            .Select(l => new LeadDto(
                l.Id,
                l.Name,
                l.Email,
                l.Status,
                l.CreatedAt,
                l.UpdatedAt,
                l.Tasks.Count
            ))
            .ToListAsync();

        return Ok(result);
    }

    [HttpPost("createLeads")]
    public async Task<IActionResult> Create(LeadCreateDto dto)
    {
        if (dto.Name.Length < 3)
            return BadRequest("Nome inválido");

        var lead = new Lead
        {
            Name = dto.Name,
            Email = dto.Email,
            Status = dto.Status ?? LeadStatus.New
        };

        _context.Leads.Add(lead);
        await _context.SaveChangesAsync();

        return Ok(lead);
    }

    [HttpPut("updateLeads")]
    public async Task<IActionResult> Update(LeadUpdateDto dto)
    {
        if (dto.Name.Length < 3)
            return BadRequest("Nome inválido");

        var lead = new Lead
        {
            Name = dto.Name,
            Email = dto.Email,
            Status = dto.Status
        };

        _context.Leads.Update(lead);
        await _context.SaveChangesAsync();

        return Ok(lead);
    }

    [HttpDelete("deleteLeads")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _context.Leads.FindAsync(id);

        _context.Leads.Remove(result);
        await _context.SaveChangesAsync();

        return Ok();
    }
}
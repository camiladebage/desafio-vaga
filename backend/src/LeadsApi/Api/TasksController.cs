using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/leads")]
public class TasksController : ControllerBase
{
    private readonly AppDbContext _context;

    public TasksController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("getTasks")]
    public async Task<IActionResult> Get(int leadId)
    {
        var query = _context.Tasks.Include(l => l.Lead)
            .Where(t => t.LeadId == leadId);

        var result = await query
            .Select(t => new TaskDto(
                t.Id,
                t.LeadId,
                t.Title,
                t.DueDate,
                t.Status,
                t.CreatedAt,
                t.UpdatedAt
            ))
            .ToListAsync();

        return Ok(result);
    }

    [HttpPost("createTasks")]
    public async Task<IActionResult> Create(TaskCreateDto dto,int leadId)
    {
        if (dto.Title.Length < 3)
            return BadRequest("Nome inválido");

        var task = new TaskItem
        {
            LeadId = leadId,
            Title = dto.Title,
            DueDate = dto.DueDate,
            Status = dto.Status ?? TaskStatus.Todo
        };

        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();

        return Ok(task);
    }

    [HttpPut("updateTasks")]
    public async Task<IActionResult> Update(TaskCreateDto dto, int leadId, int taskId)
    {
        if (dto.Title.Length < 3)
            return BadRequest("Nome inválido");

        var task = await _context.Tasks
            .Where(t => t.LeadId == leadId && t.Id == taskId)
            .FirstOrDefaultAsync();

        task.Status = dto.Status ?? TaskStatus.Todo;
        task.Title = dto.Title;
        task.DueDate = dto.DueDate;

        _context.Tasks.Update(task);
        await _context.SaveChangesAsync();

        return Ok(task);
    }

    [HttpDelete("deleteTasks")]
    public async Task<IActionResult> Delete(int leadId, int taskId)
    {
        var task = await _context.Tasks
            .Where(t => t.LeadId == leadId && t.Id == taskId)
            .FirstOrDefaultAsync();

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();

        return Ok();
    }
}
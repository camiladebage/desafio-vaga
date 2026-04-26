using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

public class TaskItem
{
    public int Id { get; set; }
    public int LeadId { get; set; }
    public string Title { get; set; } = null!;
    public DateTime? DueDate { get; set; }
    public TaskStatus Status { get; set; } = TaskStatus.Todo;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    [ForeignKey("LeadId")]
    [DeleteBehavior(DeleteBehavior.NoAction)]
    public Lead? Lead { get; set; }
}

public enum TaskStatus { Todo = 0, Doing = 1, Done = 2 }

public record TaskCreateDto(string Title, DateTime? DueDate, TaskStatus? Status);
public record TaskUpdateDto(string Title, DateTime? DueDate, TaskStatus Status);
public record TaskDto(int Id, int LeadId, string Title, DateTime? DueDate, TaskStatus Status, DateTime CreatedAt, DateTime UpdatedAt);
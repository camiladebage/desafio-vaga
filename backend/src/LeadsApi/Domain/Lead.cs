public class Lead
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Email { get; set; } = null!;
    public LeadStatus Status { get; set; } = LeadStatus.New;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();
}

public enum LeadStatus { New = 0, Qualified = 1, Won = 2, Lost = 3 }

public record LeadCreateDto(string Name, string Email, LeadStatus? Status);
public record LeadUpdateDto(string Name, string Email, LeadStatus Status);
public record LeadDto(int Id, string Name, string Email, LeadStatus Status, DateTime CreatedAt, DateTime UpdatedAt, int TasksCount);
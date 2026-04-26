using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public DbSet<Lead> Leads => Set<Lead>();
    public DbSet<TaskItem> Tasks => Set<TaskItem>();

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Lead>()
            .HasMany(l => l.Tasks)
            .WithOne(t => t.Lead!)
            .HasForeignKey(t => t.LeadId);
    }
}
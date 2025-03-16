using OrderMicroservice.Models;
using Microsoft.EntityFrameworkCore;

namespace OrderMicroservice.Data
{
    

    
        public class ApplicationDbContext : DbContext
        {
            public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

            public DbSet<Order> Orders { get; set; }
        }
    
}

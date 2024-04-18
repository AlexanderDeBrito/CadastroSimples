using Microsoft.EntityFrameworkCore;
using ProjetoFullStack.Model;

namespace ProjetoFullStack.Context
{
    public class Contexto : DbContext
    {
        public Contexto(DbContextOptions<Contexto> options) : base(options)
        {
            Database.EnsureCreated();
        }
        public DbSet<Contato> Contato { get; set; }
        public DbSet<Cliente> Cliente { get; set; }
        public DbSet<Login> Login { get; set; }
    }
}

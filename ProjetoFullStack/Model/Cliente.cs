using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoFullStack.Model
{
    [Table("Cliente")]
    public class Cliente
    {
        [Column("Id")]
        public int Id { get; set; }
        [Column("Nome")] 
        public string Nome { get; set; }
        [Column("Email")]
        public string Email { get; set; }
        [Column("Telefone")]
        public string Telefone { get; set; }
        [Column("DataRegistro")]
        public DateTime DataRegistro { get; set; }
    }
}

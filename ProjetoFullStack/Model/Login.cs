using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoFullStack.Model
{
    [Table("Usuario")]
    public class Login
    {
        [Column("Id")]
        public int Id { get; set; }
        [Column("Nome")]
        public string Nome { get; set; }
        [Column("Telefone")]
        public string Telefone { get; set; }
        [Column("NomeDeUsuario")]
        public string NomeDeUsuario { get; set; }
        [Column("Senha")]
        public string Senha { get; set; }
    }
}

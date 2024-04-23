using ProjetoFullStack.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProjetoFullStack.Service
{
    public interface IContatoService
    {
        public Task<bool> SaveContatos(IEnumerable<Contato> contatos);
        public Task<IEnumerable<Contato>> Getcontato(int idCliente);
        public Task<bool> VincularContatos(int clienteId, IEnumerable<int> contatosId);
        public Task<IEnumerable<Contato>> ContatosSemVinculos();
    }
}
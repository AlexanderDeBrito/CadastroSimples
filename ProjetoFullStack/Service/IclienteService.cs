using ProjetoFullStack.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProjetoFullStack.Service
{
    public interface IclienteService
    {
        Task<IEnumerable<Cliente>> GetCliente();
    }
}
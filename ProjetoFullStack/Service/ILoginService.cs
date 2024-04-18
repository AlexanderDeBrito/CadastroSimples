using ProjetoFullStack.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProjetoFullStack.Service
{
    public interface ILoginService
    {
        Task<IEnumerable<Login>> GetLogin();
        Task<Login> ValidarLogin(Login login);
    }
}
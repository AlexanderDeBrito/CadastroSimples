using Microsoft.EntityFrameworkCore;
using ProjetoFullStack.Context;
using ProjetoFullStack.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoFullStack.Service
{
    public class LoginService : ILoginService
    {
        private readonly Contexto _context;

        public LoginService(Contexto context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Login>> GetLogin()
        {
            return await _context.Login.ToListAsync().ConfigureAwait(false);
        }

        public async Task<Login> ValidarLogin(Login login)
        {
            return await _context.Login.FirstAsync(
                l => l.NomeDeUsuario == login.NomeDeUsuario &&
                l.Senha == login.Senha );
        }
    }
}

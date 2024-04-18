using Microsoft.EntityFrameworkCore;
using ProjetoFullStack.Context;
using ProjetoFullStack.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoFullStack.Service
{
    public class clienteService : IclienteService
    {
        private readonly Contexto _context;

        public clienteService(Contexto context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Cliente>> GetCliente()
        {
            return await _context.Cliente.ToListAsync().ConfigureAwait(false);
        }

    }
}

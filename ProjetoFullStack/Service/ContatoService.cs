using Microsoft.EntityFrameworkCore;
using ProjetoFullStack.Context;
using ProjetoFullStack.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoFullStack.Service
{
    public class ContatoService : IContatoService
    {
        private readonly Contexto _context;

        public ContatoService(Contexto context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Contato>> Getcontato()
        {
            return await _context.Contato.ToListAsync().ConfigureAwait(false);
        }

        public async Task<IEnumerable<Contato>> ContatosSemVinculos()
        {
            var contatos = await _context.Contato.ToListAsync();
            var ListaContato = contatos.FindAll(x => x.ClienteId <= 0);

            return ListaContato;

            
        }

        public async Task<IEnumerable<Contato>> Getcontato(int idCliente)
        {
            var contatos = await _context.Contato.ToListAsync();
            var ListaContato = contatos.FindAll(x => x.ClienteId == idCliente);

            return ListaContato;
        }
        public async Task<bool> SaveContatos(IEnumerable<Contato> contatos)
        {
            try
            {
                foreach (var item in contatos)
                {
                     _context.Contato.Add(item);
                    await _context.SaveChangesAsync();
                }
                return true;
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }    

            
        }

        public async Task<bool> VincularContatos(int clienteId,IEnumerable<int> contatosId)
        {
            try
            {
                foreach (var item in contatosId)
                {
                    var contato = await _context.Contato.FirstOrDefaultAsync( x => x.Id == item);
                    _context.Entry(contato).State = EntityState.Modified;
                    if (contato != null)
                    {
                        contato.ClienteId = clienteId;
                    }                   

                    await _context.SaveChangesAsync();
                }
                return true;
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }


        }

    }
}

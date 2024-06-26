﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjetoFullStack.Context;
using ProjetoFullStack.Model;
using ProjetoFullStack.Service;

namespace ProjetoFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContatosController : ControllerBase
    {
        private readonly IContatoService _service;
        private readonly Contexto _context;

        public ContatosController(Contexto context, IContatoService service)
        {
            _context = context;
            _service = service;
        }

        // GET: api/Contatos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contato>>> GetContato()
        {
            return await _context.Contato.ToListAsync();
        }

        // GET: api/Contatos
        [HttpGet("ContatosSemVinculos")]
        public async Task<ActionResult<IEnumerable<Contato>>> ContatosSemVinculos() => Ok(
            await _service.ContatosSemVinculos()
            );

        // GET: api/Contatos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Contato>> GetContato(int id)
        {
            var Contato = await _context.Contato.FindAsync(id);

            if (Contato == null)
            {
                return NotFound();
            }

            return Contato;
        }

        // GET: api/Contatos/5
        [HttpGet("ContatoDeClientes/{id}")]
        public async Task<ActionResult<Contato>> GetContatoClientes(int id) => Ok(
           await _service.Getcontato(id)
            );


        // PUT: api/Contatos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContato(int id, [FromBody] Contato Contato)
        {
            if (id != Contato.Id)
            {
                return BadRequest();
            }

            _context.Entry(Contato).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContatoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // PUT: api/Contatos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        
        [HttpPut("VincularCliente/{id}")]
        public async Task<IActionResult> PutContato(int id, [FromBody] IEnumerable<int> contatosId) => Ok(
            await _service.VincularContatos(id, contatosId)
            );



        // POST: api/Contatos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Contato>> PostContato([FromBody] Contato Contato)
        {
            _context.Contato.Add(Contato);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetContato", new { id = Contato.Id }, Contato);
        }

        // POST: api/Contatos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("SaveContatos")]
        public async Task<ActionResult<bool>> PostContato([FromBody] IEnumerable<Contato> contatos) => Ok(
               await _service.SaveContatos(contatos)
            );


        // DELETE: api/Contatos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContato(int id)
        {
            var Contato = await _context.Contato.FindAsync(id);
            if (Contato == null)
            {
                return NotFound();
            }

            _context.Contato.Remove(Contato);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ContatoExists(int id)
        {
            return _context.Contato.Any(e => e.Id == id);
        }
    }
}

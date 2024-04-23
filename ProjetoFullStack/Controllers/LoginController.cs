using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjetoFullStack.Context;
using ProjetoFullStack.Model;
using ProjetoFullStack.Service;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILoginService _service;

        private readonly Contexto _context;

        public LoginController(Contexto contexto, ILoginService service )
        {
            _service = service;
            _context = contexto;
        }
                
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Login>>> GetLogin() =>
            Ok(await _service.GetLogin());
        
        [HttpGet("{id}")]
        public async Task<ActionResult<Login>> GetLogin(int id)
        {
            var Login = await _context.Login.FindAsync(id);

            if (Login == null)
            {
                return NotFound();
            }

            return Login;
        }

        [HttpPost]
        public async Task<ActionResult<Login>> ValidarLogin([FromBody] Login Login) => Ok(
            await _service.ValidarLogin(Login));


        // PUT: api/Login/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLogin(int id, [FromForm] Login Login)
        {
            if (id != Login.Id)
            {
                return BadRequest();
            }

            _context.Entry(Login).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LoginExists(id))
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

        // POST: api/Login
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("Cadastrar")]
        public async Task<ActionResult<Login>> PostLogin([FromBody] Login Login)
        {
            _context.Login.Add(Login);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLogin", new { id = Login.Id }, Login);
        }

        // DELETE: api/Login/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLogin(int id)
        {
            var Login = await _context.Login.FindAsync(id);
            if (Login == null)
            {
                return NotFound();
            }

            _context.Login.Remove(Login);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LoginExists(int id)
        {
            return _context.Login.Any(e => e.Id == id);
        }
    }
}

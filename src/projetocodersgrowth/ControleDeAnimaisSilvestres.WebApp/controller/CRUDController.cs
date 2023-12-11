using ControleDeAnimaisSilvestres.Dominio.Objetos;
using ControleDeAnimaisSilvestres.Infra.Repositorios;
using Microsoft.AspNetCore.Mvc;

namespace ControleDeAnimaisSilvestres.WebApp.controller
{
    [Produces("application/json")]
    [Route("api/animais")]

    public class CRUDController : ControllerBase
    {
        private readonly RepositorioLinqToDb servico;

        [Route("~/api/ObterTodosAnimais")]
        [HttpGet]
        public ActionResult<List<AnimalSilvestre>> ObterTodos()
        {
                var modelo = servico.ObterTodos();

                return Ok(modelo);

        }

        [HttpGet("{id}", Name = "ObterPorId")]
        public ActionResult ObterPorId(int id)
        {
            var modelo = servico.ObterPorId(id);
            if (modelo == null)
            {
                return NotFound();
            }
            return Ok(modelo);
        }

    }
}

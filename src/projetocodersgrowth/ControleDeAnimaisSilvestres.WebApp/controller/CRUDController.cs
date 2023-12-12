using ControleDeAnimaisSilvestres.Dominio.Objetos;
using ControleDeAnimaisSilvestres.Dominio.Validacoes;
using ControleDeAnimaisSilvestres.Infra.Repositorios;
using LinqToDB;
using Microsoft.AspNetCore.Mvc;

namespace ControleDeAnimaisSilvestres.WebApp.controller
{
    [Produces("application/json")]
    [Route("api/animais")]
    [ApiController]
    public class CRUDController : ControllerBase
    {
        private readonly IRepositorio servico;
        private ValidacaoDeAnimalSilvestre _validacao;

        public CRUDController(IRepositorio repositorio, ValidacaoDeAnimalSilvestre validacao)
        {
            servico = repositorio;
            _validacao = validacao;
        }


        [Route("ObterTodosAnimais")]
        [HttpGet]
        public ActionResult<List<AnimalSilvestre>> ObterTodos()
        {
                var modelo = servico.ObterTodos();

                return Ok(modelo);

        }

        [HttpGet("{id}")]
        public ActionResult ObterPorId(int id)
        {
            var modelo = servico.ObterPorId(id);
            if (modelo == null)
            {
                return NotFound();
            }
            return Ok(modelo);
        }

        [HttpPost]
        public ActionResult Criar([FromBody]AnimalSilvestre animalNovo)
        {
            if (animalNovo == null)
            {
                return BadRequest();
            }

            try
            {
                var resultados = _validacao.Validate(animalNovo);
                _validacao.EnvioDeErros(resultados);
                servico.Criar(animalNovo);
                return Created($"animal/{animalNovo.Id}", animalNovo);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("id")]
        public ActionResult Remover(int id)
        {
            servico.Remover(id);

            return NoContent();
        }


        [HttpPut]
        public ActionResult Atualizar([FromBody]AnimalSilvestre animalSelecionado)
        {
            try
            {
                var resultados = _validacao.Validate(animalSelecionado);
                _validacao.EnvioDeErros(resultados);
                servico.Atualizar(animalSelecionado);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

using ControleDeAnimaisSilvestres.Dominio.Objetos;
using ControleDeAnimaisSilvestres.Dominio.Validacoes;
using ControleDeAnimaisSilvestres.Infra.Repositorios;
using LinqToDB;
using Microsoft.AspNetCore.Mvc;

namespace ControleDeAnimaisSilvestres.WebApp.controller
{
    [ApiController]
    [Route("api/animais")]
    public class AnimalSilvestreController : ControllerBase
    {
        private readonly IRepositorio servico;
        private ValidacaoDeAnimalSilvestre _validacao;

        public AnimalSilvestreController(IRepositorio repositorio, ValidacaoDeAnimalSilvestre validacao)
        {
            servico = repositorio;
            _validacao = validacao;
        }

        [HttpGet]
        public ActionResult<List<AnimalSilvestre>> ObterTodos()
        {
            var modelo = servico.ObterTodos();
            try
            {
                return Ok(modelo);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public ActionResult ObterPorId(int id)
        {
            var modelo = servico.ObterPorId(id);

            try
            {
                return Ok(modelo);
            }
            catch (Exception ex)
            {
               return NotFound(ex.Message);
            }
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
            try
            {
            servico.Remover(id);
            return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
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

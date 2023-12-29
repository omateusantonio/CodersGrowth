using ControleDeAnimaisSilvestres.Dominio.Objetos;
using ControleDeAnimaisSilvestres.Dominio.Validacoes;
using ControleDeAnimaisSilvestres.Infra.Repositorios;
using Microsoft.AspNetCore.Mvc;

namespace ControleDeAnimaisSilvestres.WebApp.controller
{
    [ApiController]
    [Route("api/[controller]")]
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
            try
            {
                var modelo = servico.ObterTodos();
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
            try
            {
                var modelo = servico.ObterPorId(id);
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
                var idCriada = servico.Criar(animalNovo);
                animalNovo.Id = idCriada;
                return Created($"{animalNovo.Id}", animalNovo);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public ActionResult Remover(int id)
        {
            try
            {
                if(!(servico.ObterPorId(id) == null))
                {
                   servico.Remover(id);
                   return NoContent();
                } else
                {
                    return NotFound("O animal selecionado não existe no registro");
                }
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

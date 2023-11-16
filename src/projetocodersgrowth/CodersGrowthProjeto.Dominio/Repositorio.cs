using CodersGrowthProjeto.Dominio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControleDeAnimaisSilvestres.Dominio
{
    public class Repositorio : IRepositorio
    {
        protected ListaSingleton listaAnimais = ListaSingleton.Instancia();

        public List<AnimalSilvestre> ObterTodos()
        {
            return listaAnimais.TrazerAnimais();
        }

        public void Criar(AnimalSilvestre novoAnimal)
        {
            listaAnimais.InserirNovoAnimal(novoAnimal);
        }

        public AnimalSilvestre ObterPorId(int id)
        {
            var animalSelecionado = (listaAnimais.TrazerAnimais()).FirstOrDefault(x => x.Id.Equals(id));

            return animalSelecionado;
        }

        public void Remover(int id)
        {
            var animalASerRemovido = ObterPorId(id);
            listaAnimais.RemoverAnimal(animalASerRemovido);
        }

        public void Atualizar (AnimalSilvestre animalAtualizado)
        {
            var animalASerAtualizado = ObterPorId(animalAtualizado.Id);

            if (animalASerAtualizado != null)
            {
                animalASerAtualizado.NomeDoAnimal = animalAtualizado.NomeDoAnimal;
                animalASerAtualizado.NomeDaEspecie = animalAtualizado.NomeDaEspecie;
                animalASerAtualizado.DataDoResgate = animalAtualizado.DataDoResgate;
                animalASerAtualizado.Classe = animalAtualizado.Classe;
                animalASerAtualizado.CustoDeVacinacao = animalAtualizado.CustoDeVacinacao;
                animalASerAtualizado.EmExtincao = animalAtualizado.EmExtincao;
            }
        }
    }
}

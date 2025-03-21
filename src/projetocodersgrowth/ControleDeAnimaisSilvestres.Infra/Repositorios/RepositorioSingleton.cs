﻿using ControleDeAnimaisSilvestres.Dominio.Objetos;

namespace ControleDeAnimaisSilvestres.Infra.Repositorios

{
    public class RepositorioSingleton : IRepositorio
    {
        protected ListaSingleton listaAnimais = ListaSingleton.Instancia();

        public List<AnimalSilvestre> ObterTodos()
        {
            return listaAnimais.ObterTodos();
        }

        public List<AnimalSilvestre> ObterTodosComFiltro(string animal)
        {
            var listaFiltrada = listaAnimais.ObterTodos().FindAll(x => x.NomeDoAnimal.Contains(animal));
            return listaFiltrada;
        }

        public int Criar(AnimalSilvestre novoAnimal)
        {
            listaAnimais.Inserir(novoAnimal);
            return novoAnimal.Id;
        }

        public AnimalSilvestre ObterPorId(int id)
        {
            var animalSelecionado = listaAnimais.ObterTodos().FirstOrDefault(x => x.Id.Equals(id));

            return animalSelecionado;
        }

        public void Remover(int id)
        {
            var animalASerRemovido = ObterPorId(id);
            listaAnimais.Remover(animalASerRemovido);
        }

        public void Atualizar(AnimalSilvestre animalAtualizado)
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

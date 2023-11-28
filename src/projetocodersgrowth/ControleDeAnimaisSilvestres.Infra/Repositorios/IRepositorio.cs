using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ControleDeAnimaisSilvestres;

namespace ControleDeAnimaisSilvestres.Infra.Repositorios
{
    public interface IRepositorio
    {
        public List<AnimalSilvestre> ObterTodos();
        public void Criar(AnimalSilvestre animalNovo);
        public void Remover(int id);
        public AnimalSilvestre ObterPorId(int id);
        public void Atualizar(AnimalSilvestre animalSelecionado);
    }
}

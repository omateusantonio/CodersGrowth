using ControleDeAnimaisSilvestres.Dominio.Objetos;

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

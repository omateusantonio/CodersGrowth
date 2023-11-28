using ControleDeAnimaisSilvestres.Dominio.Objetos;
using LinqToDB;
using LinqToDB.Data;
using LinqToDB.Common;
using System.Configuration;

namespace ControleDeAnimaisSilvestres.Infra.Repositorios
{
    public class RepositorioLinqToDb : IRepositorio
    {
        private static string stringDeConexao = ConfigurationManager.ConnectionStrings["BancoDeDados"].ConnectionString;

        public List<AnimalSilvestre> ObterTodos()
        {
            using var bancoDeDados = new AcessoBancoDeDados();

            var query = from p in 
        }
        public void Criar(AnimalSilvestre animalNovo)
        {

        }
        public void Remover(int id)
        {

        }
        public AnimalSilvestre ObterPorId(int id)
        {

        }
        public void Atualizar(AnimalSilvestre animalSelecionado)
        {

        }
    }
}

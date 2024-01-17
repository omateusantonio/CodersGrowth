using ControleDeAnimaisSilvestres.Dominio.Objetos;
using LinqToDB;
using System.Configuration;

namespace ControleDeAnimaisSilvestres.Infra.Repositorios
{
    public class RepositorioLinqToDb : IRepositorio
    {
        private static string stringDeConexao = ConfigurationManager.ConnectionStrings["BancoDeDados"].ConnectionString;

        public List<AnimalSilvestre> ObterTodos()
        {
            using (var bancoDeDados = ObterConexao())
            {
                var consulta = from colunas in bancoDeDados.GetTable<AnimalSilvestre>()
                               select colunas;
                return consulta.ToList();
            }
        }

        public List<AnimalSilvestre> ObterTodosComFiltro(string animal)
        {
            using (var bancoDeDados = ObterConexao())
            {
                var consulta = (from colunas in bancoDeDados.GetTable<AnimalSilvestre>()
                                where colunas.NomeDoAnimal.StartsWith(animal)
                                select colunas).ToList();
                return consulta.ToList();
            }
        }

        public int Criar(AnimalSilvestre animalNovo)
        {
            using (var bancoDeDados = ObterConexao())
            {
                var idCriada = bancoDeDados.InsertWithInt32Identity(animalNovo);
                return idCriada;
            }
        }

        public void Remover(int id)
        {
            using (var bancoDeDados = ObterConexao())
            {
                bancoDeDados
                .GetTable<AnimalSilvestre>()
                .Where(colunas => colunas.Id == id)
                .Delete();
            }
        }

        public AnimalSilvestre ObterPorId(int id)
        {
            using (var bancoDeDados = ObterConexao())
            {
                var consulta = (from colunas in bancoDeDados.GetTable<AnimalSilvestre>()
                           where colunas.Id == id
                           select colunas).ToList();
            return consulta.FirstOrDefault(x => x.Id.Equals(id));
            }
        }

        public void Atualizar(AnimalSilvestre animalSelecionado)
        {
            using (var bancoDeDados = ObterConexao())
            {
                new DataOptions()
                .UseSqlServer(stringDeConexao);
            bancoDeDados.Update(animalSelecionado);              
            }
        }

        private DataContext ObterConexao ()
        {
            var conexao = new DataContext(
                new DataOptions()
                .UseSqlServer(stringDeConexao));
            return conexao;
        }
    }
}

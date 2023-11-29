using ControleDeAnimaisSilvestres.Dominio.Objetos;
using LinqToDB;
using LinqToDB.Data;
using LinqToDB.Common;
using System.Configuration;
using System.Net.Http.Headers;
using LinqToDB.DataProvider.MySql;
using System.Security.Cryptography;

namespace ControleDeAnimaisSilvestres.Infra.Repositorios
{
    public class RepositorioLinqToDb : IRepositorio
    {
        private static string stringDeConexao = ConfigurationManager.ConnectionStrings["BancoDeDados"].ConnectionString;

        public List<AnimalSilvestre> ObterTodos()
        {
            using (var bancoDeDados = AbreConexaoComBancoDeDados())
            {
                var consulta = from colunas in bancoDeDados.GetTable<AnimalSilvestre>()
                               select colunas;
                return consulta.ToList();
            }
        }

        public void Criar(AnimalSilvestre animalNovo)
        {
            using (var bancoDeDados = AbreConexaoComBancoDeDados())
            {
                bancoDeDados.Insert(animalNovo);
            }
        }

        public void Remover(int id)
        {
            using (var bancoDeDados = AbreConexaoComBancoDeDados())
            {
                bancoDeDados
                .GetTable<AnimalSilvestre>()
                .Where(colunas => colunas.Id == id)
                .Delete();
            }
        }

        public AnimalSilvestre ObterPorId(int id)
        {
            using (var bancoDeDados = AbreConexaoComBancoDeDados())
            {
                var consulta = (from colunas in bancoDeDados.GetTable<AnimalSilvestre>()
                           where colunas.Id == id
                           select colunas).ToList();
            return consulta.FirstOrDefault(x => x.Id.Equals(id));
            }
        }

        public void Atualizar(AnimalSilvestre animalSelecionado)
        {
            using (var bancoDeDados = AbreConexaoComBancoDeDados())
            {
                new DataOptions()
                .UseSqlServer(stringDeConexao);
            bancoDeDados.Update(animalSelecionado);              
            }
        }

        private DataContext AbreConexaoComBancoDeDados ()
        {
            var conexao = new DataContext(
                new DataOptions()
                .UseSqlServer(stringDeConexao));
            return conexao;
        }
    }
}

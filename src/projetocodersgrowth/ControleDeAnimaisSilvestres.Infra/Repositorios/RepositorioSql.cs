using System.Configuration;
using Microsoft.Data.SqlClient;
using ControleDeAnimaisSilvestres.Dominio.Objetos;

namespace ControleDeAnimaisSilvestres.Infra.Repositorios
{
    public class RepositorioSql : IRepositorio
    {
        private static string stringDeConexao = ConfigurationManager.ConnectionStrings["BancoDeDados"].ConnectionString;
        public List<AnimalSilvestre> ObterTodos()
        {
            const string textoDeComando = "SELECT * from AnimalSilvestre";
            var listaCompleta = new List<AnimalSilvestre>();
            using (SqlConnection conexaoSql = new SqlConnection(stringDeConexao))
            {
                conexaoSql.Open();
                SqlCommand comandoSql = new SqlCommand(textoDeComando, conexaoSql);
                var reader = comandoSql.ExecuteReader();

                while (reader.Read())
                {
                    var animal = new AnimalSilvestre();
                    animal.Id = Convert.ToInt32(reader["Id"]);
                    animal.NomeDoAnimal = reader["NomeDoAnimal"].ToString();
                    animal.NomeDaEspecie = reader["NomeDaEspecie"].ToString();
                    animal.Classe = (AnimalSilvestre.ClasseDeAnimal)Enum.Parse(typeof(AnimalSilvestre.ClasseDeAnimal), reader["ClasseDeAnimal"].ToString());
                    animal.DataDoResgate = Convert.ToDateTime(reader["DataDoResgate"]);
                    animal.EmExtincao = (bool)reader["EmExtincao"];
                    animal.CustoDeVacinacao = (decimal)reader["CustoDeVacinacao"];
                    listaCompleta.Add(animal);
                }
                return listaCompleta;
            }
        }

        public void Criar(AnimalSilvestre animalNovo)
        {
            const string textoDeComando = "INSERT INTO AnimalSilvestre (NomeDoAnimal, NomeDaEspecie, ClasseDeAnimal, DataDoResgate, EmExtincao, CustoDeVacinacao) VALUES (@NomeDoAnimal, @NomeDaEspecie, @ClasseDeAnimal, @DataDoResgate, @EmExtincao, @CustoDeVacinacao)";
            using (SqlConnection conexaoSql = new SqlConnection(stringDeConexao))
            {
                conexaoSql.Open();
                SqlCommand comandoSql = new SqlCommand(textoDeComando, conexaoSql);
                comandoSql.Parameters.AddWithValue("@NomeDoAnimal", animalNovo.NomeDoAnimal);
                comandoSql.Parameters.AddWithValue("@NomeDaEspecie", animalNovo.NomeDaEspecie);
                comandoSql.Parameters.AddWithValue("@ClasseDeAnimal", animalNovo.Classe);
                comandoSql.Parameters.AddWithValue("@DataDoResgate", animalNovo.DataDoResgate);
                comandoSql.Parameters.AddWithValue("@EmExtincao", animalNovo.EmExtincao);
                comandoSql.Parameters.AddWithValue("@CustoDeVacinacao", animalNovo.CustoDeVacinacao);
                comandoSql.ExecuteNonQuery();
            }
        }

        public void Remover(int idSelecionada)
        {
            const string textoDeComando = "DELETE FROM AnimalSilvestre WHERE Id=@Id";
            using (SqlConnection conexaoSql = new SqlConnection(stringDeConexao))
            {
                conexaoSql.Open();
                SqlCommand comandoSql = new SqlCommand(textoDeComando, conexaoSql);
                comandoSql.Parameters.AddWithValue("@Id", idSelecionada);
                comandoSql.ExecuteNonQuery();
            }
        }

        public AnimalSilvestre ObterPorId(int idSelecionada)
        {
            const string textoDeComando = "SELECT * FROM AnimalSilvestre WHERE Id=@Id";
            var animalSelecionado = new AnimalSilvestre();
            using (SqlConnection conexaoSql = new SqlConnection(stringDeConexao))
            {
                conexaoSql.Open();
                SqlCommand comandoSql = new SqlCommand(textoDeComando, conexaoSql);
                comandoSql.Parameters.AddWithValue("@Id", idSelecionada);
                var reader = comandoSql.ExecuteReader();
                while (reader.Read())
                {
                    animalSelecionado.Id = Convert.ToInt32(reader["Id"]);
                    animalSelecionado.NomeDoAnimal = reader["NomeDoAnimal"].ToString();
                    animalSelecionado.NomeDaEspecie = reader["NomeDaEspecie"].ToString();
                    animalSelecionado.Classe = (AnimalSilvestre.ClasseDeAnimal)Enum.Parse(typeof(AnimalSilvestre.ClasseDeAnimal), reader["ClasseDeAnimal"].ToString());
                    animalSelecionado.DataDoResgate = (DateTime)reader["DataDoResgate"];
                    animalSelecionado.EmExtincao = (bool)reader["EmExtincao"];
                    animalSelecionado.CustoDeVacinacao = (decimal)reader["CustoDeVacinacao"];
                }
            }
            return animalSelecionado;
        }

        public void Atualizar(AnimalSilvestre animalAtualizado)
        {
            const string textoDeComando = "UPDATE AnimalSilvestre SET NomeDoAnimal=@NomeDoAnimal, NomeDaEspecie=@NomeDaEspecie, ClasseDeAnimal=@ClasseDeAnimal, DataDoResgate=@DataDoResgate, EmExtincao=@EmExtincao, CustoDeVacinacao=@CustoDeVacinacao WHERE Id=@Id";
            using (SqlConnection conexaoSql = new SqlConnection(stringDeConexao))
            {
                conexaoSql.Open();
                SqlCommand comandoSql = new SqlCommand(textoDeComando, conexaoSql);
                comandoSql.Parameters.AddWithValue("@Id", animalAtualizado.Id);
                comandoSql.Parameters.AddWithValue("@NomeDoAnimal", animalAtualizado.NomeDoAnimal);
                comandoSql.Parameters.AddWithValue("@NomeDaEspecie", animalAtualizado.NomeDaEspecie);
                comandoSql.Parameters.AddWithValue("@ClasseDeAnimal", animalAtualizado.Classe);
                comandoSql.Parameters.AddWithValue("@DataDoResgate", animalAtualizado.DataDoResgate);
                comandoSql.Parameters.AddWithValue("@EmExtincao", animalAtualizado.EmExtincao);
                comandoSql.Parameters.AddWithValue("@CustoDeVacinacao", animalAtualizado.CustoDeVacinacao);
                comandoSql.ExecuteNonQuery();
            }
        }
    }
}

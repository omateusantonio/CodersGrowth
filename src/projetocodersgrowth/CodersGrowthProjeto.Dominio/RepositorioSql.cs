using CodersGrowthProjeto.Dominio;
using System;
using System.Configuration;
using System.Configuration.Assemblies;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Data;
using Microsoft.Data.SqlClient;

namespace ControleDeAnimaisSilvestres.Dominio
{
    
    public class RepositorioSql : IRepositorio
    {
        private static string connectionString = ConfigurationManager.ConnectionStrings["BancoDeDados"].ConnectionString;
        //private static SqlConnection sqlConn = new SqlConnection(connectionString);
        public List<AnimalSilvestre> ObterTodos()
        {
            string commandText = "SELECT * from AnimalSilvestre";
            var listaCompleta = new List<AnimalSilvestre>();
            using (SqlConnection sqlConn = new SqlConnection(connectionString))
            {
                sqlConn.Open();
                SqlCommand command = new SqlCommand(commandText, sqlConn);
                var reader = command.ExecuteReader();

                while(reader.Read())
                {
                    var animal = new AnimalSilvestre();
                    animal.Id = Convert.ToInt32(reader["Id"]);
                    animal.NomeDoAnimal = reader["NomeDoAnimal"].ToString();
                    animal.NomeDaEspecie = reader["NomeDaEspecie"].ToString();
                    animal.Classe = (AnimalSilvestre.ClasseDeAnimal)System.Enum.Parse(typeof(AnimalSilvestre.ClasseDeAnimal), reader["ClasseDeAnimal"].ToString());
                    animal.DataDoResgate = Convert.ToDateTime(reader["DataDoResgate"]);
                    animal.EmExtincao = (bool)reader["EmExtincao"];
                    animal.CustoDeVacinacao = ((decimal)reader["CustoDeVacinacao"])/100;

                    listaCompleta.Add(animal);
                }

                return listaCompleta;
            }
        }

        public void Criar(AnimalSilvestre animalNovo)
        {
            string commandText = "INSERT INTO AnimalSilvestre (NomeDoAnimal, NomeDaEspecie, ClasseDeAnimal, DataDoResgate, EmExtincao, CustoDeVacinacao) VALUES (@NomeDoAnimal, @NomeDaEspecie, @ClasseDeAnimal, @DataDoResgate, @EmExtincao, @CustoDeVacinacao)";
            using (SqlConnection sqlConn = new SqlConnection(connectionString))
            {
                sqlConn.Open();
                SqlCommand command = new SqlCommand(commandText, sqlConn);
                command.Parameters.AddWithValue("@NomeDoAnimal", animalNovo.NomeDoAnimal);
                command.Parameters.AddWithValue("@NomeDaEspecie", animalNovo.NomeDaEspecie);
                command.Parameters.AddWithValue("@ClasseDeAnimal", animalNovo.Classe);
                command.Parameters.AddWithValue("@DataDoResgate", animalNovo.DataDoResgate);
                command.Parameters.AddWithValue("@EmExtincao", animalNovo.EmExtincao);
                command.Parameters.AddWithValue("@CustoDeVacinacao", animalNovo.CustoDeVacinacao);
                command.ExecuteNonQuery();
            }
        }

        public void Remover(int id)
        {
            var idSelecionada = id;
            var commandText = "DELETE FROM AnimalSilvestre WHERE Id='" + idSelecionada + "'";

            using (SqlConnection sqlConn = new SqlConnection(connectionString))
            {
                sqlConn.Open();
                SqlCommand command = new SqlCommand(commandText, sqlConn);
                command.ExecuteNonQuery();
            }
        }

        public AnimalSilvestre ObterPorId(int id)
        {
            var idSelecionada = id;
            var commandText = "SELECT * FROM AnimalSilvestre WHERE Id='" + idSelecionada + "'";
            var animalSelecionado = new AnimalSilvestre();

            using (SqlConnection sqlConn = new SqlConnection(connectionString))
            {
                sqlConn.Open();
                SqlCommand command = new SqlCommand(commandText, sqlConn);
                var reader = command.ExecuteReader();

                while (reader.Read())
                {
                    animalSelecionado.Id = Convert.ToInt32(reader["Id"]);
                    animalSelecionado.NomeDoAnimal = reader["NomeDoAnimal"].ToString();
                    animalSelecionado.NomeDaEspecie = reader["NomeDaEspecie"].ToString();
                    animalSelecionado.Classe = (AnimalSilvestre.ClasseDeAnimal)System.Enum.Parse(typeof(AnimalSilvestre.ClasseDeAnimal), reader["ClasseDeAnimal"].ToString());
                    animalSelecionado.DataDoResgate = (DateTime)reader["DataDoResgate"];
                    animalSelecionado.EmExtincao = (bool)reader["EmExtincao"];
                    animalSelecionado.CustoDeVacinacao = (decimal)reader["CustoDeVacinacao"];
                }
            }
            return animalSelecionado;
        }

        public void Atualizar(AnimalSilvestre animalAtualizado)
        {
            var idSelecionada = animalAtualizado.Id;
            string commandText = $"UPDATE AnimalSilvestre SET NomeDoAnimal='{animalAtualizado.NomeDoAnimal}', " +
                $"NomeDaEspecie='{animalAtualizado.NomeDaEspecie}', " +
                $"ClasseDeAnimal='{animalAtualizado.Classe.ToString()}', " +
                $"DataDoResgate='{animalAtualizado.DataDoResgate}', " +
                $"EmExtincao='{animalAtualizado.EmExtincao}', " +
                $"CustoDeVacinacao='{animalAtualizado.CustoDeVacinacao}' WHERE Id='{idSelecionada}'";

            using(SqlConnection sqlConn = new SqlConnection(connectionString))
            {
                sqlConn.Open();
                SqlCommand command = new SqlCommand(commandText, sqlConn);
                command.ExecuteNonQuery();
            }
        }
    }
}

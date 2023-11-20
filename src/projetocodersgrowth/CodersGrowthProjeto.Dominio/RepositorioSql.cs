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
        private static SqlConnection sqlConn = new SqlConnection(connectionString);
        public List<AnimalSilvestre> ObterTodos()
        {
            sqlConn.Open();
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

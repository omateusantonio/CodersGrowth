using ControleDeAnimaisSilvestres.Dominio.Objetos;
using LinqToDB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControleDeAnimaisSilvestres.Infra.Repositorios
{
    public class AcessoBancoDeDados : LinqToDB.Data.DataConnection
    {
        public AcessoBancoDeDados() : base("BancoListaDeAnimais") { }

        public ITable<AnimalSilvestre> ListaDeAnimaisBancoDeDados => this.GetTable<AnimalSilvestre>();
    }
}

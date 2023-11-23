using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CodersGrowthProjeto.Dominio;
using FluentMigrator;

namespace ControleDeAnimaisSilvestres.Dominio
{
    [Migration(20231122102000)]
    public class CriaTabelaAnimaisSilvestres : Migration
    {
        private const int maximoDigitosInteiro = 10;
        private const int maximoCasasDecimais = 2;

        public override void Up()
        {
            Create.Table("AnimalSilvestre")
                .WithColumn("Id").AsInt32().PrimaryKey().Identity()
                .WithColumn("NomeDoAnimal").AsString().NotNullable()
                .WithColumn("NomeDaEspecie").AsString().NotNullable()
                .WithColumn("ClasseDeAnimal").AsString().NotNullable()
                .WithColumn("DataDoResgate").AsDate().NotNullable()
                .WithColumn("EmExtincao").AsBoolean()
                .WithColumn("CustoDeVacinacao").AsDecimal(maximoDigitosInteiro, maximoCasasDecimais).NotNullable();
        }

        public override void Down()
        {
            Delete.Table("AnimalSilvestre");
        }
    }
}

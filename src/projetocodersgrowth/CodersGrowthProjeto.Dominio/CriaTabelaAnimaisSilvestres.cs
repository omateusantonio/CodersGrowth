using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CodersGrowthProjeto.Dominio;
using FluentMigrator;

namespace ControleDeAnimaisSilvestres.Dominio
{
    [Migration(20231117111300)]
    public class CriaTabelaAnimaisSilvestres : Migration
    {
        public override void Up()
        {
            Create.Table("AnimalSilvestre")
                .WithColumn("Id").AsInt32().PrimaryKey().Identity()
                .WithColumn("NomeDoAnimal").AsString().NotNullable()
                .WithColumn("NomeDaEspecie").AsString().NotNullable()
                .WithColumn("ClasseDeAnimal").AsString().NotNullable()
                .WithColumn("DataDoResgate").AsDate().NotNullable()
                .WithColumn("EmExtincao").AsBoolean()
                .WithColumn("CustoDeVacinacao").AsCurrency().NotNullable();
        }

        public override void Down()
        {
            Delete.Table("AnimalSilvestre");
        }
    }
}

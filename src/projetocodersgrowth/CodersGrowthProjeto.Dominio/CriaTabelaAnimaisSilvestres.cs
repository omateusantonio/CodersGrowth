using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CodersGrowthProjeto.Dominio;
using FluentMigrator;

namespace ControleDeAnimaisSilvestres.Dominio
{
    [Migration(20231117111300)] //cada migração é pra uma determinada atualização do banco de dados?
    public class CriaTabelaAnimaisSilvestres : Migration
    {
        public override void Up()
        {
            Create.Table("AnimalSilvestre")
                .WithColumn("Id").AsInt64().PrimaryKey().Identity()
                .WithColumn("NomeDoAnimal").AsString()
                .WithColumn("NomeDaEspecie").AsString()
                .WithColumn("ClasseDeAnimal").AsString()
                .WithColumn("DataDoResgate").AsDate()
                .WithColumn("EmExtincao").AsBoolean()
                .WithColumn("CustoDeVacinacao").AsCurrency();
        }

        public override void Down()
        {
            Delete.Table("AnimalSilvestre");
        }
    }
}

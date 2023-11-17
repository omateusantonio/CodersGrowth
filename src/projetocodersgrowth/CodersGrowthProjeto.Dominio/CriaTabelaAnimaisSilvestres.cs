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
            Create.Table("Controle de Animais Silvestres Resgatados")
                .WithColumn("Id").AsInt64().PrimaryKey().Identity()
                .WithColumn("Nome do Animal").AsString()
                .WithColumn("Nome da Especie").AsString()
                .WithColumn("Classe de Animal").AsString()
                .WithColumn("Data do Resgate").AsDate()
                .WithColumn("Esta em Extincao").AsBoolean()
                .WithColumn("Custo da Vacinacao").AsCurrency();
        }

        public override void Down()
        {
            Delete.Table("Controle de Animais Silvestres Resgatados");
        }
    }
}

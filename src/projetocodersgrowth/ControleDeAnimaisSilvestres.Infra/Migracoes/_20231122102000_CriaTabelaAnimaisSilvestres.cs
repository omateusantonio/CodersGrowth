using FluentMigrator;

namespace ControleDeAnimaisSilvestres.Infra.Migracoes
{
    [Migration(20231122102000)]
    public class _20231122102000_CriaTabelaAnimaisSilvestres : Migration
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

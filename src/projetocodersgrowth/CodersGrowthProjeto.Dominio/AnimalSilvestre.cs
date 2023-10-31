namespace CodersGrowthProjeto.Dominio
{
    public class AnimalSilvestre
    {
        string NomeDoAnimal { get; set; }

        string NomeDaEspecie {  get; set; }

        int IdDoAnimal { get; set; }

        DateTime DataDoResgate {  get; set; }

       enum ClasseDeAnimal
        {
            Anfibio,
            Ave,
            Mamifero,
            Peixe,
            Reptil
        }

        bool AnimalEmExtincao {  get; set; }

        decimal CustoDeVacinacao {  get; set; }

    }
}
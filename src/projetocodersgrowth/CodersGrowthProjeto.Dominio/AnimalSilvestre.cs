namespace CodersGrowthProjeto.Dominio
{
    public class AnimalSilvestre
    {
        public string NomeDoAnimal { get; set; }

        public string NomeDaEspecie {  get; set; }

        public int Id { get; set; }

        public DateTime DataDoResgate {  get; set; }

        public ClasseDeAnimal Classe {  get; set; }
        public enum ClasseDeAnimal
        {
            Anfibio,
            Ave,
            Mamifero,
            Peixe,
            Reptil
        }

        public bool EmExtincao {  get; set; }

        public decimal CustoDeVacinacao {  get; set; }

    }
}
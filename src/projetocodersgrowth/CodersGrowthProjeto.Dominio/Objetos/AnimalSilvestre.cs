using LinqToDB.Mapping;
using System.ComponentModel.DataAnnotations;

namespace ControleDeAnimaisSilvestres.Dominio.Objetos
{
    public class AnimalSilvestre
    {
        [PrimaryKey, Identity]
        public int Id { get; set; }

        [NotNull]
        public string NomeDoAnimal { get; set; }

        [NotNull]
        public string NomeDaEspecie { get; set; }

        [NotNull]
        public DateTime DataDoResgate { get; set; }

        [Column("ClasseDeAnimal"), NotNull]
        public ClasseDeAnimal Classe { get; set; }
        
        public enum ClasseDeAnimal
        {
            Anfibio,
            Ave,
            Mamifero,
            Peixe,
            Reptil
        }

        [Nullable]
        public bool EmExtincao { get; set; }

        [NotNull]
        public decimal CustoDeVacinacao { get; set; }

        
        public AnimalSilvestre Copiar()
        {
            return (AnimalSilvestre)MemberwiseClone();
        }

    }
}
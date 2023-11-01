using CodersGrowthProjeto.Dominio;

namespace projetocodersgrowth
{
    public partial class Form1 : Form
    {

        public Form1()
        {
            InitializeComponent();

            List<AnimalSilvestre> animalSilvestre = new List<AnimalSilvestre>();

            animalSilvestre.Add(new AnimalSilvestre
            {
                NomeDoAnimal = "José",
                NomeDaEspecie = "Canis lupus",
                Id = 000,
                DataDoResgate = DateTime.Parse("21/02/2023"),
                Classe = AnimalSilvestre.ClasseDeAnimal.Mamifero,
                EmExtincao = false,
                CustoDeVacinacao = 25

            });

            DataGridView.DataSource = animalSilvestre;

            animalSilvestre.Add(new AnimalSilvestre
            {
                NomeDoAnimal = "Carlos",
                NomeDaEspecie = "Felis catus",
                Id = 001,
                DataDoResgate = DateTime.Parse("24/02/2023"),
                Classe = AnimalSilvestre.ClasseDeAnimal.Mamifero,
                EmExtincao = false,
                CustoDeVacinacao = 60

            });

            DataGridView.DataSource = animalSilvestre;
        }

        private void BotaoAdicionar_Click(object sender, EventArgs e)
        {
            
        }

    }
}

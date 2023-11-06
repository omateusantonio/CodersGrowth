using CodersGrowthProjeto.Dominio;
using ControleDeAnimaisSilvestres;
using System.Drawing.Text;

namespace projetocodersgrowth
{
    public partial class Form1 : Form
    {

        List<AnimalSilvestre> novoAnimal = new List<AnimalSilvestre>();

        public Form1()
        {
            InitializeComponent();

        }

        private void BotaoAdicionar_Click(object sender, EventArgs e)
        {

            AnimalSilvestre animalSilvestre = new AnimalSilvestre();
            Form2 f2 = new Form2(novoAnimal);
            f2.ShowDialog();

            //novoAnimal.Add(f2.novoAnimal);

            DataGridView.DataSource = null;
            DataGridView.DataSource = f2._novoAnimal;
        }

    }
}

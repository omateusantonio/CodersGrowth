using CodersGrowthProjeto.Dominio;
using ControleDeAnimaisSilvestres;
using System.Drawing.Text;

namespace projetocodersgrowth
{
    public partial class Lista : Form
    {
        List<AnimalSilvestre> listaAnimal = new List<AnimalSilvestre>();

        public Lista()
        {
            InitializeComponent();

        }

        private void BotaoAdicionar_Click(object sender, EventArgs e)
        {

            AnimalSilvestre animalSilvestre = new AnimalSilvestre();
            Cadastro f2 = new Cadastro(animalSilvestre);
            var resultadoDoCadastro = f2.ShowDialog();

            
            if (resultadoDoCadastro == DialogResult.OK)
            {
                listaAnimal.Add(animalSilvestre);
            }
            

            DataGridView.DataSource = null;
            DataGridView.DataSource = listaAnimal;
        }

    }
}

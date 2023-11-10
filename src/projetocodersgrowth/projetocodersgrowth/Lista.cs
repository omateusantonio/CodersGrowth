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
            bool edicaoDeItem = false;
            AnimalSilvestre animalSilvestre = new AnimalSilvestre();
            Cadastro formularioCadastro = new Cadastro(animalSilvestre, edicaoDeItem);
            var resultadoDoCadastro = formularioCadastro.ShowDialog();


            if (resultadoDoCadastro == DialogResult.OK)
            {
                listaAnimal.Add(animalSilvestre);
            }


            DataGridView.DataSource = null;
            DataGridView.DataSource = listaAnimal;
        }

        private void BotaoEditar_Click(object sender, EventArgs e)
        {
            if (DataGridView.SelectedRows.Count > 0)
            {
                bool edicaoDeItem = true;

                AnimalSilvestre animalSelecionado = new AnimalSilvestre();
                int idSelecionada = Convert.ToInt32(DataGridView.CurrentRow.Cells["idDataGridViewTextBoxColumn1"].Value);

                animalSelecionado = listaAnimal.First(x => x.Id.Equals(idSelecionada));

                Cadastro formularioEdicao = new Cadastro(animalSelecionado.Copiar(), edicaoDeItem);
                var resultadoDoCadastro = formularioEdicao.ShowDialog();

                if (resultadoDoCadastro == DialogResult.OK)
                {
                    int posicaoDoAnimal = listaAnimal.FindIndex(x => x.Id.Equals(idSelecionada));
                    listaAnimal[posicaoDoAnimal] = formularioEdicao._animalSelecionado;
                }

                DataGridView.DataSource = null;
                DataGridView.DataSource = listaAnimal;

            }
            else
            {
                MessageBox.Show("Selecione primeiro uma linha para editar");
            }
        }
    }
}

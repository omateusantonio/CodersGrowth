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

                animalSelecionado = listaAnimal.FirstOrDefault(x => x.Id.Equals(idSelecionada)).Copiar();

                Cadastro formularioEdicao = new Cadastro(animalSelecionado.Copiar(), edicaoDeItem);
                var resultadoDoCadastro = formularioEdicao.ShowDialog();
                
                if (resultadoDoCadastro == DialogResult.OK)
                {

                    var animalEditado = listaAnimal.FirstOrDefault(x => x.Id.Equals(idSelecionada));

                    animalEditado.NomeDoAnimal = formularioEdicao._animalSelecionado.NomeDoAnimal;
                    animalEditado.NomeDaEspecie = formularioEdicao._animalSelecionado.NomeDaEspecie;
                    animalEditado.DataDoResgate = formularioEdicao._animalSelecionado.DataDoResgate;
                    animalEditado.Classe = formularioEdicao._animalSelecionado.Classe;
                    animalEditado.EmExtincao = formularioEdicao._animalSelecionado.EmExtincao;
                    animalEditado.CustoDeVacinacao = formularioEdicao._animalSelecionado.CustoDeVacinacao;

                    //animalSelecionado.NomeDoAnimal = formularioEdicao._animalSelecionado.NomeDoAnimal;
                    //animalSelecionado.NomeDaEspecie = formularioEdicao._animalSelecionado.NomeDaEspecie;
                    //animalSelecionado.DataDoResgate = formularioEdicao._animalSelecionado.DataDoResgate;
                    //animalSelecionado.Classe = formularioEdicao._animalSelecionado.Classe;
                    //animalSelecionado.EmExtincao = formularioEdicao._animalSelecionado.EmExtincao;
                    //animalSelecionado.CustoDeVacinacao = formularioEdicao._animalSelecionado.CustoDeVacinacao;

                    //int posicaoDoAnimal = listaAnimal.FindIndex(x => x.Id.Equals(idSelecionada));

                    //listaAnimal[posicaoDoAnimal] = formularioEdicao._animalSelecionado;
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

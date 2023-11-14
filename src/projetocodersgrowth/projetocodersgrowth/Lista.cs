using CodersGrowthProjeto.Dominio;
using ControleDeAnimaisSilvestres;
using ControleDeAnimaisSilvestres.Dominio;
using System.Drawing.Text;

namespace projetocodersgrowth
{
    public partial class Lista : Form
    {
        //List<AnimalSilvestre> listaAnimal = new List<AnimalSilvestre>();
        //ListaSingleton listaAnimais = ListaSingleton.Instancia();
        public ListaSingleton listaAnimais = ListaSingleton.Instancia();

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

                listaAnimais.InserirNovoAnimal(animalSilvestre);
                //listaAnimal.Add(animalSilvestre);
            }


            DataGridView.DataSource = null;
            //DataGridView.DataSource = listaAnimal;
            DataGridView.DataSource = listaAnimais.TrazerAnimais();
        }

        private void BotaoEditar_Click(object sender, EventArgs e)
        {
            if (DataGridView.SelectedRows.Count > 0)
            {
                var listaAnimal = listaAnimais.TrazerAnimais();
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

                }

                DataGridView.DataSource = null;
                DataGridView.DataSource = listaAnimal;

            }
            else
            {
                MessageBox.Show("Selecione primeiro uma linha para editar");
            }
        }

        private void BotaoRemover_Click(object sender, EventArgs e)
        {
            if (DataGridView.SelectedRows.Count > 0)
            {
                var listaAnimal = listaAnimais.TrazerAnimais();
                AnimalSilvestre animalSelecionado = new AnimalSilvestre();
                int idSelecionada = Convert.ToInt32(DataGridView.CurrentRow.Cells["idDataGridViewTextBoxColumn1"].Value);
                MessageBoxButtons botoes = MessageBoxButtons.YesNo;
                animalSelecionado = listaAnimal.FirstOrDefault(x => x.Id.Equals(idSelecionada));
                string nomeDoAnimalSelecionado = animalSelecionado.NomeDoAnimal;

                var resultadoConfirmacao = MessageBox.Show($"Tem certeza de que deseja remover \"{nomeDoAnimalSelecionado}\" da lista?", "Excluir item", botoes, MessageBoxIcon.Warning);

                if (resultadoConfirmacao == DialogResult.Yes)
                {
                    listaAnimal.Remove(animalSelecionado);
                    DataGridView.DataSource = null;
                    DataGridView.DataSource = listaAnimal;

                }

            } else
            {
                MessageBox.Show("Primeiro selecione um item para depois removê-lo");
            }



        }
    }
}

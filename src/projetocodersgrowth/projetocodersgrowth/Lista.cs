using CodersGrowthProjeto.Dominio;
using ControleDeAnimaisSilvestres;
using ControleDeAnimaisSilvestres.Dominio;
using System.Drawing.Text;

namespace projetocodersgrowth
{
    public partial class Lista : Form
    {
        public ListaSingleton listaAnimais = ListaSingleton.Instancia();
        public Repositorio funcoesRepositorio = new Repositorio();

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
                funcoesRepositorio.Criar(animalSilvestre);
            }


            DataGridView.DataSource = null;
            DataGridView.DataSource = funcoesRepositorio.ObterTodos();
        }

        private void BotaoEditar_Click(object sender, EventArgs e)
        {
            if (DataGridView.SelectedRows.Count > 0)
            {
                var listaAnimal = funcoesRepositorio.ObterTodos();
                bool edicaoDeItem = true;

                AnimalSilvestre animalSelecionado = new AnimalSilvestre();
                int idSelecionada = Convert.ToInt32(DataGridView.CurrentRow.Cells["idDataGridViewTextBoxColumn1"].Value);

                animalSelecionado = funcoesRepositorio.ObterPorId(idSelecionada).Copiar();

                Cadastro formularioEdicao = new Cadastro(animalSelecionado.Copiar(), edicaoDeItem);
                var resultadoDoCadastro = formularioEdicao.ShowDialog();

                if (resultadoDoCadastro == DialogResult.OK)
                {
                    var animalAtualizado = formularioEdicao._animalSelecionado;
                    funcoesRepositorio.Atualizar(animalAtualizado);
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
                var listaAnimal = funcoesRepositorio.ObterTodos;
                AnimalSilvestre animalSelecionado = new AnimalSilvestre();
                int idSelecionada = Convert.ToInt32(DataGridView.CurrentRow.Cells["idDataGridViewTextBoxColumn1"].Value);
                MessageBoxButtons botoes = MessageBoxButtons.YesNo;
                animalSelecionado = funcoesRepositorio.ObterPorId(idSelecionada);
                string nomeDoAnimalSelecionado = funcoesRepositorio.ObterPorId(idSelecionada).NomeDoAnimal;

                var resultadoConfirmacao = MessageBox.Show($"Tem certeza de que deseja remover \"{nomeDoAnimalSelecionado}\" da lista?", "Excluir item", botoes, MessageBoxIcon.Warning);

                if (resultadoConfirmacao == DialogResult.Yes)
                {
                    funcoesRepositorio.Remover(idSelecionada);
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

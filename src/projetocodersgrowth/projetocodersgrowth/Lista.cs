using CodersGrowthProjeto.Dominio;
using ControleDeAnimaisSilvestres;
using ControleDeAnimaisSilvestres.Dominio;
using System.Drawing.Text;

namespace projetocodersgrowth
{
    public partial class Lista : Form
    {
        //public Repositorio funcoesRepositorio = new Repositorio();
        public RepositorioSql funcoesRepositorio = new RepositorioSql();

        public Lista()
        {
            InitializeComponent();
            DataGridView.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
            DataGridView.DataSource = null;
            DataGridView.DataSource = funcoesRepositorio.ObterTodos();
            
        }

        private void AoClicarEmAdicionar(object sender, EventArgs e)
        {
            var edicaoDeItem = false;
            var animalSilvestre = new AnimalSilvestre();
            var formularioCadastro = new Cadastro(animalSilvestre, edicaoDeItem);
            var resultadoDoCadastro = formularioCadastro.ShowDialog();


            if (resultadoDoCadastro == DialogResult.OK)
            {
                funcoesRepositorio.Criar(animalSilvestre);
            }


            DataGridView.DataSource = null;
            DataGridView.DataSource = funcoesRepositorio.ObterTodos();
        }

        private void AoClicarEmEditar(object sender, EventArgs e)
        {
            if (DataGridView.SelectedRows.Count > 0)
            {
                var listaAnimal = funcoesRepositorio.ObterTodos();
                var edicaoDeItem = true;

                var animalSelecionado = new AnimalSilvestre();
                var idSelecionada = Convert.ToInt32(DataGridView.CurrentRow.Cells["idDataGridViewTextBoxColumn1"].Value);

                animalSelecionado = funcoesRepositorio.ObterPorId(idSelecionada).Copiar();

                var formularioEdicao = new Cadastro(animalSelecionado.Copiar(), edicaoDeItem);
                var resultadoDoCadastro = formularioEdicao.ShowDialog();

                if (resultadoDoCadastro == DialogResult.OK)
                {
                    var animalAtualizado = formularioEdicao._animalSelecionado;
                    funcoesRepositorio.Atualizar(animalAtualizado);
                }

                DataGridView.DataSource = null;
                var animateste = funcoesRepositorio.ObterTodos();
                DataGridView.DataSource = funcoesRepositorio.ObterTodos();

            }
            else
            {
                MessageBox.Show("Selecione primeiro uma linha para editar");
            }
        }

        private void AoClicarEmRemover(object sender, EventArgs e)
        {
            if (DataGridView.SelectedRows.Count > 0)
            {
                var idSelecionada = Convert.ToInt32(DataGridView.CurrentRow.Cells["idDataGridViewTextBoxColumn1"].Value);
                var botoes = MessageBoxButtons.YesNo;
                var nomeDoAnimalSelecionado = funcoesRepositorio.ObterPorId(idSelecionada).NomeDoAnimal;

                var resultadoConfirmacao = MessageBox.Show($"Tem certeza de que deseja remover \"{nomeDoAnimalSelecionado}\" da lista?", "Excluir item", botoes, MessageBoxIcon.Warning);

                if (resultadoConfirmacao == DialogResult.Yes)
                {
                    funcoesRepositorio.Remover(idSelecionada);
                    DataGridView.DataSource = null;
                    DataGridView.DataSource = funcoesRepositorio.ObterTodos();
                }

            } else
            {
                MessageBox.Show("Primeiro selecione um item para depois removê-lo");
            }

        }
    }
}

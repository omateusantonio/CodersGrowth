using ControleDeAnimaisSilvestres;
using ControleDeAnimaisSilvestres.Dominio.Objetos;
using ControleDeAnimaisSilvestres.Dominio.Validacoes;
using ControleDeAnimaisSilvestres.Infra.Repositorios;

namespace projetocodersgrowth
{
    public partial class Lista : Form
    {
        private readonly IRepositorio repositorio;
        private ValidacaoDeAnimalSilvestre validacao;

        public Lista(IRepositorio repositorio, ValidacaoDeAnimalSilvestre validacao)
        {
            this.repositorio = repositorio;
            this.validacao = validacao;
            InitializeComponent();
            DataGridView.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
            DataGridView.DataSource = null;
            DataGridView.DataSource = repositorio.ObterTodos();
        }

        private void AoClicarEmAdicionar(object sender, EventArgs e)
        {
            var edicaoDeItem = false;
            var animalSilvestre = new AnimalSilvestre();
            var formularioCadastro = new Cadastro(animalSilvestre, edicaoDeItem, validacao);
            var resultadoDoCadastro = formularioCadastro.ShowDialog();

            if (resultadoDoCadastro == DialogResult.OK)
            {
                repositorio.Criar(animalSilvestre);
            }

            DataGridView.DataSource = null;
            DataGridView.DataSource = repositorio.ObterTodos();
        }

        private void AoClicarEmEditar(object sender, EventArgs e)
        {
            if (DataGridView.SelectedRows.Count > 0)
            {
                var edicaoDeItem = true;
                var idSelecionada = Convert.ToInt32(DataGridView.CurrentRow.Cells["idDataGridViewTextBoxColumn1"].Value);
                var animalSelecionado = repositorio.ObterPorId(idSelecionada).Copiar();
                var formularioEdicao = new Cadastro(animalSelecionado.Copiar(), edicaoDeItem, validacao);
                var resultadoDoCadastro = formularioEdicao.ShowDialog();
                
                if (resultadoDoCadastro == DialogResult.OK)
                {
                    var animalAtualizado = formularioEdicao._animal;
                    repositorio.Atualizar(animalAtualizado);
                }

                DataGridView.DataSource = null;
                DataGridView.DataSource = repositorio.ObterTodos();
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
                var nomeDoAnimalSelecionado = repositorio.ObterPorId(idSelecionada).NomeDoAnimal;
                var resultadoConfirmacao = MessageBox.Show($"Tem certeza de que deseja remover \"{nomeDoAnimalSelecionado}\" da lista?", "Excluir item", botoes, MessageBoxIcon.Warning);
                
                if (resultadoConfirmacao == DialogResult.Yes)
                {
                    repositorio.Remover(idSelecionada);
                    DataGridView.DataSource = null;
                    DataGridView.DataSource = repositorio.ObterTodos();
                }

            } else
            {
                MessageBox.Show("Primeiro selecione um item para depois removê-lo");
            }

        }
    }
}

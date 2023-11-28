using ControleDeAnimaisSilvestres.Dominio.Objetos;
using ControleDeAnimaisSilvestres.Dominio.Validacoes;

namespace ControleDeAnimaisSilvestres
{
    public partial class Cadastro : Form
    {
        public AnimalSilvestre _animal = new AnimalSilvestre();
        public bool edicaoHabilitada;

        private ValidacaoDeAnimalSilvestre validar;

        public Cadastro(AnimalSilvestre animalSilvestre, bool edicaoDeItem, ValidacaoDeAnimalSilvestre validacao)
        {
            this.validar = validacao;
            InitializeComponent();
            IniciarComboBox();
            AplicarMascaraFinal(CaixaDeTextoPrecoDaVacinacao);

            _animal = animalSilvestre;
            edicaoHabilitada = edicaoDeItem;

            if (edicaoHabilitada)
            {
                BotaoAdicionarAnimal.Text = "Atualizar";
                _animal = animalSilvestre;
                PreencherCamposDoFormularioComItemSelecionado();
            }
        }

        private void IniciarComboBox()
        {
            ComboBoxClasseDeAnimal.Items.AddRange(Enum.GetNames(typeof(AnimalSilvestre.ClasseDeAnimal)));
            ComboBoxClasseDeAnimal.SelectedIndex = 0;
        }


        private void AoClicarEmCancelar(object sender, EventArgs e)
        {
            DialogResult = DialogResult.Cancel;
            Close();
        }

        public void AoClicarEmAdicionar(object sender, EventArgs e)
        {
            try
            {
                var objetoAnimalPreenchido = PreencherCamposDoObjeto(_animal);
                var resultados = validar.Validate(objetoAnimalPreenchido);
                validar.EnvioDeErros(resultados);
                DialogResult = DialogResult.OK;
                Close();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "Erro na edição", MessageBoxButtons.OK, MessageBoxIcon.Stop);
            }

        }

        private void RetornaMascara(object sender, EventArgs e)
        {
            TextBox txt = (TextBox)sender;
            if (!String.IsNullOrEmpty(txt.Text))
            {
                txt.Text = decimal.Parse(txt.Text).ToString("C2");
            }
        }

        private void TiraMascara(object sender, EventArgs e)
        {
            TextBox txt = (TextBox)sender;
            txt.Text = txt.Text.Replace("R$", "").Trim();
        }
        private void PermitirApenasNumeros(object sender, KeyPressEventArgs e)
        {
            TextBox txt = (TextBox)sender;
            if (!char.IsDigit(e.KeyChar) && e.KeyChar != Convert.ToChar(Keys.Back))
            {
                if (e.KeyChar == ',')
                {
                    e.Handled = (txt.Text.Contains(','));
                }
                else
                    e.Handled = true;
            }
        }

        private void AplicarMascaraFinal(TextBox txt)
        {
            txt.Enter += TiraMascara;
            txt.Leave += RetornaMascara;
            txt.KeyPress += PermitirApenasNumeros;
        }

        private AnimalSilvestre PreencherCamposDoObjeto(AnimalSilvestre animalRecebido)
        {
            var animal = animalRecebido;

            animalRecebido.NomeDoAnimal = CaixaDeTextoNomeDoAnimal.Text;
            animalRecebido.NomeDaEspecie = CaixaDeTextoEspecieDoAnimal.Text;
            animalRecebido.DataDoResgate = SelecaoDataDoResgate.Value;
            animalRecebido.Classe = (AnimalSilvestre.ClasseDeAnimal)ComboBoxClasseDeAnimal.SelectedIndex;
            animalRecebido.EmExtincao = ChecaAnimalEmExtincao.Checked;

            if (string.IsNullOrEmpty(CaixaDeTextoPrecoDaVacinacao.Text))
            {
                CaixaDeTextoPrecoDaVacinacao.Text = "0";
            }

            _animal.CustoDeVacinacao = Convert.ToDecimal((CaixaDeTextoPrecoDaVacinacao.Text).Replace("R$", "").Trim());

            return animal;
        }
        private void PreencherCamposDoFormularioComItemSelecionado()
        {
            CaixaDeTextoNomeDoAnimal.Text = _animal.NomeDoAnimal;
            CaixaDeTextoEspecieDoAnimal.Text = _animal.NomeDaEspecie;
            SelecaoDataDoResgate.Value = _animal.DataDoResgate;
            ComboBoxClasseDeAnimal.SelectedIndex = Convert.ToInt32(_animal.Classe);
            ChecaAnimalEmExtincao.Checked = _animal.EmExtincao;
            CaixaDeTextoPrecoDaVacinacao.Text = Convert.ToString(_animal.CustoDeVacinacao);
        }

    }
}

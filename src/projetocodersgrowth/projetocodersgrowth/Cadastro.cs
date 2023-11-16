using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Drawing.Text;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using CodersGrowthProjeto.Dominio;
using ControleDeAnimaisSilvestres.Dominio;
using projetocodersgrowth;

namespace ControleDeAnimaisSilvestres
{
    public partial class Cadastro : Form
    {
        public AnimalSilvestre _novoAnimal = new AnimalSilvestre();
        public AnimalSilvestre _animalSelecionado = new AnimalSilvestre();
        public AnimalSilvestre animalEditado = new AnimalSilvestre();
        public bool edicaoHabilitada;

        public Cadastro(AnimalSilvestre animalSilvestre, bool edicaoDeItem)
        {
            InitializeComponent();
            InitializeComboBox(); // preencher a combobox com os itens que estao dentro do enum
            AplicarMascaraFinal(CaixaDeTextoPrecoDaVacinacao);

            _novoAnimal = animalSilvestre;
            edicaoHabilitada = edicaoDeItem;

            if (edicaoHabilitada) // verifica se o botao de clicar foi acionado com pelo menos um item selecionado
            {
                BotaoAdicionarAnimal.Text = "Atualizar";
                _animalSelecionado = animalSilvestre;
                PreencherCamposDoFormularioComItemSelecionado();
            }



        }

        private void InitializeComboBox()
        {
            ComboBoxClasseDeAnimal.Items.AddRange(Enum.GetNames(typeof(AnimalSilvestre.ClasseDeAnimal)));
            ComboBoxClasseDeAnimal.SelectedIndex = 0; //deixa o campo setado como o primeiro item do enum
        }

        private void PreencherCamposDoFormularioComItemSelecionado()
        {
            CaixaDeTextoNomeDoAnimal.Text = _animalSelecionado.NomeDoAnimal;
            CaixaDeTextoEspecieDoAnimal.Text = _animalSelecionado.NomeDaEspecie;
            SelecaoDataDoResgate.Value = _animalSelecionado.DataDoResgate;
            ComboBoxClasseDeAnimal.SelectedIndex = Convert.ToInt32(_animalSelecionado.Classe);
            ChecaAnimalEmExtincao.Checked = _animalSelecionado.EmExtincao;
            CaixaDeTextoPrecoDaVacinacao.Text = Convert.ToString(_animalSelecionado.CustoDeVacinacao);

        }

        private void ComboBoxClasseDeAnimal_SelectedIndexChanged(object sender, EventArgs e)
        {

        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void OpcaoEmExtincaoSim_CheckedChanged(object sender, EventArgs e)
        {

        }

        private void BotaoCancelar_Click(object sender, EventArgs e)
        {
            DialogResult = DialogResult.Cancel;
            Close();
        }

        public void BotaoAdicionarAnimal_Click(object sender, EventArgs e)
        {
            if (!edicaoHabilitada)
            {

                _novoAnimal.NomeDoAnimal = CaixaDeTextoNomeDoAnimal.Text;
                _novoAnimal.NomeDaEspecie = CaixaDeTextoEspecieDoAnimal.Text;
                _novoAnimal.DataDoResgate = SelecaoDataDoResgate.Value;
                _novoAnimal.Classe = (AnimalSilvestre.ClasseDeAnimal)ComboBoxClasseDeAnimal.SelectedIndex;
                _novoAnimal.EmExtincao = ChecaAnimalEmExtincao.Checked;

                if (string.IsNullOrEmpty(CaixaDeTextoPrecoDaVacinacao.Text))
                {
                    CaixaDeTextoPrecoDaVacinacao.Text = "0";
                }
                _novoAnimal.CustoDeVacinacao = Convert.ToDecimal((CaixaDeTextoPrecoDaVacinacao.Text).Replace("R$", "").Trim());


                var validacao = new ValidacaoDeDados(_novoAnimal);

                try
                {
                    validacao.CamposEstaoValidos();

                    DialogResult = DialogResult.OK;

                    Close();
                }
                catch (Exception ex)
                {
                    MessageBox.Show(ex.Message);
                }

            }
            else
            {
                _animalSelecionado.NomeDoAnimal = CaixaDeTextoNomeDoAnimal.Text;
                _animalSelecionado.NomeDaEspecie = CaixaDeTextoEspecieDoAnimal.Text;
                _animalSelecionado.DataDoResgate = SelecaoDataDoResgate.Value;
                _animalSelecionado.Classe = (AnimalSilvestre.ClasseDeAnimal)ComboBoxClasseDeAnimal.SelectedIndex;
                _animalSelecionado.EmExtincao = ChecaAnimalEmExtincao.Checked;

                if (string.IsNullOrEmpty(CaixaDeTextoPrecoDaVacinacao.Text))
                {
                    CaixaDeTextoPrecoDaVacinacao.Text = "0";
                }
                _animalSelecionado.CustoDeVacinacao = Convert.ToDecimal((CaixaDeTextoPrecoDaVacinacao.Text).Replace("R$", "").Trim());


                var validacao = new ValidacaoDeDados(_animalSelecionado);

                try
                {
                    validacao.CamposEstaoValidos();

                    DialogResult = DialogResult.OK;

                    Close();
                }
                catch (Exception ex)
                {
                    MessageBox.Show(ex.Message);
                }
            }
        }

        private void RetornaMascara(object sender, EventArgs e)
        {
            System.Windows.Forms.TextBox txt = (System.Windows.Forms.TextBox)sender;
            if (!String.IsNullOrEmpty(txt.Text))
            {
                txt.Text = decimal.Parse(txt.Text).ToString("C2");
            }
        }

        private void TiraMascara(object sender, EventArgs e)
        {
            System.Windows.Forms.TextBox txt = (System.Windows.Forms.TextBox)sender;
            txt.Text = txt.Text.Replace("R$", "").Trim();
        }
        private void PermitirApenasNumeros(object sender, KeyPressEventArgs e)
        {
            System.Windows.Forms.TextBox txt = (System.Windows.Forms.TextBox)sender;
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

        private void AplicarMascaraFinal(System.Windows.Forms.TextBox txt)
        {
            txt.Enter += TiraMascara;
            txt.Leave += RetornaMascara;
            txt.KeyPress += PermitirApenasNumeros;
        }
    }
}

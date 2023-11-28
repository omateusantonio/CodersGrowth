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
using ControleDeAnimaisSilvestres.Dominio.Objetos;
using ControleDeAnimaisSilvestres.Dominio.Validacoes;
using FluentValidation;
using FluentValidation.Results;
using projetocodersgrowth;

namespace ControleDeAnimaisSilvestres
{
    public partial class Cadastro : Form
    {
        public AnimalSilvestre _novoAnimal = new AnimalSilvestre();
        public AnimalSilvestre _animalSelecionado = new AnimalSilvestre();
        public AnimalSilvestre animalEditado = new AnimalSilvestre();
        public bool edicaoHabilitada;

        private ValidacaoDeDadosFluentValidation validar;

        public Cadastro(AnimalSilvestre animalSilvestre, bool edicaoDeItem, ValidacaoDeDadosFluentValidation validacao)
        {
            this.validar = validacao;
            InitializeComponent();
            InitializeComboBox(); // preencher a combobox com os itens que estao dentro do enum
            AplicarMascaraFinal(CaixaDeTextoPrecoDaVacinacao);

            _novoAnimal = animalSilvestre;
            edicaoHabilitada = edicaoDeItem;

            if (edicaoHabilitada)
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
            CaixaDeTextoPrecoDaVacinacao.Text = Convert.ToString(_animalSelecionado.CustoDeVacinacao/*/100*/);
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

                var resultados = validar.Validate(_novoAnimal);
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
    }
}

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
        static int id = 0;

        public Cadastro(AnimalSilvestre animalSilvestre, bool edicaoDeItem)
        {
            InitializeComponent();
            InitializeComboBox(); // preencher a combobox com os itens que estao dentro do enum

            _novoAnimal = animalSilvestre;

            if (edicaoDeItem == true) // verifica se o botao de clicar foi acionado com pelo menos um item selecionado
            {
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
            if (!_animalSelecionado.EmExtincao)
            {
                OpcaoEmExtincaoNao.Checked = true;
            }
            CaixaDeTextoMascaraPrecoDeVacinacao.Text = Convert.ToString(_animalSelecionado.CustoDeVacinacao);

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
            _novoAnimal.NomeDoAnimal = CaixaDeTextoNomeDoAnimal.Text;
            _novoAnimal.NomeDaEspecie = CaixaDeTextoEspecieDoAnimal.Text;
            _novoAnimal.DataDoResgate = SelecaoDataDoResgate.Value;
            _novoAnimal.Classe = (AnimalSilvestre.ClasseDeAnimal)ComboBoxClasseDeAnimal.SelectedIndex;
            _novoAnimal.Id = id;
            _novoAnimal.EmExtincao = OpcaoEmExtincaoSim.Checked;

            if (string.IsNullOrEmpty(CaixaDeTextoMascaraPrecoDeVacinacao.Text))
            {
                CaixaDeTextoMascaraPrecoDeVacinacao.Text = "0";
            }
            _novoAnimal.CustoDeVacinacao = Convert.ToDecimal((CaixaDeTextoMascaraPrecoDeVacinacao.Text).Replace("R$", "").Trim());

            
            var validacao = new ValidacaoDeDados(_novoAnimal);

            try
            {
                //if()
                validacao.CamposEstaoValidos();

                DialogResult = DialogResult.OK;

                id++;

                Close();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }

        }
    }
}

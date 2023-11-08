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
        static int id = 0;

        public Cadastro(AnimalSilvestre animalSilvestre)
        {
            InitializeComponent();
            InitializeComboBox(); // preencher a combobox com os itens que estao dentro do enum

            _novoAnimal = animalSilvestre;


        }

        private void InitializeComboBox()
        {
            ComboBoxClasseDeAnimal.Items.AddRange(Enum.GetNames(typeof(AnimalSilvestre.ClasseDeAnimal)));
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
            _novoAnimal.CustoDeVacinacao = Convert.ToDecimal(CaixaDeTextoPrecoDaVacinacao.Text);
            id++;

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
    }
}

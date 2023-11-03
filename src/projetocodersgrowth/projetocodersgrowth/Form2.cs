using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using CodersGrowthProjeto.Dominio;
using projetocodersgrowth;

namespace ControleDeAnimaisSilvestres
{
    public partial class Form2 : Form
    {
        Form1 variavel;

        public Form2()
        {
            InitializeComponent();
            InitializeComboBox(); // preencher a combobox com os itens que estao dentro do enum

            List<AnimalSilvestre> adicionarNovoAnimal = new List<AnimalSilvestre>();

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
            this.Close();
        }

        private void BotaoAdicionarAnimal_Click(object sender, EventArgs e)
        {
            string nomeDoAnimal = CaixaDeTextoNomeDoAnimal.Text;
            string especieDoAnimal = CaixaDeTextoEspecieDoAnimal.Text;
            string dataDoResgate = Convert.ToString(SelecaoDataDoResgate.Value);
            string classeDeAnimal = ComboBoxClasseDeAnimal.Text;
            string emExtincao = OpcaoEmExtincaoSim.Checked ? "sim" : "não";
            string custoDoResgate = CaixaDeTextoPrecoDaVacinacao.Text;


            MessageBox.Show(nomeDoAnimal + "\n" + especieDoAnimal + "\n" + dataDoResgate + "\n" + classeDeAnimal + "\n" + emExtincao);
            
        }
    }
}

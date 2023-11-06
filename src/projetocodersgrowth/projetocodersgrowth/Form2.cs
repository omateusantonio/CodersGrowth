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
using projetocodersgrowth;

namespace ControleDeAnimaisSilvestres
{
    public partial class Form2 : Form
    {
        public List<AnimalSilvestre> _novoAnimal;
        static int id = 0;

        public Form2(List<AnimalSilvestre> animalSilvestre)
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
            Close();
        }

        public void BotaoAdicionarAnimal_Click(object sender, EventArgs e)
        {
            AnimalSilvestre animal = new AnimalSilvestre();

            animal.NomeDoAnimal = CaixaDeTextoNomeDoAnimal.Text;
            animal.NomeDaEspecie = CaixaDeTextoEspecieDoAnimal.Text;
            animal.DataDoResgate = SelecaoDataDoResgate.Value;
            animal.Classe = (AnimalSilvestre.ClasseDeAnimal)ComboBoxClasseDeAnimal.SelectedIndex;
            animal.EmExtincao = OpcaoEmExtincaoSim.Checked;
            animal.Id = id;
            animal.CustoDeVacinacao = Convert.ToDecimal(CaixaDeTextoPrecoDaVacinacao.Text);
            id++;

            _novoAnimal.Add(animal);

            Close();
        }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using CodersGrowthProjeto.Dominio;


namespace ControleDeAnimaisSilvestres
{
    public partial class Form2 : Form
    {
        public Form2()
        {
            InitializeComponent();
            InitializeComboBox(); // preencher a combobox com os itens que estao dentro do enum
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
    }
}

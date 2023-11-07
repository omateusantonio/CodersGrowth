using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CodersGrowthProjeto.Dominio;
using System.Windows;

namespace ControleDeAnimaisSilvestres.Dominio
{
    public class ClasseDeServico
    {
        public bool NomeDeAnimalValido(string nome)
        {
            if (nome == "")
            {
                MessageBox.Show("Informe o nome");
            }

            return false;
        }

        
    }
}

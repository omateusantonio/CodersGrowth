using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Threading.Channels;

namespace ControleDeAnimaisSilvestres.Dominio
{
    public class ValidacaoDeDadosCondicional
    {
        public void CamposEstaoValidos(AnimalSilvestre animal)
        {

            if (string.IsNullOrEmpty(animal.NomeDoAnimal))
            {
                throw new Exception("Nome do animal não pode ficar em branco");
            }

            if (string.IsNullOrEmpty(animal.NomeDaEspecie))
            {
                throw new Exception("Nome da espécie não pode ficar em branco");
            }

            if (animal.DataDoResgate > DateTime.Now)
            {
                throw new Exception("A data não pode ser maior do que a data atual");
            }

            if (animal.CustoDeVacinacao == 0)
            {

                throw new Exception("O preço da vacinação não pode ficar em branco");
            }
        }
    }
}

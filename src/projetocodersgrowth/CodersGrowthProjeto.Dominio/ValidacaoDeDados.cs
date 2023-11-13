using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CodersGrowthProjeto.Dominio;
using System.Windows;
using System.Threading.Channels;

namespace ControleDeAnimaisSilvestres.Dominio
{
    public class ValidacaoDeDados
    {

        public AnimalSilvestre animal = new AnimalSilvestre();
        
        public ValidacaoDeDados(AnimalSilvestre novoAnimal)
        {
            animal = novoAnimal;
        }

        public void CamposEstaoValidos()
        {
        
             if (string.IsNullOrEmpty(animal.NomeDoAnimal))
             {
                 throw new Exception("Nome do animal não pode ficar em branco");
                 //validacoes.Add(new Exception("Nome do animal não pode ficar vazio"));
             }

             if (string.IsNullOrEmpty(animal.NomeDaEspecie))
             {
                 throw new Exception("Nome da espécie não pode ficar em branco");
             }

             if (animal.DataDoResgate > DateTime.Now)
             {
                 throw new Exception("A data não pode ser maior do que a data atual");
                 //validacoes.Add(new Exception("A data não pode ser maior do que a data atual."));
             }

             if (animal.CustoDeVacinacao == 0)
             {

                throw new Exception("O preço da vacinação não pode ficar em branco");
             }


                //throw new AggregateException(validacoes);
        }

        
    }
}

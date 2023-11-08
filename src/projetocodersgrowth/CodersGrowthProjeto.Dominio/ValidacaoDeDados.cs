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
        //List <Exception> validacoes = new List <Exception> ();
        public ValidacaoDeDados(AnimalSilvestre novoAnimal)
        {
            animal = novoAnimal;
        }

        public void CamposEstaoValidos()
        {

            try
            {

                if (string.IsNullOrEmpty(animal.NomeDoAnimal))
                {
                    throw new Exception("Nome do animal não pode ficar vazio");
                    //validacoes.Add(new Exception("Nome do animal não pode ficar vazio"));
                }

                if (string.IsNullOrEmpty(animal.NomeDaEspecie))
                {
                    throw new Exception("Nome da espécie não pode ficar vazio");
                }

                if (animal.DataDoResgate > DateTime.Now)
                {
                    throw new Exception("A data não pode ser maior do que a data atual");
                    //validacoes.Add(new Exception("A data não pode ser maior do que a data atual."));
                }


                //throw new AggregateException(validacoes);

            }
            catch(Exception ex)
            {
                throw;
            }
        }

        
    }
}

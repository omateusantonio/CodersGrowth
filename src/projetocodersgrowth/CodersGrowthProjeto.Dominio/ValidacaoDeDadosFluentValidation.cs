using CodersGrowthProjeto.Dominio;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControleDeAnimaisSilvestres.Dominio
{
    public class ValidacaoDeDadosFluentValidation : AbstractValidator<AnimalSilvestre>
    {
        public void CamposEstaoValidos(AnimalSilvestre animal)
        {
            RuleFor(animal => animal.NomeDoAnimal).NotNull().NotEmpty();

        }
    }
}

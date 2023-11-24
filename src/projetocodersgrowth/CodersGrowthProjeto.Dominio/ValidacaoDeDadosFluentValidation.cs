using CodersGrowthProjeto.Dominio;
using FluentValidation;
using FluentValidation.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControleDeAnimaisSilvestres.Dominio
{
    public class ValidacaoDeDadosFluentValidation : AbstractValidator<AnimalSilvestre>
    {
        private const decimal precoMinimoDeVacinacao = 10;
        public ValidacaoDeDadosFluentValidation()
        {
            RuleFor(animal => animal.NomeDoAnimal).NotNull().NotEmpty().WithMessage("O campo nome do animal não pode ficar em branco;");
            RuleFor(animal => animal.NomeDaEspecie).NotNull().NotEmpty().WithMessage("O campo nome da espécie não pode ficar em branco;");
            RuleFor(animal => animal.DataDoResgate).LessThanOrEqualTo(DateTime.Today).WithMessage("A data de resgate não pode ser menor do que a data atual;");
            RuleFor(animal => animal.CustoDeVacinacao).GreaterThan(precoMinimoDeVacinacao).WithMessage("O preço da vacinação deve ser maior do que R$ 10;");
            RuleFor(animal => animal.CustoDeVacinacao).NotEmpty().WithMessage("O preço da vacinação não pode ficar em branco;");
        }

        public void EnvioDeErros(ValidationResult resultados)
        {
            if (!resultados.IsValid)
            {
                throw new Exception(resultados.ToString());
            }
        }
    }
}

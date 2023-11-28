using ControleDeAnimaisSilvestres.Dominio.Objetos;
using FluentValidation;
using FluentValidation.Results;

namespace ControleDeAnimaisSilvestres.Dominio.Validacoes
{
    public class ValidacaoDeAnimalSilvestre : AbstractValidator<AnimalSilvestre>
    {
        private const decimal PrecoMinimoDeVacinacao = 10;
        public ValidacaoDeAnimalSilvestre()
        {
            RuleFor(animal => animal.NomeDoAnimal)
                .NotNull()
                .NotEmpty()
                .WithMessage("O campo nome do animal não pode ficar em branco;");

            RuleFor(animal => animal.NomeDaEspecie)
                .NotNull()
                .NotEmpty()
                .WithMessage("O campo nome da espécie não pode ficar em branco;");

            RuleFor(animal => animal.DataDoResgate)
                .LessThanOrEqualTo(DateTime.UtcNow)
                .WithMessage("A data de resgate não pode ser menor do que a data atual;");

            RuleFor(animal => animal.DataDoResgate)
                .Must(DataEhValida)
                .WithMessage("A data deve ser válida;");

            RuleFor(animal => animal.CustoDeVacinacao)
                .GreaterThan(PrecoMinimoDeVacinacao)
                .WithMessage("O preço da vacinação deve ser maior do que R$ 10;");

            RuleFor(animal => animal.CustoDeVacinacao)
                .NotEmpty()
                .WithMessage("O preço da vacinação não pode ficar em branco;");
        }

        public void EnvioDeErros(ValidationResult resultados)
        {
            if (!resultados.IsValid)
            {
                throw new Exception(resultados.ToString());
            }
        }

        private bool DataEhValida (DateTime data)
        {
            return !data.Equals(default(DateTime));
        }
    }
}

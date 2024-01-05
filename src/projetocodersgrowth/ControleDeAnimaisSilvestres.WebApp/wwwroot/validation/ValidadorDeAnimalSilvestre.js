sap.ui.define([
    "sap/ui/core/ValueState",
    "sap/ui/base/Object"
 ], (ValueState, BaseObject) => {
    "use strict";

    const NOME_CAMPO_NOME_ANIMAL = "inputNomeDoAnimal";
    const NOME_CAMPO_NOME_ESPECIE = "inputNomeDaEspecie";
    const NOME_CAMPO_PRECO_VACINACAO = "inputPrecoDaVacinacao";
    const NOME_CAMPO_DATA_RESGATE = "inputDataDoResgate";

    return BaseObject.extend("ui5.controledeanimaissilvestres.ValidadorDeAnimalSilvestre", {
        constructor: function(oView, oResourceBundle) {
            this._oView = oView;
            this._oResourceBundle = oResourceBundle;
        },

        _validarSeCamposEstaoPreenchidos(oCadastro) {
            const stringAtributoNomeDoAnimal = "nomeDoAnimal";
            const stringAtributoNomeDaEspecie = "nomeDaEspecie";
            const stringAtributoCustoDaVacinacao = "custoDeVacinacao";
            const stringAtributoDataDoResgate = "dataDoResgate";

            const stringErroCampoNomeDoAnimalVazio = this._oResourceBundle.getText("erroCampoNomeDoAnimalVazio");
            const stringErroCampoNomeDaEspecieVazio = this._oResourceBundle.getText("erroCampoNomeDaEspecieVazio");
            const stringErroCampoPrecoDaVacinacaoVazio = this._oResourceBundle.getText("erroCampoPrecoDaVacinacaoVazio");
            const stringErroCampoDataDoResgateVazio = this._oResourceBundle.getText("erroCampoDataDoResgateVazio");

            if (!oCadastro[stringAtributoNomeDoAnimal]) {
                this._definirStatusDeErro(NOME_CAMPO_NOME_ANIMAL, stringErroCampoNomeDoAnimalVazio);

            } else {
                this._definirStatusDeSucesso(NOME_CAMPO_NOME_ANIMAL);
            }

            if (!oCadastro[stringAtributoNomeDaEspecie]) {
                this._definirStatusDeErro(NOME_CAMPO_NOME_ESPECIE, stringErroCampoNomeDaEspecieVazio);
            } else {
                this._definirStatusDeSucesso(NOME_CAMPO_NOME_ESPECIE);
            }

            if (!oCadastro[stringAtributoCustoDaVacinacao]) {
                this._definirStatusDeErro(NOME_CAMPO_PRECO_VACINACAO, stringErroCampoPrecoDaVacinacaoVazio);
            } else {
                this._definirStatusDeSucesso(NOME_CAMPO_PRECO_VACINACAO);
            }

            if (!oCadastro[stringAtributoDataDoResgate]) {
                this._definirStatusDeErro(NOME_CAMPO_DATA_RESGATE, stringErroCampoDataDoResgateVazio)
            } else {
                this._definirStatusDeSucesso(NOME_CAMPO_DATA_RESGATE);
            }

        },

        _definirStatusDeErro(id, mensagem){
            this._oView.byId(id).setValueState(ValueState.Error);
            this._oView.byId(id).setValueStateText(mensagem);
            throw mensagem;
        },

        _definirStatusDeSucesso(id) {
            this._oView.byId(id).setValueState(ValueState.Success);
        },

        validarNomeDoAnimalPelaView(oEvento){
            const stringInputNomeDoAnimal = oEvento.getSource().getValue();
            this._validacaoNomeDoAnimal(stringInputNomeDoAnimal);
        },

        _validacaoNomeDoAnimal (stringInputNomeDoAnimal) {
            const oRegex = new RegExp("[^a-zA-Z]");
            const booleanoContemNumeroOuCaracterEspecialNoInput = oRegex.test(stringInputNomeDoAnimal);
            const stringErroInputNomeDoAnimalInvalido = this._oResourceBundle.getText("erroInputNomeDoAnimalInvalido");
            const stringErroCampoNomeDoAnimalVazio = this._oResourceBundle.getText("erroCampoNomeDoAnimalVazio");
            const stringErroInputNomeDoAnimalTamanhoMinimo = this._oResourceBundle.getText("erroInputNomeDoAnimalTamanhoMinimo");

            if (booleanoContemNumeroOuCaracterEspecialNoInput) {
                this._definirStatusDeErro(NOME_CAMPO_NOME_ANIMAL, stringErroInputNomeDoAnimalInvalido);
            } else if (stringInputNomeDoAnimal.length < 2) {
                this._definirStatusDeErro(NOME_CAMPO_NOME_ANIMAL, stringErroInputNomeDoAnimalTamanhoMinimo);
            } else if (!stringInputNomeDoAnimal) {
                this._definirStatusDeErro(NOME_CAMPO_NOME_ANIMAL, stringErroCampoNomeDoAnimalVazio);
            }
            else {
                this._definirStatusDeSucesso(NOME_CAMPO_NOME_ANIMAL);
            }
        },

        validarNomeDaEspeciePelaView (oEvento) {
            const stringInputNomeDaEspecie = oEvento.getSource().getValue();
            this._validacaoNomeDaEspecie(stringInputNomeDaEspecie);
        },

        _validacaoNomeDaEspecie (stringInputNomeDaEspecie) {
            const oRegex = new RegExp("[^a-zA-Z]");
            const booleanoContemNumeroOuCaracterEspecialNoInput = oRegex.test(stringInputNomeDaEspecie);
            const stringErroInputNomeDaEspecieInvalido = this._oResourceBundle.getText("erroInputNomeDaEspecieInvalido");
            const stringErroCampoNomeDaEspecieVazio = this._oResourceBundle.getText("erroCampoNomeDaEspecieVazio");
            const stringErroInputNomeDaEspecieTamanhoMinimo = this._oResourceBundle.getText("erroInputNomeDaEspecieTamanhoMinimo");
            
            if (booleanoContemNumeroOuCaracterEspecialNoInput) {
                this._definirStatusDeErro(NOME_CAMPO_NOME_ESPECIE, stringErroInputNomeDaEspecieInvalido);
            } else if (stringInputNomeDaEspecie.length < 5) {
                this._definirStatusDeErro(NOME_CAMPO_NOME_ESPECIE, stringErroInputNomeDaEspecieTamanhoMinimo);
            } else if (!stringInputNomeDaEspecie) {
                this._definirStatusDeErro(NOME_CAMPO_NOME_ESPECIE, stringErroCampoNomeDaEspecieVazio);
            }
            else {
                this._definirStatusDeSucesso(NOME_CAMPO_NOME_ESPECIE);
            }
        },

        validarPrecoDeVacinacaoPelaView(oEvento) {
            const stringInputPreco = oEvento.getSource().getProperty("value");
            this._validacaoPrecoDeVacinacao(stringInputPreco)
        },

        _validacaoPrecoDeVacinacao (stringInputPreco) {
            const floatPrecoMinimo = 10.00;
            const stringInputPrecoFormatado = this._formatarPreco(stringInputPreco);
            const oRegex = new RegExp("^(\\d+)(?:[\\.|,](\\d{1,2}))?$");
            const booleanoPrecoDigitadoEhValido = oRegex.test(stringInputPrecoFormatado);
            const stringErroInputPrecoDaVacinacaoInvalido = this._oResourceBundle.getText("erroInputPrecoDaVacinacaoInvalido");
            const stringErroInputPrecoDaVacinacaoPrecoMinimo = this._oResourceBundle.getText("erroInputPrecoDaVacinacaoPrecoMinimo");

            if (stringInputPrecoFormatado < floatPrecoMinimo) {
                this._definirStatusDeErro(NOME_CAMPO_PRECO_VACINACAO, stringErroInputPrecoDaVacinacaoPrecoMinimo);
            } else if (!booleanoPrecoDigitadoEhValido) {
                this._definirStatusDeErro(NOME_CAMPO_PRECO_VACINACAO, stringErroInputPrecoDaVacinacaoInvalido);
            } else {
                this._definirStatusDeSucesso(NOME_CAMPO_PRECO_VACINACAO);
            }
        },

        validarDataDeResgatePelaView(oEvento) {
            const stringInputData = oEvento.getSource().getProperty("dateValue");
            this._validacaoDataDeResgate(stringInputData)
        },

        _validacaoDataDeResgate(stringInputData) {
            const stringDataAtual = new Date();
            const stringErroInputDataDoResgateInvalido = this._oResourceBundle.getText("erroInputDataDoResgateInvalido");
            const stringErroInputDataDeResgateNaoDeveSerFuturo = this._oResourceBundle.getText("erroInputDataDeResgateNaoDeveSerFuturo");

            if (stringInputData > stringDataAtual) {
                this._definirStatusDeErro(NOME_CAMPO_DATA_RESGATE, stringErroInputDataDeResgateNaoDeveSerFuturo);
            } else if (!stringInputData) {
                this._definirStatusDeErro(NOME_CAMPO_DATA_RESGATE, stringErroInputDataDoResgateInvalido);
            } else {
                this._definirStatusDeSucesso(NOME_CAMPO_DATA_RESGATE);
            }
        },

        _formatarPreco(stringInputPreco) {
            const charPonto = ".";
            const charVazio = "";
            const charVirgula = ",";

            let stringPrecoSemPonto = stringInputPreco.replaceAll(charPonto, charVazio);
            const stringPrecoCasaDecimalComPonto = stringPrecoSemPonto.replace(charVirgula, charPonto);

            return stringPrecoCasaDecimalComPonto;
        },

        _qlqrcoisa() {
            _validacaoDataDeResgate();
            
        }
    });
 });
 
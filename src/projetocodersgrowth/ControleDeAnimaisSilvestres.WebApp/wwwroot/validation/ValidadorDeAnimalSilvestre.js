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

        _validacaoCampoEstaPreenchido(oCadastro, oView, oResourceBundle) {
            const stringAtributoNomeDoAnimal = "nomeDoAnimal";
            const stringAtributoNomeDaEspecie = "nomeDaEspecie";
            const stringAtributoCustoDaVacinacao = "custoDeVacinacao";
            const stringAtributoDataDoResgate = "dataDoResgate";

            const stringErroCampoNomeDoAnimalVazio = oResourceBundle.getText("erroCampoNomeDoAnimalVazio");
            const stringErroCampoNomeDaEspecieVazio = oResourceBundle.getText("erroCampoNomeDaEspecieVazio");
            const stringErroCampoPrecoDaVacinacaoVazio = oResourceBundle.getText("erroCampoPrecoDaVacinacaoVazio");
            const stringErroCampoDataDoResgateVazio = oResourceBundle.getText("erroCampoDataDoResgateVazio");

            if (!oCadastro[stringAtributoNomeDoAnimal]) {
                oView.byId(NOME_CAMPO_NOME_ANIMAL).setValueState(ValueState.Error);
                oView.byId(NOME_CAMPO_NOME_ANIMAL).setValueStateText(stringErroCampoNomeDoAnimalVazio);
            } else {
                oView.byId(NOME_CAMPO_NOME_ANIMAL).setValueState(ValueState.Success);
            }

            if (!oCadastro[stringAtributoNomeDaEspecie]) {
                oView.byId(NOME_CAMPO_NOME_ESPECIE).setValueState(ValueState.Error);
                oView.byId(NOME_CAMPO_NOME_ESPECIE).setValueStateText(stringErroCampoNomeDaEspecieVazio);
            } else {
                oView.byId(NOME_CAMPO_NOME_ESPECIE).setValueState(ValueState.Success);
            }

            if (!oCadastro[stringAtributoCustoDaVacinacao]) {
                oView.byId(NOME_CAMPO_PRECO_VACINACAO).setValueState(ValueState.Error);
                oView.byId(NOME_CAMPO_PRECO_VACINACAO).setValueStateText(stringErroCampoPrecoDaVacinacaoVazio);
            } else {
                oView.byId(NOME_CAMPO_PRECO_VACINACAO).setValueState(ValueState.Success);
            }

            if (!oCadastro[stringAtributoDataDoResgate]) {
                oView.byId(NOME_CAMPO_DATA_RESGATE).setValueState(ValueState.Error);
                oView.byId(NOME_CAMPO_DATA_RESGATE).setValueStateText(stringErroCampoDataDoResgateVazio);
            } else {
                oView.byId(NOME_CAMPO_DATA_RESGATE).setValueState(ValueState.Success);
            }

        },

        _validacaoNomeDoAnimal (oEvento, oView, oResourceBundle) {
            const oRegex = new RegExp("[^a-zA-Z]");
            const stringInputNomeDoAnimal = oEvento.getSource().getValue();
            const booleanoContemNumeroOuCaracterEspecialNoInput = oRegex.test(stringInputNomeDoAnimal);
            const stringErroInputNomeDoAnimalInvalido = oResourceBundle.getText("erroInputNomeDoAnimalInvalido");
            const stringErroCampoNomeDoAnimalVazio = oResourceBundle.getText("erroCampoNomeDoAnimalVazio");

            if (booleanoContemNumeroOuCaracterEspecialNoInput) {
                oView.byId(NOME_CAMPO_NOME_ANIMAL).setValueState(ValueState.Error);
                oView.byId(NOME_CAMPO_NOME_ANIMAL).setValueStateText(stringErroInputNomeDoAnimalInvalido);
            } else if (!stringInputNomeDoAnimal) {
                oView.byId(NOME_CAMPO_NOME_ANIMAL).setValueState(ValueState.Error);
                oView.byId(NOME_CAMPO_NOME_ANIMAL).setValueStateText(stringErroCampoNomeDoAnimalVazio);
            }
            else {
                oView.byId(NOME_CAMPO_NOME_ANIMAL).setValueState(ValueState.Success);
            }
        },

        _validacaoNomeDaEspecie (oEvento, oView, oResourceBundle) {
            const oRegex = new RegExp("[^a-zA-Z]");
            const stringInputNomeDaEspecie = oEvento.getSource().getValue();
            const booleanoContemNumeroOuCaracterEspecialNoInput = oRegex.test(stringInputNomeDaEspecie);
            const stringErroInputNomeDaEspecieInvalido = oResourceBundle.getText("erroInputNomeDaEspecieInvalido");
            const stringErroCampoNomeDaEspecieVazio = oResourceBundle.getText("erroCampoNomeDaEspecieVazio");
           
            if (booleanoContemNumeroOuCaracterEspecialNoInput) {
                oView.byId(NOME_CAMPO_NOME_ESPECIE).setValueState(ValueState.Error);
                oView.byId(NOME_CAMPO_NOME_ESPECIE).setValueStateText(stringErroInputNomeDaEspecieInvalido);
            } else if (!stringInputNomeDaEspecie) {
                oView.byId(NOME_CAMPO_NOME_ESPECIE).setValueState(ValueState.Error);
                oView.byId(NOME_CAMPO_NOME_ESPECIE).setValueStateText(stringErroCampoNomeDaEspecieVazio);
            }
            else {
                oView.byId(NOME_CAMPO_NOME_ESPECIE).setValueState(ValueState.Success);
            }
        },

        _validacaoPrecoDeVacinacao (oEvento, oView, oResourceBundle) {
            const floatPrecoMinimo = 10.00;
            const stringInputPreco = oEvento.getSource().getProperty("value");
            const stringInputPrecoFormatado = this._formatarPreco(stringInputPreco);
            const oRegex = new RegExp("^(\\d+)(?:[\\.|,](\\d{1,2}))?$");
            const booleanoPrecoDigitadoEhValido = oRegex.test(stringInputPrecoFormatado);
            const stringErroInputPrecoDaVacinacaoInvalido = oResourceBundle.getText("erroInputPrecoDaVacinacaoInvalido");
            const stringErroInputPrecoDaVacinacaoMenorQue10 = oResourceBundle.getText("erroInputPrecoDaVacinacaoMenorQue10");

            if (stringInputPrecoFormatado < floatPrecoMinimo) {
                oView.byId(NOME_CAMPO_PRECO_VACINACAO).setValueState(ValueState.Error);
                oView.byId(NOME_CAMPO_PRECO_VACINACAO).setValueStateText(stringErroInputPrecoDaVacinacaoMenorQue10);
            } else if (!booleanoPrecoDigitadoEhValido) {
                oView.byId(NOME_CAMPO_PRECO_VACINACAO).setValueState(ValueState.Error);
                oView.byId(NOME_CAMPO_PRECO_VACINACAO).setValueStateText(stringErroInputPrecoDaVacinacaoInvalido);
            } else {
                oView.byId(NOME_CAMPO_PRECO_VACINACAO).setValueState(ValueState.Success);
            }
        },

        _validacaoDataDeResgate(oEvento, oView, oResourceBundle) {
            const sInputData = oEvento.getSource().getProperty("dateValue");
            const sDataAtual = new Date();
            const stringErroInputDataDoResgateInvalido = oResourceBundle.getText("erroInputDataDoResgateInvalido");
            const stringErroInputDataDeResgateNaoDeveSerFuturo = oResourceBundle.getText("erroInputDataDeResgateNaoDeveSerFuturo");

            if (sInputData > sDataAtual) {
                oView.byId(NOME_CAMPO_DATA_RESGATE).setValueState(ValueState.Error);
                oView.byId(NOME_CAMPO_DATA_RESGATE).setValueStateText(stringErroInputDataDeResgateNaoDeveSerFuturo);
            } else if (!sInputData) {
                oView.byId(NOME_CAMPO_DATA_RESGATE).setValueState(ValueState.Error);
                oView.byId(NOME_CAMPO_DATA_RESGATE).setValueStateText(stringErroInputDataDoResgateInvalido);
            } else {
                oView.byId(NOME_CAMPO_DATA_RESGATE).setValueState(ValueState.Success);
            }
        },

        _formatarPreco(stringInputPreco) {
            const charPonto = ".";
            const charVazio = "";
            const charVirgula = ",";

            let stringPrecoSemPonto = stringInputPreco.replaceAll(charPonto, charVazio);
            const stringPrecoCasaDecimalComPonto = stringPrecoSemPonto.replace(charVirgula, charPonto);

            return stringPrecoCasaDecimalComPonto;
        }

        
    });
 });
 
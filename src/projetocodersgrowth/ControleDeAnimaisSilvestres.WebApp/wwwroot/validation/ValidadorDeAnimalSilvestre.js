sap.ui.define([
    "sap/ui/core/ValueState",
    "sap/ui/base/Object"
 ], (ValueState, BaseObject) => {
    "use strict";

    const NOME_CAMPO_NOME_ANIMAL = "inputNomeDoAnimal";
    const NOME_CAMPO_NOME_ESPECIE = "inputNomeDaEspecie";
    const NOME_CAMPO_PRECO_VACINACAO = "inputPrecoDaVacinacao";
    const NOME_CAMPO_DATA_RESGATE = "inputDataDoResgate";
    let MENSAGENS_DE_ERRO = [];

    return BaseObject.extend("ui5.controledeanimaissilvestres.ValidadorDeAnimalSilvestre", {
        constructor: function(oView, oResourceBundle) {
            this._oView = oView;
            this._oResourceBundle = oResourceBundle;
        },

        _validarSeCamposEstaoPreenchidos(dadosDeCadastro) {
            const atributoNomeDoAnimal = "nomeDoAnimal";
            const atributoNomeDaEspecie = "nomeDaEspecie";
            const atributoCustoDaVacinacao = "custoDeVacinacao";
            const atributoDataDoResgate = "dataDoResgate";

            const erroCampoNomeDoAnimalVazio = this._oResourceBundle.getText("oCampoNomeDoAnimalNaoPodeFicarVazio");
            const erroCampoNomeDaEspecieVazio = this._oResourceBundle.getText("oCampoNomeDaEspecieNaoPodeFicarVazio");
            const erroCampoPrecoDaVacinacaoVazio = this._oResourceBundle.getText("oCampoPrecoNaoPodeFicarVazio");
            const erroCampoDataDoResgateVazio = this._oResourceBundle.getText("oCampoDataDeResgateNaoPodeFicarVazio");

            if (!dadosDeCadastro[atributoNomeDoAnimal]) {
                this._definirStatusDeErro(NOME_CAMPO_NOME_ANIMAL, erroCampoNomeDoAnimalVazio);
                MENSAGENS_DE_ERRO.push(erroCampoNomeDoAnimalVazio);
            } else {
                this._definirStatusDeSucesso(NOME_CAMPO_NOME_ANIMAL);
            }

            if (!dadosDeCadastro[atributoNomeDaEspecie]) {
                this._definirStatusDeErro(NOME_CAMPO_NOME_ESPECIE, erroCampoNomeDaEspecieVazio);
                MENSAGENS_DE_ERRO.push(erroCampoNomeDaEspecieVazio);
            } else {
                this._definirStatusDeSucesso(NOME_CAMPO_NOME_ESPECIE);
            }

            if (!dadosDeCadastro[atributoCustoDaVacinacao]) {
                this._definirStatusDeErro(NOME_CAMPO_PRECO_VACINACAO, erroCampoPrecoDaVacinacaoVazio);
                MENSAGENS_DE_ERRO.push(erroCampoPrecoDaVacinacaoVazio);
            } else {
                this._definirStatusDeSucesso(NOME_CAMPO_PRECO_VACINACAO);
            }

            if (!dadosDeCadastro[atributoDataDoResgate]) {
                this._definirStatusDeErro(NOME_CAMPO_DATA_RESGATE, erroCampoDataDoResgateVazio)
                MENSAGENS_DE_ERRO.push(erroCampoDataDoResgateVazio);
            } else {
                this._definirStatusDeSucesso(NOME_CAMPO_DATA_RESGATE);
            }
        },

        _definirStatusDeErro(id, mensagem){
            this._oView.byId(id).setValueState(ValueState.Error);
            this._oView.byId(id).setValueStateText(mensagem);
        },

        _definirStatusDeSucesso(id) {
            this._oView.byId(id).setValueState(ValueState.Success);
        },

        validarNomeDoAnimalPelaView(oEvento){
            const inputNomeDoAnimal = oEvento.getSource().getValue();
            this._validarNomeDoAnimal(inputNomeDoAnimal);
        },

        _validarNomeDoAnimal (inputNomeDoAnimal) {
            const oRegex = new RegExp("^[A-Za-z]+( [A-Za-z]+)*$");
            const boolInputEhValido = oRegex.test(inputNomeDoAnimal);
            const erroInputNomeDoAnimalInvalido = this._oResourceBundle.getText("oNomeDoAnimalNaoPodeConterNumerosOuCaracteresEspeciais");
            const erroCampoNomeDoAnimalVazio = this._oResourceBundle.getText("oCampoNomeDoAnimalNaoPodeFicarVazio");
            const erroInputNomeDoAnimalTamanhoMinimo = this._oResourceBundle.getText("oNomeDoAnimalDeveTerAoMenos2Caracteres");

            if (inputNomeDoAnimal == "") {
                this._definirStatusDeErro(NOME_CAMPO_NOME_ANIMAL, erroCampoNomeDoAnimalVazio);
            } else if (!boolInputEhValido) {
                this._definirStatusDeErro(NOME_CAMPO_NOME_ANIMAL, erroInputNomeDoAnimalInvalido);
                MENSAGENS_DE_ERRO.push(erroInputNomeDoAnimalInvalido);
            } else if (inputNomeDoAnimal.length < 2) {
                this._definirStatusDeErro(NOME_CAMPO_NOME_ANIMAL, erroInputNomeDoAnimalTamanhoMinimo);
                MENSAGENS_DE_ERRO.push(erroInputNomeDoAnimalTamanhoMinimo);
            }
            else {
                this._definirStatusDeSucesso(NOME_CAMPO_NOME_ANIMAL);
            }
        },

        validarNomeDaEspeciePelaView (oEvento) {
            const inputNomeDaEspecie = oEvento.getSource().getValue();
            this._validarNomeDaEspecie(inputNomeDaEspecie);
        },

        _validarNomeDaEspecie (inputNomeDaEspecie) {
            const oRegex = new RegExp("^[A-Za-z]+( [A-Za-z]+)*$");
            const boolInputEhValido = oRegex.test(inputNomeDaEspecie);
            const erroInputNomeDaEspecieInvalido = this._oResourceBundle.getText("oNomeDaEspecieNaoPodeConterNumerosOuCaracteresEspeciais");
            const erroCampoNomeDaEspecieVazio = this._oResourceBundle.getText("oCampoNomeDaEspecieNaoPodeFicarVazio");
            const erroInputNomeDaEspecieTamanhoMinimo = this._oResourceBundle.getText("oNomeDaEspecieDeveTerAoMenos5Caracteres");
            
            if (inputNomeDaEspecie == "") {
                this._definirStatusDeErro(NOME_CAMPO_NOME_ESPECIE, erroCampoNomeDaEspecieVazio);
            } else if (!boolInputEhValido) {
                this._definirStatusDeErro(NOME_CAMPO_NOME_ESPECIE, erroInputNomeDaEspecieInvalido);
                MENSAGENS_DE_ERRO.push(erroInputNomeDaEspecieInvalido);
            } else if (inputNomeDaEspecie.length < 5) {
                this._definirStatusDeErro(NOME_CAMPO_NOME_ESPECIE, erroInputNomeDaEspecieTamanhoMinimo);
                MENSAGENS_DE_ERRO.push(erroInputNomeDaEspecieTamanhoMinimo);
            }
            else {
                this._definirStatusDeSucesso(NOME_CAMPO_NOME_ESPECIE);
            }
        },

        validarPrecoDeVacinacaoPelaView(oEvento) {
            const inputPreco = oEvento.getSource().getProperty("value");
            this._validarPrecoDeVacinacao(inputPreco)
        },

        _validarPrecoDeVacinacao (inputPreco) {
            const precoMinimo = 10.00;
            const inputPrecoFormatado = this._formatarPreco(inputPreco);
            const oRegex = new RegExp("^(\\d+)(?:[\\.|,](\\d{1,2}))?$");
            const boolPrecoDigitadoEhValido = oRegex.test(inputPrecoFormatado);
            const erroInputPrecoVacinacaoNaoPodeFicarVazio = this._oResourceBundle.getText("oCampoPrecoNaoPodeFicarVazio");
            const erroInputPrecoDaVacinacaoInvalido = this._oResourceBundle.getText("oPrecoDaVacinacaoPrecisaEstarEmUmFormatoValido");
            const erroInputPrecoDaVacinacaoPrecoMinimo = this._oResourceBundle.getText("oPrecoDaVacinacaoDeveSerMaiorDoQue10");

            if (inputPrecoFormatado == "") {
                this._definirStatusDeErro(NOME_CAMPO_PRECO_VACINACAO, erroInputPrecoVacinacaoNaoPodeFicarVazio);
                MENSAGENS_DE_ERRO.push(erroInputPrecoVacinacaoNaoPodeFicarVazio);
            } else if (inputPrecoFormatado < precoMinimo) {
                this._definirStatusDeErro(NOME_CAMPO_PRECO_VACINACAO, erroInputPrecoDaVacinacaoPrecoMinimo);
                MENSAGENS_DE_ERRO.push(erroInputPrecoDaVacinacaoPrecoMinimo);
            } else if (!boolPrecoDigitadoEhValido) {
                this._definirStatusDeErro(NOME_CAMPO_PRECO_VACINACAO, erroInputPrecoDaVacinacaoInvalido);
                MENSAGENS_DE_ERRO.push(erroInputPrecoDaVacinacaoInvalido);
            } else {
                this._definirStatusDeSucesso(NOME_CAMPO_PRECO_VACINACAO);
            }
        },

        validarDataDeResgatePelaView(oEvento) {
            const inputData = oEvento.getSource().getProperty("dateValue");
            this._validarDataDeResgate(inputData)
        },

        _validarDataDeResgate(inputData) {
            const dataAtual = new Date();
            const erroInputDataDoResgateInvalido = this._oResourceBundle.getText("aDataDeResgatePrecisaEstarEmUmFormatoValido");
            const erroInputDataDeResgateNaoDeveSerFuturo = this._oResourceBundle.getText("aDataDeResgateNaoPodeSerUmaDataNoFuturo");

            if (inputData > dataAtual) {
                this._definirStatusDeErro(NOME_CAMPO_DATA_RESGATE, erroInputDataDeResgateNaoDeveSerFuturo);
                MENSAGENS_DE_ERRO.push(erroInputDataDeResgateNaoDeveSerFuturo);
            } else if (!inputData) {
                this._definirStatusDeErro(NOME_CAMPO_DATA_RESGATE, erroInputDataDoResgateInvalido);
                MENSAGENS_DE_ERRO.push(erroInputDataDoResgateInvalido);
            } else {
                this._definirStatusDeSucesso(NOME_CAMPO_DATA_RESGATE);
            }
        },

        _formatarPreco(inputPreco) {
            const ponto = ".";
            const vazio = "";
            const virgula = ",";

            let precoSemPonto = String(inputPreco).replaceAll(ponto, vazio);
            const precoFormatado = precoSemPonto.replace(virgula, ponto);

            return precoFormatado;
        },

        validacaoDeTodosOsCampos(dadosDeCadastro) {
            MENSAGENS_DE_ERRO = [];

            let nomeDoAnimalDigitado = dadosDeCadastro.nomeDoAnimal;
            let nomeDaEspecieDigitada = dadosDeCadastro.nomeDaEspecie;
            let precoDaVacinacaoDigitado = dadosDeCadastro.custoDeVacinacao;
            let dataDeResgateDigitada = dadosDeCadastro.dataDoResgate;
            
            this._validarSeCamposEstaoPreenchidos(dadosDeCadastro);
            this._validarNomeDoAnimal(nomeDoAnimalDigitado);
            this._validarNomeDaEspecie(nomeDaEspecieDigitada);
            this._validarPrecoDeVacinacao(precoDaVacinacaoDigitado);
            this._validarDataDeResgate(dataDeResgateDigitada);
            
            let existeErro = MENSAGENS_DE_ERRO.length;

            if (existeErro > 0) {
                throw this._obterMensagemDeErroFormatada();
            }
        },

        _obterMensagemDeErroFormatada() {
            const virgula = ",";
            
            let mensagens = "<li>" + MENSAGENS_DE_ERRO.toString().replaceAll(virgula , "</li>\n<li>") + "</li>"
            return mensagens;
        }
    });
 });
 
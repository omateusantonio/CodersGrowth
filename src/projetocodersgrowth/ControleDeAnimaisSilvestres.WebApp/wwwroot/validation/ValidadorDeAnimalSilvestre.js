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

        validarNomeDoAnimalPelaView(nomeDoAnimal){
            this._validarNomeDoAnimal(nomeDoAnimal);
        },

        _validarNomeDoAnimal (nomeDoAnimal) {
            const oRegex = new RegExp("^[A-Za-z]+( [A-Za-z]+)*$");
            const nomeEhValido = oRegex.test(nomeDoAnimal);
            const erroInputNomeDoAnimalInvalido = this._oResourceBundle.getText("oNomeDoAnimalNaoPodeConterNumerosOuCaracteresEspeciais");
            const erroCampoNomeDoAnimalVazio = this._oResourceBundle.getText("oCampoNomeDoAnimalNaoPodeFicarVazio");
            const erroInputNomeDoAnimalTamanhoMinimo = this._oResourceBundle.getText("oNomeDoAnimalDeveTerAoMenos2Caracteres");

            if (nomeDoAnimal == "") {
                this._definirStatusDeErro(NOME_CAMPO_NOME_ANIMAL, erroCampoNomeDoAnimalVazio);
            } else if (!nomeEhValido) {
                this._definirStatusDeErro(NOME_CAMPO_NOME_ANIMAL, erroInputNomeDoAnimalInvalido);
                MENSAGENS_DE_ERRO.push(erroInputNomeDoAnimalInvalido);
            } else if (nomeDoAnimal.length < 2) {
                this._definirStatusDeErro(NOME_CAMPO_NOME_ANIMAL, erroInputNomeDoAnimalTamanhoMinimo);
                MENSAGENS_DE_ERRO.push(erroInputNomeDoAnimalTamanhoMinimo);
            }
            else {
                this._definirStatusDeSucesso(NOME_CAMPO_NOME_ANIMAL);
            }
        },

        validarNomeDaEspeciePelaView (nomeDaEspecie) {
            this._validarNomeDaEspecie(nomeDaEspecie);
        },

        _validarNomeDaEspecie (nomeDaEspecie) {
            const oRegex = new RegExp("^[A-Za-z]+( [A-Za-z]+)*$");
            const nomeEhValido = oRegex.test(nomeDaEspecie);
            const erroInputNomeDaEspecieInvalido = this._oResourceBundle.getText("oNomeDaEspecieNaoPodeConterNumerosOuCaracteresEspeciais");
            const erroCampoNomeDaEspecieVazio = this._oResourceBundle.getText("oCampoNomeDaEspecieNaoPodeFicarVazio");
            const erroInputNomeDaEspecieTamanhoMinimo = this._oResourceBundle.getText("oNomeDaEspecieDeveTerAoMenos5Caracteres");
            
            if (nomeDaEspecie == "") {
                this._definirStatusDeErro(NOME_CAMPO_NOME_ESPECIE, erroCampoNomeDaEspecieVazio);
            } else if (!nomeEhValido) {
                this._definirStatusDeErro(NOME_CAMPO_NOME_ESPECIE, erroInputNomeDaEspecieInvalido);
                MENSAGENS_DE_ERRO.push(erroInputNomeDaEspecieInvalido);
            } else if (nomeDaEspecie.length < 5) {
                this._definirStatusDeErro(NOME_CAMPO_NOME_ESPECIE, erroInputNomeDaEspecieTamanhoMinimo);
                MENSAGENS_DE_ERRO.push(erroInputNomeDaEspecieTamanhoMinimo);
            }
            else {
                this._definirStatusDeSucesso(NOME_CAMPO_NOME_ESPECIE);
            }
        },

        validarPrecoDeVacinacaoPelaView(preco) {
            this._validarPrecoDeVacinacao(preco)
        },

        _validarPrecoDeVacinacao (preco) {
            const precoMinimo = 10.00;
            const precoFormatado = this._formatarPreco(preco);
            const oRegex = new RegExp("^(\\d+)(?:[\\.|,](\\d{1,2}))?$");
            const precoDigitadoEhValido = oRegex.test(precoFormatado);
            const erroInputPrecoDaVacinacaoInvalido = this._oResourceBundle.getText("oPrecoDaVacinacaoPrecisaEstarEmUmFormatoValido");
            const erroInputPrecoDaVacinacaoPrecoMinimo = this._oResourceBundle.getText("oPrecoDaVacinacaoDeveSerMaiorDoQue10");

            if (precoFormatado < precoMinimo) {
                this._definirStatusDeErro(NOME_CAMPO_PRECO_VACINACAO, erroInputPrecoDaVacinacaoPrecoMinimo);
                MENSAGENS_DE_ERRO.push(erroInputPrecoDaVacinacaoPrecoMinimo);
            } else if (!precoDigitadoEhValido) {
                this._definirStatusDeErro(NOME_CAMPO_PRECO_VACINACAO, erroInputPrecoDaVacinacaoInvalido);
                MENSAGENS_DE_ERRO.push(erroInputPrecoDaVacinacaoInvalido);
            } else {
                this._definirStatusDeSucesso(NOME_CAMPO_PRECO_VACINACAO);
            }
        },

        validarDataDeResgatePelaView(data) {
            this._validarDataDeResgate(data)
        },

        _validarDataDeResgate(data) {
            data = new Date(data);
            const dataAtual = new Date();
            const dataMinima = new Date(1830, 0, 1);
            const erroInputDataDoResgateInvalido = this._oResourceBundle.getText("aDataDeResgatePrecisaEstarEmUmFormatoValido");
            const erroInputDataDeResgateNaoDeveSerFuturo = this._oResourceBundle.getText("aDataDeResgateNaoPodeSerUmaDataNoFuturo");
            const erroInputDataDeResgateDeveSerApos1830 = this._oResourceBundle.getText("aDataDeResgateDeveSerApos1830");

            if (data > dataAtual) {
                this._definirStatusDeErro(NOME_CAMPO_DATA_RESGATE, erroInputDataDeResgateNaoDeveSerFuturo);
                MENSAGENS_DE_ERRO.push(erroInputDataDeResgateNaoDeveSerFuturo);
            } else if (data < dataMinima) {
                this._definirStatusDeErro(NOME_CAMPO_DATA_RESGATE, erroInputDataDeResgateDeveSerApos1830);
                MENSAGENS_DE_ERRO.push(erroInputDataDeResgateDeveSerApos1830);
            } else if (!data) {
                this._definirStatusDeErro(NOME_CAMPO_DATA_RESGATE, erroInputDataDoResgateInvalido);
                MENSAGENS_DE_ERRO.push(erroInputDataDoResgateInvalido);
            } else {
                this._definirStatusDeSucesso(NOME_CAMPO_DATA_RESGATE);
            }
        },

        _formatarPreco(preco) {
            const ponto = ".";
            const vazio = "";
            const virgula = ",";

            let precoSemPonto = String(preco).replaceAll(ponto, vazio);
            const precoFormatado = precoSemPonto.replace(virgula, ponto);

            return precoFormatado;
        },

        validacaoDeTodosOsCampos(dadosDoAnimal) {
            MENSAGENS_DE_ERRO = [];

            let nomeDoAnimalDigitado = dadosDoAnimal.nomeDoAnimal;
            let nomeDaEspecieDigitada = dadosDoAnimal.nomeDaEspecie;
            let precoDaVacinacaoDigitado = dadosDoAnimal.custoDeVacinacao;
            let dataDeResgateDigitada = dadosDoAnimal.dataDoResgate;
            
            this._validarSeCamposEstaoPreenchidos(dadosDoAnimal);
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
 
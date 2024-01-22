sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "../validation/ValidadorDeAnimalSilvestre",
    "../common/HttpRequest",
    "../common/HttpRequestAnimalSilvestre"
], (BaseController, JSONModel, ValidadorDeAnimalSilvestre, HttpRequest, HttpRequestAnimalSilvestre) => {
    "use strict";

    const NOME_MODELO_ANIMAL_SILVESTRE = "animalSilvestre";
    const ROTA_CADASTRO = "Cadastro/";
    let _validador = null;
    let edicaoAtivada = false;

    return BaseController.extend("ui5.controledeanimaissilvestres.controller.Cadastro", {

        onInit() {
            this.obterRoteadorEManipularRota(this.NOME_ROTA_CADASTRO, this._aoCoincidirRotaDoCadastro);
            this.obterRoteadorEManipularRota(this.NOME_ROTA_EDICAO, this._aoCoincidirRotaDaEdicao);
        },

        _aoCoincidirRotaComum() {
            _validador = this._criarValidadorDeAnimalSilvestre();
            this._inicializarModeloAnimalSilvestre();
            this._definirItensDaCombobox();
            this._limparStatusDeErro();
        },

        _aoCoincidirRotaDoCadastro() {
            this._aoCoincidirRotaComum();
        },

        _aoCoincidirRotaDaEdicao() {
            edicaoAtivada = true;
            this._aoCoincidirRotaComum();
            this._carregarAnimalSilvestre();
        },

        aoClicarEmVoltar() {
            this._navegarParaListaOuDetalhes();
        },

        _navegarParaListaOuDetalhes() {
            if (edicaoAtivada == false) {
                this.navegarPara(this.NOME_ROTA_LISTA);
            } else {
                const id = {id: this.obterIdAPartirDaRota(ROTA_CADASTRO)};
                this.navegarPara(this.NOME_ROTA_DETALHES, id);
            }
        },

        aoClicarEmCancelar() {
            this.navegarPara(this.NOME_ROTA_LISTA);
        },

        _obterDadosDoAnimal() {
            const dadosDeCadastro = this._modeloAnimalSilvestre().getData();
            dadosDeCadastro.emExtincao = dadosDeCadastro.emExtincao == undefined ? false : true;
            dadosDeCadastro.classe = dadosDeCadastro.classe == undefined || NaN ? this.ZERO : Number(dadosDeCadastro.classe);
            dadosDeCadastro.custoDeVacinacao = dadosDeCadastro.custoDeVacinacao == undefined ? this.ZERO : (dadosDeCadastro.custoDeVacinacao);
            
            return dadosDeCadastro;
        },

        _modeloCombobox(dados) {
            const nomeAliasLista = "classes";
            return this.modelo(nomeAliasLista, dados);
        },

        aoClicarEmSalvar() {
            if (!edicaoAtivada) {
                this._salvarAnimal();
            } else {
                this._atualizarAnimal();
            }
        },

        _definirItensDaCombobox() {

            const enumClasseAnfibio = 0;
            const enumClasseAve = 1;
            const enumClasseMamifero = 2;
            const enumClassePeixe = 3;
            const enumClasseReptil = 4;

            const enumClasseAnfibioNome = "Anfíbio";
            const enumClasseAveNome = "Ave";
            const enumClasseMamiferoNome = "Mamífero";
            const enumClassePeixeNome = "Peixe";
            const enumClasseReptilNome = "Réptil";

            const oItems = [{ Nome : enumClasseAnfibioNome, Chave : enumClasseAnfibio}, 
                            {Nome : enumClasseAveNome, Chave : enumClasseAve}, 
                            {Nome : enumClasseMamiferoNome, Chave : enumClasseMamifero}, 
                            {Nome : enumClassePeixeNome, Chave : enumClassePeixe}, 
                            {Nome : enumClasseReptilNome, Chave : enumClasseReptil}];
            const oLista = new JSONModel(oItems);
            this._modeloCombobox(oLista);
        },

        _inicializarModeloAnimalSilvestre() {
            let oModelo = new JSONModel({});
            this._modeloAnimalSilvestre(oModelo);
        },

        _modeloAnimalSilvestre(dados) {
            return this.modelo(NOME_MODELO_ANIMAL_SILVESTRE, dados);
        },

        aoAlterarData(evento) { 
            const nomePropriedadeValorDaData = "dateValue";
            const data = this.obterFonteDoEvento(evento).getProperty(nomePropriedadeValorDaData);
            _validador.validarDataDeResgatePelaView(data);
        },

        aoAlterarPreco(evento) {
            const preco = this.obterFonteDoEvento(evento).getProperty(this.NOME_PROPRIEDADE_VALUE);
            this._definirValorZeroSePrecoForVazio(preco);
            _validador.validarPrecoDeVacinacaoPelaView(preco);
        },

        _definirValorZeroSePrecoForVazio (preco) {
            if (!preco) {
                const propriedadeDataDoModelo = "/custoDeVacinacao";
                this._modeloAnimalSilvestre.setProperty(propriedadeDataDoModelo, ZERO)
            }
        },

        aoAlterarNomeDoAnimal(evento) {
            const nomeDoAnimal = this.obterFonteDoEvento(evento).getProperty(this.NOME_PROPRIEDADE_VALUE);
            _validador.validarNomeDoAnimalPelaView(nomeDoAnimal);
        },

        aoAlterarNomeDaEspecie(evento) {
            const nomeDaEspecie = this.obterFonteDoEvento(evento).getProperty(this.NOME_PROPRIEDADE_VALUE);
            _validador.validarNomeDaEspeciePelaView(nomeDaEspecie);
        },

        _limparStatusDeErro() {
            const campoNomeDoAnimal = "inputNomeDoAnimal";
            const campoNomeDaEspecie = "inputNomeDaEspecie";
            const campoPrecoDaVacinacao = "inputPrecoDaVacinacao";
            const campoClasseDeAnimal = "inputClasseDeAnimal";
            const campoDataDoResgate = "inputDataDoResgate";

            this._redefinirPropriedadesDoStatus(campoNomeDoAnimal);
            this._redefinirPropriedadesDoStatus(campoNomeDaEspecie);
            this._redefinirPropriedadesDoStatus(campoPrecoDaVacinacao);
            this._redefinirPropriedadesDoStatus(campoClasseDeAnimal);
            this._redefinirPropriedadesDoStatus(campoDataDoResgate);
        },

        _redefinirPropriedadesDoStatus(id) {
            const stringEstadoDoCampo = "valueState";
            const stringTextoDeEstadoDoCampo = "valueStateText";
            const oView = this.obterView();

            oView.byId(id).resetProperty(stringEstadoDoCampo);
            oView.byId(id).resetProperty(stringTextoDeEstadoDoCampo);
        },

        async _salvarAnimal() {
            let cadastro = this._obterDadosDoAnimal();
            const cabecalhoDeErroDoi18n = "erroAoSalvar";
            const corpoDoErroDoi18n = "naoFoiPossivelEnviarOCadastro";
            let idDoNovoCadastro = null;
            
            try {
                _validador.validacaoDeTodosOsCampos(cadastro);
                idDoNovoCadastro = {id: await HttpRequestAnimalSilvestre.executarCriarAnimal(cadastro)};
                this.navegarPara(this.NOME_ROTA_DETALHES, idDoNovoCadastro);
            }
            catch (erro) {
                this.mostrarMensagemDeErro({textoDoCorpoDoErroi18n: corpoDoErroDoi18n, 
                                            textoDoCabecalhoDoErroi18n: cabecalhoDeErroDoi18n, 
                                            detalhesDoErro: erro});
            }
        },

        _criarValidadorDeAnimalSilvestre() {
            let oView = this.obterView();
            let oResourceBundle = this.obterResourceBundle();
            return new ValidadorDeAnimalSilvestre(oView, oResourceBundle);
        },

        async _carregarAnimalSilvestre() {
            const id = this.obterIdAPartirDaRota(ROTA_CADASTRO);
            let retorno = await this._obterAnimalPeloId(id);
            this._modeloAnimalSilvestre(new JSONModel(retorno));
        },

        async _obterAnimalPeloId(id) {
            return await HttpRequestAnimalSilvestre.executarObterPorId(id);
        },

        async _atualizarAnimal() {
            let dadosDoAnimal = this._obterDadosDoAnimal();
            let id = {id: this.obterIdAPartirDaRota(ROTA_CADASTRO)};
            const cabecalhoDeErroDoi18n = "erroAoSalvarAEdicao";
            const corpoDoErroDoi18n = "naoFoiPossivelSalvarAEdicaoFeita";
            
            try {
                _validador.validacaoDeTodosOsCampos(dadosDoAnimal);
                await this._executarAtualizacao(dadosDoAnimal);
                this.navegarPara(this.NOME_ROTA_DETALHES, id);
            }
            catch (erro) {
                this.mostrarMensagemDeErro({textoDoCorpoDoErroi18n: corpoDoErroDoi18n, 
                                            textoDoCabecalhoDoErroi18n: cabecalhoDeErroDoi18n, 
                                            detalhesDoErro: erro});
            }
        },

        async _executarAtualizacao(dadosDoAnimal) {
            await HttpRequestAnimalSilvestre.executarSalvarAnimal(dadosDoAnimal);
        }
    });
});
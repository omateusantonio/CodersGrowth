sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../validation/ValidadorDeAnimalSilvestre",
    "sap/m/MessageBox",
    "../common/HttpRequest"
], (Controller, JSONModel, ValidadorDeAnimalSilvestre, MessageBox, HttpRequest) => {
    "use strict";

    const NOME_ROTA_CADASTRO = "cadastro";
    const NOME_ROTA_LISTA = "lista";
    const NOME_MODELO_ANIMAL_SILVESTRE = "animalSilvestre";
    const NOME_MODELO_I18N = "i18n";
    const NOME_ROTA_EDICAO = "edicao";
    const NOME_PROPRIEDADE_VALUE = "value";
    const ZERO = 0;
    const MENSAGEM_DE_ERRO = "<strong>Ocorreu um erro:</strong> <br>";
    let _validador = null;
    let edicaoAtivada = false;

    return Controller.extend("ui5.controledeanimaissilvestres.controller.Cadastro", {

        onInit() {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute(NOME_ROTA_CADASTRO).attachPatternMatched(this._aoCoincidirRotaDoCadastro, this);
            oRouter.getRoute(NOME_ROTA_EDICAO).attachPatternMatched(this._aoCoincidirRotaDaEdicao, this);
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
            if (!edicaoAtivada) {
                this._navegarParaLista();
            } else {
                const id = this._obterIdDaRota();
                this._navegarParaDetalhes(id);
            }
        },

        aoClicarEmCancelar() {
            this._navegarParaLista();
        },

        _obterDadosDoAnimal() {
            const dadosDeCadastro = this._modeloAnimalSilvestre().getData();
            dadosDeCadastro.emExtincao = dadosDeCadastro.emExtincao == undefined ? false : true;
            dadosDeCadastro.classe = Number(dadosDeCadastro.classe);
            dadosDeCadastro.custoDeVacinacao = dadosDeCadastro.custoDeVacinacao == undefined ? ZERO : (dadosDeCadastro.custoDeVacinacao);
            
            return dadosDeCadastro;
        },

        aoClicarEmSalvar() {
            if (!edicaoAtivada) {
                this._salvarAnimal();
            } else {
                this._atualizarAnimal();
            }
        },

        _definirItensDaCombobox() {
            const nomeAliasLista = "classes";

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
            const oView = this.getView();

            oView.setModel(oLista, nomeAliasLista);
        },

        async _executarSalvarAnimal(dados) {
            let resposta = null;
            let formulario = null;
            let idDoCadastro = null;

            resposta = await HttpRequest.criar(dados);

            if (!resposta.ok) {
                const textoDoBackEnd = await resposta.text();
                throw (MENSAGEM_DE_ERRO + textoDoBackEnd);
            }

            formulario = await resposta.json();
            idDoCadastro =  await formulario.id;

            return idDoCadastro;
        },

        _inicializarModeloAnimalSilvestre() {
            let oModelo = new JSONModel({});
            this._modeloAnimalSilvestre(oModelo);
        },

        _navegarParaDetalhes(id) {
            const nomeRotaDetalhes = "detalhes"
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo(nomeRotaDetalhes, {
                id : id
            });
        },

        aoAlterarData(oEvento) { 
            const nomePropriedadeValorDaData = "dateValue";
            const data = oEvento.getSource().getProperty(nomePropriedadeValorDaData);
            _validador.validarDataDeResgatePelaView(data);
        },

        aoAlterarPreco(oEvento) {
            const preco = oEvento.getSource().getProperty(NOME_PROPRIEDADE_VALUE);
            this._definirValorZeroSePrecoForVazio(preco);
            _validador.validarPrecoDeVacinacaoPelaView(preco);
        },

        _definirValorZeroSePrecoForVazio (preco) {
            if (!preco) {
                const propriedadeDataDoModelo = "/custoDeVacinacao";
                this._modeloAnimalSilvestre().setProperty(propriedadeDataDoModelo, ZERO)
            }
        },

        aoAlterarNomeDoAnimal(oEvento) {
            const nomeDoAnimal = oEvento.getSource().getProperty(NOME_PROPRIEDADE_VALUE);
            _validador.validarNomeDoAnimalPelaView(nomeDoAnimal);
        },

        aoAlterarNomeDaEspecie(oEvento) {
            const nomeDaEspecie = oEvento.getSource().getProperty(NOME_PROPRIEDADE_VALUE);
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
            const oView = this.getView();

            oView.byId(id).resetProperty(stringEstadoDoCampo);
            oView.byId(id).resetProperty(stringTextoDeEstadoDoCampo);
        },

        async _salvarAnimal() {
            let oCadastro = this._obterDadosDoAnimal();
            let oResourceBundle = this.getOwnerComponent().getModel(NOME_MODELO_I18N).getResourceBundle();
            const cabecalhoDeErroDoi18n = "erroAoSalvar";
            const corpoDoErroDoi18n = "naoFoiPossivelEnviarOCadastro";
            const erroAoSalvar = oResourceBundle.getText(corpoDoErroDoi18n);
            const mensagemDeErroCabecalho = oResourceBundle.getText(cabecalhoDeErroDoi18n);
            let idDoNovoCadastro = null;
            
            try {
                _validador.validacaoDeTodosOsCampos(oCadastro);
                idDoNovoCadastro = await this._executarSalvarAnimal(oCadastro);
                this._navegarParaDetalhes(idDoNovoCadastro);
            }
            catch (erro) {
                MessageBox.error(erroAoSalvar, {
                    title: mensagemDeErroCabecalho,
                    details: erro
                })
            }
        },

        _navegarParaLista() {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo(NOME_ROTA_LISTA, {});
        },

        _criarValidadorDeAnimalSilvestre() {
            let oView = this.getView();
            let oResourceBundle = this.getOwnerComponent().getModel(NOME_MODELO_I18N).getResourceBundle();
            return new ValidadorDeAnimalSilvestre(oView, oResourceBundle);
        },

        async _carregarAnimalSilvestre() {
            const id = this._obterIdDaRota();
            let retorno = await this._obterAnimalPeloId(id);
            this._modeloAnimalSilvestre(new JSONModel(retorno));
        },

        _modeloAnimalSilvestre(dados) {
            if (dados) {
                this.getView().setModel(dados, NOME_MODELO_ANIMAL_SILVESTRE);
                return;
            }
            return this.getView().getModel(NOME_MODELO_ANIMAL_SILVESTRE);
        },

        _obterAnimalPeloId(id) {
            const url = `/api/AnimalSilvestre/${id}`;

            return fetch(url)
            .then(response => response.json())
            .then(response => {return response});
        },

        async _atualizarAnimal() {
            let dadosDoAnimal = this._obterDadosDoAnimal();
            let id = this._obterIdDaRota();
            let oResourceBundle = this.getOwnerComponent().getModel(NOME_MODELO_I18N).getResourceBundle();
            const cabecalhoDeErroDoi18n = "erroAoSalvarAEdicao";
            const corpoDoErroDoi18n = "naoFoiPossivelSalvarAEdicaoFeita";
            const erroAoSalvar = oResourceBundle.getText(corpoDoErroDoi18n);
            const mensagemDeErroCabecalho = oResourceBundle.getText(cabecalhoDeErroDoi18n);
            
            try {
                _validador.validacaoDeTodosOsCampos(dadosDoAnimal);
                await this._executarAtualizacao(dadosDoAnimal);
                this._navegarParaDetalhes(id);
            }
            catch (erro) {
                MessageBox.error(erroAoSalvar, {
                    title: mensagemDeErroCabecalho,
                    details: erro
                })
            }
        },

        async _executarAtualizacao(dadosDoAnimal) {
            await HttpRequest.atualizar(dadosDoAnimal).then(async (response) => {
                    if (!response.ok) {
                        const textoDoBackEnd = await response.text();
                        throw (MENSAGEM_DE_ERRO + textoDoBackEnd);
                    }
            });
        },

        _obterIdDaRota() {
            const vazio = "";
            const cadastro = "Cadastro/";
            const hash = this.getOwnerComponent().getRouter().getHashChanger().hash;
            const id = hash.replace(cadastro, vazio);

            return id;
        }
    });
});
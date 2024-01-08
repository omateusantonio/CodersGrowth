sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel",
    "../validation/ValidadorDeAnimalSilvestre",
    "sap/m/MessageBox"
], (Controller, History, JSONModel, ValidadorDeAnimalSilvestre, MessageBox) => {
    "use strict";

    const NOME_ROTA_CADASTRO = "cadastro";
    const NOME_ROTA_LISTA = "lista";
    const NOME_ALIAS_MODELO = "animalSilvestre"
    let _validador = null;

    return Controller.extend("ui5.controledeanimaissilvestres.controller.Cadastro", {

        onInit() {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute(NOME_ROTA_CADASTRO).attachPatternMatched(this.aoCoincidirRota, this);
        },

        aoCoincidirRota() {
            let oView = this.getView();
            let oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            _validador = new ValidadorDeAnimalSilvestre(oView, oResourceBundle);
            this._definirModeloDeDados();
            this._definirItensDaCombobox();
            this._resetarEstadoDeValidacaoDosCampos();
        },

        aoClicarEmVoltar() {
            const oHistory = History.getInstance();
            const sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo(NOME_ROTA_LISTA, {});
            }
        },

        aoClicarEmCancelar() {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo(NOME_ROTA_LISTA, {});
        },

        _obterItensPreenchidos() {
            const intZero = 0;
            let oCadastro = this.getView().getModel(NOME_ALIAS_MODELO).getData();
            oCadastro.emExtincao = oCadastro.emExtincao == undefined ? false : true;
            oCadastro.classe = Number(oCadastro.classe);
            oCadastro.custoDeVacinacao = oCadastro.custoDeVacinacao == undefined ? intZero : (oCadastro.custoDeVacinacao)[0];
            
            return oCadastro;
        },

        aoClicarEmSalvar() {
            this._tentarSalvarOCadastro();
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

        _cadastrarNovoAnimal(dados) {
            const url = '/api/AnimalSilvestre';
            const metodoDoFetch = "POST";

            fetch(url, {
                method: metodoDoFetch,
                body: JSON.stringify(dados),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => response.json())
            .then(json => this._redirecionarParaAnimalCriado(json.id))
            .catch(erro => console.error(erro));
        },

        _definirModeloDeDados() {
            let oModelo = new JSONModel({});
            this.getView().setModel(oModelo, NOME_ALIAS_MODELO);
        },

        _redirecionarParaAnimalCriado(id) {
            const nomeRotaDetalhes = "detalhes"
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo(nomeRotaDetalhes, {
                id : id
            });
        },

        aoAlterarCampoData(oEvento) {
            _validador.validarDataDeResgatePelaView(oEvento);
        },

        aoAlterarCampoPreco(oEvento) {
            _validador.validarPrecoDeVacinacaoPelaView(oEvento);
        },

        aoAlterarCampoNomeDoAnimal(oEvento) {
            _validador.validarNomeDoAnimalPelaView(oEvento);
        },

        aoAlterarCampoNomeDaEspecie(oEvento) {
            _validador.validarNomeDaEspeciePelaView(oEvento);
        },

        _resetarEstadoDeValidacaoDosCampos() {
            const stringCampoNomeDoAnimal = "inputNomeDoAnimal";
            const stringCampoNomeDaEspecie = "inputNomeDaEspecie";
            const stringCampoPrecoDaVacinacao = "inputPrecoDaVacinacao";
            const stringCampoClasseDeAnimal = "inputClasseDeAnimal";
            const stringCampoDataDoResgate = "inputDataDoResgate";

            this._redefinirPropriedadesDoStatus(stringCampoNomeDoAnimal);
            this._redefinirPropriedadesDoStatus(stringCampoNomeDaEspecie);
            this._redefinirPropriedadesDoStatus(stringCampoPrecoDaVacinacao);
            this._redefinirPropriedadesDoStatus(stringCampoClasseDeAnimal);
            this._redefinirPropriedadesDoStatus(stringCampoDataDoResgate);
        },

        _redefinirPropriedadesDoStatus(id) {
            const stringEstadoDoCampo = "valueState";
            const stringTextoDeEstadoDoCampo = "valueStateText";
            const oView = this.getView();

            oView.byId(id).resetProperty(stringEstadoDoCampo);
            oView.byId(id).resetProperty(stringTextoDeEstadoDoCampo);
        },

        _tentarSalvarOCadastro() {
            let oCadastro = this._obterItensPreenchidos();
            let oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            const stringMensagemDeErroCorpo = oResourceBundle.getText("corpoDoErro");
            const stringMensagemDeErroCabecalho = oResourceBundle.getText("cabecalhoDoErro");

            try {
                _validador.validacaoDeTodosOsCampos(oCadastro);
                this._cadastrarNovoAnimal(oCadastro);
            }
            catch (erro) {
                MessageBox.error(stringMensagemDeErroCorpo, {
                    title: stringMensagemDeErroCabecalho,
                    id: "messageBoxId2",
                    details: erro
                })
            }
        }
    });
});
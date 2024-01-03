sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel",
    "../validation/ValidadorDeAnimalSilvestre"
], (Controller, History, JSONModel, ValidadorDeAnimalSilvestre) => {
    "use strict";

    const NOME_ROTA_CADASTRO = "cadastro";
    const NOME_ROTA_LISTA = "lista";
    const NOME_ALIAS_MODELO = "animalSilvestre"
    let _validador = new ValidadorDeAnimalSilvestre();

    return Controller.extend("ui5.controledeanimaissilvestres.controller.Cadastro", {

        onInit() {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute(NOME_ROTA_CADASTRO).attachPatternMatched(this.aoCoincidirRota, this);
        },

        aoCoincidirRota() {
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
            let oCadastro = this._obterItensPreenchidos();
            let oView = this.getView();
            _validador.validacaoCampoEstaPreenchido(oCadastro, oView);
            this._cadastrarNovoAnimal(oCadastro);
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
            let oView = this.getView();
            _validador.validacaoDataDeResgate(oEvento, oView);
        },

        aoAlterarCampoPreco(oEvento) {
            let oView = this.getView();
            _validador.validacaoPrecoDeVacinacao(oEvento, oView);
        },

        _resetarEstadoDeValidacaoDosCampos() {
            const stringEstadoDoCampo = "valueState";
            const stringTextoDeEstadoDoCampo = "valueStateText";
            const stringCampoNomeDoAnimal = "inputNomeDoAnimal";
            const stringCampoNomeDaEspecie = "inputNomeDaEspecie";
            const stringCampoPrecoDaVacinacao = "inputPrecoDaVacinacao";
            const stringCampoClasseDeAnimal = "inputClasseDeAnimal";
            const stringCampoDataDoResgate = "inputDataDoResgate";
            
            const oView = this.getView();

            oView.byId(stringCampoNomeDoAnimal).resetProperty(stringEstadoDoCampo);
            oView.byId(stringCampoNomeDoAnimal).resetProperty(stringTextoDeEstadoDoCampo);

            oView.byId(stringCampoNomeDaEspecie).resetProperty(stringEstadoDoCampo);
            oView.byId(stringCampoNomeDaEspecie).resetProperty(stringTextoDeEstadoDoCampo);

            oView.byId(stringCampoPrecoDaVacinacao).resetProperty(stringEstadoDoCampo);
            oView.byId(stringCampoPrecoDaVacinacao).resetProperty(stringTextoDeEstadoDoCampo);

            oView.byId(stringCampoClasseDeAnimal).resetProperty(stringEstadoDoCampo);
            oView.byId(stringCampoClasseDeAnimal).resetProperty(stringTextoDeEstadoDoCampo);

            oView.byId(stringCampoDataDoResgate).resetProperty(stringEstadoDoCampo);
            oView.byId(stringCampoDataDoResgate).resetProperty(stringTextoDeEstadoDoCampo);

            
        }

    });
});
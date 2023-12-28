sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/format/DateFormat",
    "sap/ui/core/date/UI5Date"
], (Controller, History, JSONModel, DateFormat, UI5Date) => {
    "use strict";

    const NOME_ROTA_CADASTRO = "cadastro";
    const NOME_ROTA_LISTA = "lista";
    const NOME_ALIAS_MODELO = "animalSilvestre"

    return Controller.extend("ui5.controledeanimaissilvestres.controller.Cadastro", {
        
        onInit() {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute(NOME_ROTA_CADASTRO).attachPatternMatched(this.aoCoincidirRota, this);
        },

        aoCoincidirRota() {
            this._definirModeloDeDados();
            this._definirItensDaCombobox();
        },

        aoClicarEmVoltar() {
            const oHistory = History.getInstance();
            const sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo(NOME_ROTA_LISTA, {}, true);
            }
        },

        aoClicarEmCancelar() {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo(NOME_ROTA_LISTA, {}, true);
        },

        _obterItensPreenchidos() {
            var oCadastro = this.getView().getModel(NOME_ALIAS_MODELO).getData();
            oCadastro.emExtincao = oCadastro.emExtincao == undefined ? false : true;
            oCadastro.classe = Number(oCadastro.classe);
            
            return oCadastro;
        },

        aoClicarEmSalvar() {
            var oCadastro = this._obterItensPreenchidos();
            this._converterDataParaFormatoDeBanco(oCadastro);
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

        _converterDataParaFormatoDeBanco(oCadastro) {
            var sDataDoResgate = UI5Date.getInstance().toISOString(oCadastro.dataDoResgate);
            
            if (sDataDoResgate) {
                var oFormatoDeData = DateFormat.getDateInstance({
                    pattern: "yyyy-MM-ddTHH:mm:ss"
                });

                var oData = new Date(sDataDoResgate);

                oCadastro.dataDoResgate = oFormatoDeData.format(oData);
                return oCadastro;
            }
            
        },

        _cadastrarNovoAnimal(dados) {
            fetch('/api/AnimalSilvestre', {
                method: "POST",
                body: JSON.stringify(dados),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => response.json())
            .then(json => this._redirecionarParaAnimalCriado(Number(json.id)))
            .catch(erro => console.error(erro));
        },

        _definirModeloDeDados() {
            var oModelo = new JSONModel({});
            this.getView().setModel(oModelo, NOME_ALIAS_MODELO);
        },

        _redirecionarParaAnimalCriado(id) {
            const nomeRotaDetalhes = "detalhes"
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo(nomeRotaDetalhes, {
                id : id
            });
        }
    });
});
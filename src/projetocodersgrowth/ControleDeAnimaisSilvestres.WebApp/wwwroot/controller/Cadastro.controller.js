sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/format/DateFormat",
    "sap/ui/core/date/UI5Date"
], (Controller, History, JSONModel, DateFormat, UI5Date) => {
    "use strict";

    return Controller.extend("ui5.controledeanimaissilvestres.controller.Cadastro", {
        
        onInit() {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("cadastro").attachPatternMatched(this.aoCoincidirRota, this);
        },

        aoCoincidirRota() {
            this.definirModeloDeDados();
            this.definirItensDaCombobox();
        },

        aoClicarEmVoltar() {
            const oHistory = History.getInstance();
            const sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("lista", {}, true);
            }
        },

        aoClicarEmCancelar() {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("lista", {}, true);
        },

        obterItensPreenchidos() {
            const oCadastro = this.getView().getModel("cadastro").getData();

            return oCadastro;
        },

        aoClicarEmSalvar() {
            var oCadastro = this.obterItensPreenchidos();
            this.converterDataParaFormatoDeBanco(oCadastro);
            this.converterNomeParaIndiceDoEnum(oCadastro);
            this.cadastrarNovoAnimal(oCadastro);
        },

        definirItensDaCombobox() {
            const oItems = {listaDeClasses : 
                                [{ Classe : "Anfíbio", Chave : 0}, 
                                {Classe : "Ave", Chave : 1}, 
                                {Classe : "Mamífero", Chave : 2}, 
                                {Classe : "Peixe", Chave : 3}, 
                                {Classe : "Réptil", Chave : 4}] };
            const oLista = new JSONModel(oItems);
            const oCombobox = this.getView().byId("inputClasseDeAnimal");

            oCombobox.setModel(oLista);
        },

        converterDataParaFormatoDeBanco(oCadastro) {
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

        cadastrarNovoAnimal(dados) {
            fetch('/api/AnimalSilvestre', {
                method: "POST",
                body: JSON.stringify(dados),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => response.json())
            .then(json => this.redirecionarParaAnimalCriado(Number(json.id)))
            .catch(erro => console.error(erro));
        },

        definirModeloDeDados() {
            var oModelo = new JSONModel({});
            this.getView().setModel(oModelo, "cadastro");
        },

        redirecionarParaAnimalCriado(id) {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("detalhes", {
                idDoAnimalDetalhado : id
            });
        }
    });
});
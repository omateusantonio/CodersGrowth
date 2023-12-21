sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel"
], (Controller, History, JSONModel) => {
    "use strict";

    return Controller.extend("ui5.controledeanimaissilvestres.controller.Cadastro", {
        
        onInit() {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("cadastro").attachPatternMatched(this.aoCoincidirRota, this);
        },

        aoCoincidirRota() {
            const sheetNames = {listaDeClasses : [{ Classe : "Anfíbio"}, {Classe : "Ave"}, {Classe : "Mamífero"}, {Classe : "Peixe"}, {Classe : "Réptil"}] };
            const sheets = new JSONModel(sheetNames);
            const comboBox = this.getView().byId("inputClasseDeAnimal");

            comboBox.setModel(sheets);
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

        aoClicarEmCancelarCadastro() {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("lista", {}, true);
        }
    });
});
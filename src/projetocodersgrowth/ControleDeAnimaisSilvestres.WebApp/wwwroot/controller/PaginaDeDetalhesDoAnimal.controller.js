sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("ui5.controledeanimaissilvestres.controller.PaginaDeDetalhesDoAnimal", {
        onInit() {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("paginaDeDetalhesDoAnimal").attachPatternMatched(this.aoCoincidirRota, this);
        },

        aoCoincidirRota(oEvent)  {
            const id = oEvent.getParameter("arguments").idDoAnimalDetalhado;
            this.obterPorId(id);
        },

        obterPorId(id) {
            fetch(`/api/AnimalSilvestre/${id}`)
            .then(response => response.json())
            .then(response => this.getView().setModel(new JSONModel(response), "animais"))
            .catch(e => console.error(e));
        }
    });
});
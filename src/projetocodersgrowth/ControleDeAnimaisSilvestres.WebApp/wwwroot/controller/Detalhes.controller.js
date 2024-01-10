sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/History",
    "../model/FormatterAnimal"
], (Controller, JSONModel, History, FormatterAnimal) => {
    "use strict";

    return Controller.extend("ui5.controledeanimaissilvestres.controller.Detalhes", {
        formatterAnimal: FormatterAnimal,
        
        onInit() {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("detalhes").attachPatternMatched(this.aoCoincidirRota, this);
        },

        aoCoincidirRota(oEvent)  {
            const id = oEvent.getParameter("arguments").id;
            this.definirAnimalPeloId(id);
        },

        definirAnimalPeloId(id) {
            fetch(`/api/AnimalSilvestre/${id}`)
            .then(response => response.json())
            .then(response => this.getView().setModel(new JSONModel(response), "animal"))
            .catch(e => console.error(e));
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

        aoClicarEmEditar() {
            let searchParams = new URLSearchParams(window.location.search);
            let param1 = searchParams.get("param1");
            this._navegarParaCadastroComId()
        },

        _navegarParaCadastroComId(id) {
            const nomeRotaCadastroComId = "cadastroComId"
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo(nomeRotaCadastroComId, {
                id : id
            });
        }
    });
});
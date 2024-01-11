sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/History",
    "../model/FormatterAnimal"
], (Controller, JSONModel, History, FormatterAnimal) => {
    "use strict";

    let ID_ANIMAL_SELECIONADO = null;

    return Controller.extend("ui5.controledeanimaissilvestres.controller.Detalhes", {
        formatterAnimal: FormatterAnimal,
        
        onInit() {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("detalhes").attachPatternMatched(this.aoCoincidirRota, this);
        },

        aoCoincidirRota(oEvent)  {
            const id = oEvent.getParameter("arguments").id;
            this._definirAnimalPeloId(id);
            ID_ANIMAL_SELECIONADO = id;
        },

        _definirAnimalPeloId(id) {
            fetch(`/api/AnimalSilvestre/${id}`)
            .then(response => response.json())
            .then(response => this.getView().setModel(new JSONModel(response), "animal"))
            .catch(erro => console.error(erro));
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
            this._navegarParaEdicaoNoCadastro(ID_ANIMAL_SELECIONADO);
        },

        _navegarParaEdicaoNoCadastro(id) {
            const nomeRotaEdicaoNoCadastro = "edicaoNoCadastro"
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo(nomeRotaEdicaoNoCadastro, {
                id : id
            });
        }
    });
});
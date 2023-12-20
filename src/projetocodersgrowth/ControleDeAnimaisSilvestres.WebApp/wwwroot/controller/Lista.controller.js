sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "../model/FormatterAnimal"
], (Controller, JSONModel, Filter, FilterOperator, FormatterAnimal) => {
	"use strict";

	return Controller.extend("ui5.controledeanimaissilvestres.controller.Lista", {
        formatterAnimal: FormatterAnimal,

		onInit() {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("lista").attachPatternMatched(this.aoCoincidirRota, this);
		},
        
        aoCoincidirRota() {
            const oViewModel = new JSONModel({
                currency: "BRL"
            });
            this.getView().setModel(oViewModel, "view");
            this.obterTodos();
        },

        aoFiltrarAnimais(oEvent) {
            // cria o array do filtro
            const aFilter = [];
            const sQuery = oEvent.getParameter("query");
            if (sQuery) {
                aFilter.push(new Filter("nomeDoAnimal", FilterOperator.Contains, sQuery));
            }

            // binding do filtro
            const oList = this.byId("listaDeAnimais");
            const oBinding = oList.getBinding("items");
            oBinding.filter(aFilter);
        },

        obterTodos() {
            fetch('/api/AnimalSilvestre')
            .then(response => response.json())
            .then(response => this.getView().setModel(new JSONModel(response), "animais"))
            .catch(e => console.error(e));
        },

        aoClicarNoItemDaLista(oEvent) {
            const oItem = oEvent.getSource();
			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("detalhesDoAnimal", {
                idDoAnimalDetalhado: oItem.getBindingContext("animais").getProperty("id")
            });
		}
	});
});
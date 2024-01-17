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
            this.obterTodos();
        },

        aoFiltrarAnimais(evento) {
            const nomeASerFiltrado = evento.getParameter("query");
            this.obterTodos(nomeASerFiltrado);
        },

        obterTodos(nomeASerFiltrado) {
            let url = "/api/AnimalSilvestre";

            if(nomeASerFiltrado) {
                const caminhoDoFiltro = "?animal=";
                url = url + caminhoDoFiltro + nomeASerFiltrado;
            }

            fetch(url)
            .then(response => response.json())
            .then(response => this.getView().setModel(new JSONModel(response), "animais"))
            .catch(erro => console.error(erro));
        },

        aoClicarNoItemDaLista(oEvent) {
            const oItem = oEvent.getSource();
			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("detalhes", {
                id: oItem.getBindingContext("animais").getProperty("id")
            });
		},

        aoClicarEmCadastrar() {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("cadastro", {}, true);
        }
	});
});
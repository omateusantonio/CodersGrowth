sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
    "../model/FormatterAnimal",
    "../common/HttpRequest"
], (Controller, JSONModel, FormatterAnimal, HttpRequest) => {
	"use strict";

	return Controller.extend("ui5.controledeanimaissilvestres.controller.Lista", {
        formatterAnimal: FormatterAnimal,

		onInit() {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("lista").attachPatternMatched(this.aoCoincidirRota, this);
		},
        
        aoCoincidirRota() {
            this._obterListaDeAnimais();
        },

        aoFiltrarAnimais(evento) {
            const nomeParametroQuery = "query";
            const nomeASerFiltrado = evento.getParameter(nomeParametroQuery);
            this._obterListaDeAnimais(nomeASerFiltrado);
        },

        _obterListaDeAnimais(nomeASerFiltrado) {
            HttpRequest.obterTodos(nomeASerFiltrado)
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
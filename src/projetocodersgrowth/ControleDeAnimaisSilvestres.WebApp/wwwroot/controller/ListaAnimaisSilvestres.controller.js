sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "../model/FormatterClasseDeAnimal",
    "../model/FormatterEmExtincao"
], (Controller, JSONModel, Filter, FilterOperator, FormatterClasseDeAnimal, FormatterEmExtincao) => {
	"use strict";

	return Controller.extend("ui5.controledeanimaissilvestres.controller.ListaAnimaisSilvestres", {
        formatterClasseDeAnimal: FormatterClasseDeAnimal,
        formatter: FormatterEmExtincao,

		onInit() {
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
            .catch(e => console.log(e.error));
        }
	});
});
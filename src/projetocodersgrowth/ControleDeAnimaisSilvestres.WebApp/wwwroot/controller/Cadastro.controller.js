sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/format/DateFormat"
], (Controller, History, JSONModel, DateFormat) => {
    "use strict";

    return Controller.extend("ui5.controledeanimaissilvestres.controller.Cadastro", {
        
        onInit() {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("cadastro").attachPatternMatched(this.aoCoincidirRota, this);
        },

        aoCoincidirRota() {
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

        aoClicarEmSalvar() {
            const oView = this.getView();
            const nomeDoAnimal = oView.byId("inputNomeDoAnimal").getValue();
            const nomeDaEspecie = oView.byId("inputNomeDaEspecie").getValue();
            const classeDeAnimal = oView.byId("inputClasseDeAnimal").getValue();
            const precoDaVacinacao = oView.byId("inputPrecoDaVacinacao").getValue();
            // const dataDoResgate = oView.byId("inputDataDoResgate").getValue();
            const dataDoResgate = this.converterDataParaFormatoDeBanco();
            const emExtincao = oView.byId("inputEmExtincao").getProperty("selected");

            console.log(nomeDoAnimal);
            console.log(nomeDaEspecie);
            console.log(classeDeAnimal);
            console.log(precoDaVacinacao);
            console.log(dataDoResgate);
            console.log(emExtincao);

            const sItems = [{nomeDoAnimal : nomeDoAnimal, 
                            nomeDaEspecie : nomeDaEspecie,
                            dataDoResgate : dataDoResgate,
                            classe : classeDeAnimal,
                            emExtincao : emExtincao,
                            custoDeVacinacao : precoDaVacinacao}]

            const oModelJson = new JSONModel(sItems);
            const oDados = oModelJson.getData();

            console.log(oDados);

            this.cadastrarNovoAnimal(oDados);
        },

        definirItensDaCombobox() {
            const sheetNames = {listaDeClasses : [{ Classe : "Anfíbio"}, {Classe : "Ave"}, {Classe : "Mamífero"}, {Classe : "Peixe"}, {Classe : "Réptil"}] };
            const sheets = new JSONModel(sheetNames);
            const comboBox = this.getView().byId("inputClasseDeAnimal");

            comboBox.setModel(sheets);
        },

        converterDataParaFormatoDeBanco() {
            const oView = this.getView();
            const dataDoResgate = oView.byId("inputDataDoResgate").getValue();
            
            if (dataDoResgate) {
                var oDateFormat = DateFormat.getDateInstance({
                    pattern: "yyyy-MM-ddTHH:mm:ss"
                });

                var oDate = new Date(dataDoResgate);

                return oDateFormat.format(oDate);
            }
            
        },

        cadastrarNovoAnimal(dados) {
            fetch('/api/AnimalSilvestre', {
                method: "POST",
                body: JSON.stringify(dados),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(erro => console.error(erro));
        }
    });
});
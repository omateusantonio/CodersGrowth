sap.ui.define([
    "sap/ui/core/ValueState",
    "sap/ui/base/Object"
 ], (ValueState, BaseObject) => {
    "use strict";

 
    return BaseObject.extend("ui5.controledeanimaissilvestres.ValidadorDeAnimalSilvestre", {

        validacaoCampoEstaPreenchido(oCadastro, oView) {
            const stringCampoNomeDoAnimal = "inputNomeDoAnimal";
            const stringCampoNomeDaEspecie = "inputNomeDaEspecie";
            const stringCampoPrecoDaVacinacao = "inputPrecoDaVacinacao";
            const stringCampoClasseDeAnimal = "inputClasseDeAnimal";
            const stringCampoDataDoResgate = "inputDataDoResgate";
            const stringAtributoNomeDoAnimal = "nomeDoAnimal";
            const stringAtributoNomeDaEspecie = "nomeDaEspecie";
            const stringAtributoCustoDaVacinacao = "custoDeVacinacao";
            const stringAtributoClasse = "classe";
            const stringAtributoDataDoResgate = "dataDoResgate";

            if (!oCadastro[stringAtributoNomeDoAnimal]) {
                oView.byId(stringCampoNomeDoAnimal).setValueState(ValueState.Error);
                oView.byId(stringCampoNomeDoAnimal).setValueStateText("O nome do animal não deve ficar vazio");
            } else {
                oView.byId(stringCampoNomeDoAnimal).setValueState(ValueState.Success);
            }

            if (!oCadastro[stringAtributoNomeDaEspecie]) {
                oView.byId(stringCampoNomeDaEspecie).setValueState(ValueState.Error);
                oView.byId(stringCampoNomeDaEspecie).setValueStateText("O nome da espécie não deve ficar vazio");
            } else {
                oView.byId(stringCampoNomeDaEspecie).setValueState(ValueState.Success);
            }

            if (!oCadastro[stringAtributoCustoDaVacinacao]) {
                oView.byId(stringCampoPrecoDaVacinacao).setValueState(ValueState.Error);
                oView.byId(stringCampoPrecoDaVacinacao).setValueStateText("O custo da vacinação não pode ficar vazio");
            } else {
                oView.byId(stringCampoPrecoDaVacinacao).setValueState(ValueState.Success);
            }

            if (!oCadastro[stringAtributoClasse]) {
                oView.byId(stringCampoClasseDeAnimal).setValueState(ValueState.Error);
                oView.byId(stringCampoClasseDeAnimal).setValueStateText("É necessário selecionar a qual classe o animal pertence");
            } else {
                oView.byId(stringCampoClasseDeAnimal).setValueState(ValueState.Success);
            }

            if (!oCadastro[stringAtributoDataDoResgate]) {
                oView.byId(stringCampoDataDoResgate).setValueState(ValueState.Error);
                oView.byId(stringCampoDataDoResgate).setValueStateText("A data de resgate não pode ficar vazia");
            } else {
                oView.byId(stringCampoDataDoResgate).setValueState(ValueState.Success);
            }

        },

        validacaoPrecoDeVacinacao (oEvento, oView) {
            const floatPrecoMinimo = 10.00;
            const stringVirgula = ",";
            const stringPonto = ".";
            const floatInputPreco = oEvento.getSource().getProperty("value").replace(stringVirgula, stringPonto);
            
            if (floatInputPreco < floatPrecoMinimo) {
                oView.byId("inputPrecoDaVacinacao").setValueState(ValueState.Error);
                oView.byId("inputPrecoDaVacinacao").setValueStateText("O preco da vacinação deve ser maior do que R$ 10,00");
            } else {
                oView.byId("inputPrecoDaVacinacao").setValueState(ValueState.Success);
            }
        },

        validacaoDataDeResgate(oEvento, oView) {
            const sInputData = oEvento.getSource().getProperty("dateValue");
            const sDataAtual = new Date();

            if (sInputData > sDataAtual) {
                oView.byId("inputDataDoResgate").setValueState(ValueState.Error);
                oView.byId("inputDataDoResgate").setValueStateText("A data do resgate selecionada não pode ser uma data no futuro");
            } else {
                oView.byId("inputDataDoResgate").setValueState(ValueState.Success);
            }
        }

        
    });
 });
 
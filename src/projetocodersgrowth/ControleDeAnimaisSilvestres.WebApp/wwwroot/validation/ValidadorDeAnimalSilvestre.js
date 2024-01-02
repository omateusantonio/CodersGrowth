sap.ui.define([
    "sap/ui/core/ValueState",
    "sap/ui/base/Object"
 ], (ValueState, BaseObject) => {
    "use strict";
 
    return BaseObject.extend("ui5.controledeanimaissilvestres.ValidadorDeAnimalSilvestre", {

        validacaoCampoEstaPreenchido(oCadastro, oView) {


            if (!oCadastro.nomeDoAnimal) {
                oView.byId("inputNomeDoAnimal").setValueState(ValueState.Error);
                oView.byId("inputNomeDoAnimal").setValueStateText("TESTE");
            }
        },

        validacaoPrecoDeVacinacao (oCadastro, oView) {
            if (oCadastro.custoDeVacinacao < 10) {
                oView.byId("inputPrecoDaVacinacao").setValueState(ValueState.Error);
            }
        },

        validacaoDataDeResgate(oEvento, oView) {
            const sInputData = oEvento.getSource().getProperty("dateValue");
            const sDataAtual = new Date();

            if (sInputData > sDataAtual) {
                oView.byId("inputDataDoResgate").setValueState(ValueState.Error);
            }
        }

        
    });
 });
 
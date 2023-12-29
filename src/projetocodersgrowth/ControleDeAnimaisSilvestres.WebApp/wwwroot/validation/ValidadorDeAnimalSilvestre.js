sap.ui.define([
    "sap/ui/core/message/Message",
    "sap/ui/core/MessageType",
    "sap/ui/core/ValueState",
    "sap/ui/base/Object"
 ], (Message, MessageType, ValueState, BaseObject) => {
    "use strict";
 
    return BaseObject.extend("ui5.controledeanimaissilvestres.ValidadorDeAnimalSilvestre", {
        validacaoCampoEstaPreenchido(oCadastro, oView) {
            console.log(oCadastro);
            if (!oCadastro.nomeDoAnimal) {
                oView.byId("inputNomeDoAnimal").setValueState(ValueState.Error);
            }
        }
    });
 });
 
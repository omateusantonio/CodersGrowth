sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
 ], (Controller, MessageToast) => {
    "use strict";
 
    return Controller.extend("ui5.controledeanimaissilvestres.controller.App", {
     onShowHello() {
         // lê a mensagem do modelo i18n
         const oBundle = this.getView().getModel("i18n").getResourceBundle();
         const sRecipient = this.getView().getModel().getProperty("/recipient/name");
         const sMsg = oBundle.getText("helloMsg", [sRecipient]);
 
         // exibir a mensagem
         MessageToast.show(sMsg);
     }
    });
 });
sap.ui.define([], () => {
    "use strict";

    return {
        nomeDaClasse(sStatus) {
            const oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            switch (sStatus) {
                case 0:
                    return oResourceBundle.getText("Classe0");
                case 1:
                    return oResourceBundle.getText("Classe1");
                case 2:
                    return oResourceBundle.getText("Classe2");
                case 3:
                    return oResourceBundle.getText("Classe3");
                case 4:
                    return oResourceBundle.getText("Classe4");
                default:
                    return sStatus;
            }
        }
    }
})
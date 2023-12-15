sap.ui.define([], () => {
    "use strict";

    return {
        statusExtincao(sStatus) {
            const oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            switch (sStatus) {
                case true:
                    return oResourceBundle.getText("simEmExtincao");
                case false:
                    return oResourceBundle.getText("naoEmExtincao");
                default:
                    return sStatus;
            }
        }
    }
})
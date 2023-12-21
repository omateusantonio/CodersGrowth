sap.ui.define([], () => {
    "use strict";

    return {
        obterNomeDaClasse(sClasse) {
            const oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            switch (sClasse) {
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
                    return sClasse;
            }
        },
        
        obterTraducaoSeEstaEmExtincao(sStatusExtincao) {
            const oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            switch (sStatusExtincao) {
                case true:
                    return oResourceBundle.getText("simEmExtincao");
                case false:
                    return oResourceBundle.getText("naoEmExtincao");
                default:
                    return sStatusExtincao;
            }
        },

        inserirTextoERCifrao(sPreco) {
            const oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            return oResourceBundle.getText("textoPadraoPreco") + sPreco;
        }
    }
})
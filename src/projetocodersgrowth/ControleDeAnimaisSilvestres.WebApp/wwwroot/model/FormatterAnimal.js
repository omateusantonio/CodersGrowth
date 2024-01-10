sap.ui.define([
    "sap/ui/core/format/NumberFormat"
], (NumberFormat) => {
    "use strict";

    return {
        obterNomeDaClasse(sClasse) {
            const oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            switch (sClasse) {
                case 0:
                    return oResourceBundle.getText("anfibio");
                case 1:
                    return oResourceBundle.getText("ave");
                case 2:
                    return oResourceBundle.getText("mamifero");
                case 3:
                    return oResourceBundle.getText("peixe");
                case 4:
                    return oResourceBundle.getText("reptil");
                default:
                    return sClasse;
            }
        },
        
        obterTraducaoSeEstaEmExtincao(sStatusExtincao) {
            const oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            switch (sStatusExtincao) {
                case true:
                    return oResourceBundle.getText("sim");
                case false:
                    return oResourceBundle.getText("nao");
                default:
                    return sStatusExtincao;
            }
        },

        inserirTextoERCifrao(sPreco) {
            const oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            return oResourceBundle.getText("precoDaVacinacaoRCifrao") + sPreco;
        },

        formatarPreco(precoDeVacinacao) {
            const formatoDePreco = NumberFormat.getCurrencyInstance({
                "currencyCode": false,
                "customCurrencies": {
                    "BRL": {
                        "isoCode": "BRL",
                        "decimals": 2
                    }
                }
            });

            return formatoDePreco.format(precoDeVacinacao, "BRL");
        }
    }
})
sap.ui.define([
    "sap/ui/core/format/NumberFormat"
], (NumberFormat) => {
    "use strict";

    return {
        obterNomeDaClasse(classe) {
            const oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            switch (classe) {
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
                    return classe;
            }
        },
        
        obterTraducaoSeEstaEmExtincao(statusDeExtincao) {
            const oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            switch (statusDeExtincao) {
                case true:
                    return oResourceBundle.getText("sim");
                case false:
                    return oResourceBundle.getText("nao");
                default:
                    return statusDeExtincao;
            }
        },

        formatarPreco(precoDeVacinacao) {
            const moedaBRL = "BRL";
            const formatoDePreco = NumberFormat.getCurrencyInstance({
                "currencyCode": false,
                "customCurrencies": {
                    "BRL": {
                        "isoCode": "BRL",
                        "decimals": 2
                    }
                }
            });

            return formatoDePreco.format(precoDeVacinacao, moedaBRL);
        }
    }
})
sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller, MessageBox) => {
	"use strict";

	return Controller.extend("ui5.controledeanimaissilvestres.controller.BaseController", {
        NOME_ROTA_LISTA: "lista",
        NOME_ROTA_CADASTRO: "cadastro",
        NOME_ROTA_DETALHES: "detalhes",
        NOME_ROTA_EDICAO: "edicao",
        NOME_PROPRIEDADE_VALUE: "value",
        ZERO: 0,
        MENSAGEM_DE_ERRO: "<strong>Ocorreu um erro:</strong> <br>",

        obterView() {
            return this.getView();
        },

        obterResourceBundle() {
            const nomeModeloi18n = "i18n";
            return this.getOwnerComponent().getModel(nomeModeloi18n).getResourceBundle();
        },

        obterRoteadorEManipularRota(nomeDaRota, aoCoincidirRota) {
            let metodoASerExecutado = aoCoincidirRota;
            let roteador = this._obterRoteador();
            roteador.getRoute(nomeDaRota).attachPatternMatched(metodoASerExecutado, this);
        },

        obterFonteDoEvento(evento) {
            return evento.getSource();
        },

        navegarParaRota(rotaDestino, id) {
            const roteador = this._obterRoteador();

            if (!id) {
                roteador.navTo(rotaDestino, {});
            } else {
                roteador.navTo(rotaDestino, {
                    id: id
                });
            }
        },

        _obterRoteador() {
            return this.getOwnerComponent().getRouter();
        },

        setarModelo(dados, nomeDoModelo) {
            this.getView().setModel(dados, nomeDoModelo);
        },

        obterModelo(nomeDoModelo) {
            return this.getView().getModel(nomeDoModelo);
        },

        obterIdAPartirDaRota(rota) {
            const vazio = "";
            const hash = this.getOwnerComponent().getRouter().getHashChanger().hash;
            const id = hash.replace(rota, vazio);

            return id;
        },

        obterStringDoi18n(string) {
            const i18n = this.obterResourceBundle();

            return i18n.getText(string);
        },

        dispararMessageBoxDeErro(textoDoCorpoDoErroi18n, textoDoCabecalhoDoErroi18n, detalhesDoErro) {
            const corpoDaMessageBox = this.obterStringDoi18n(textoDoCorpoDoErroi18n);
            const cabecalhoDaMessageBox = this.obterStringDoi18n(textoDoCabecalhoDoErroi18n);

            MessageBox.error(corpoDaMessageBox, {
                title: cabecalhoDaMessageBox,
                details: detalhesDoErro
            })
        }
	});
});
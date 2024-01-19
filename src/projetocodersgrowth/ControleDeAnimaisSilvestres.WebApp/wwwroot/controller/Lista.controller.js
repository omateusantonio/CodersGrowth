sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
    "../model/FormatterAnimal",
    "../common/HttpRequest"
], (BaseController, JSONModel, FormatterAnimal, HttpRequest) => {
	"use strict";

    const NOME_MODELO_ANIMAIS_SILVESTRES = "animais";

	return BaseController.extend("ui5.controledeanimaissilvestres.controller.Lista", {
        formatterAnimal: FormatterAnimal,

		onInit() {
            this.obterRoteadorEManipularRota(this.NOME_ROTA_LISTA, this._aoCoincidirRota);
		},
        
        _aoCoincidirRota() {
            this._obterListaDeAnimais();
        },

        aoFiltrarAnimais(evento) {
            const nomeParametroQuery = "query";
            const nomeASerFiltrado = evento.getParameter(nomeParametroQuery);
            this._executarObterTodos(nomeASerFiltrado);
        },

        async _obterListaDeAnimais() {
            const naoFoiPossivelCarregarAListaDeAnimaisi18n = "erroNaoFoiPossivelCarregarAListaDeAnimais"
            const erroAoCarregarAListai18n = "erroAoCarregarALista";

            try {
                await this._executarObterTodos();
            } catch (erro) {
                this.dispararMessageBoxDeErro(naoFoiPossivelCarregarAListaDeAnimaisi18n, erroAoCarregarAListai18n, erro);
            }
        },

        aoClicarNoItemDaLista(evento) {
            const nomePropriedadeId = "id";
            const id = this.obterFonteDoEvento(evento).getBindingContext(NOME_MODELO_ANIMAIS_SILVESTRES).getProperty(nomePropriedadeId);
            this.navegarParaRota(this.NOME_ROTA_DETALHES, id);
		},

        aoClicarEmCadastrar() {
            this.navegarParaRota(this.NOME_ROTA_CADASTRO);
        },

        async _executarObterTodos(nomeASerFiltrado) {
            let resposta = await HttpRequest.obterTodos(nomeASerFiltrado);

            if (!resposta.ok) {
                const textoDoBackEnd = resposta.text();
                throw (this.MENSAGEM_DE_ERRO + textoDoBackEnd);
            }
            let listaDeAnimais = await resposta.json();
            this.setarModelo(new JSONModel(await listaDeAnimais), NOME_MODELO_ANIMAIS_SILVESTRES);
        }
	});
});
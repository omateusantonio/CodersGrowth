sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
    "../model/FormatterAnimal",
    "../common/HttpRequest",
    "../common/HttpRequestAnimalSilvestre"
], (BaseController, JSONModel, FormatterAnimal, HttpRequest, HttpRequestAnimalSilvestre) => {
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

        async aoFiltrarAnimais(evento) {
            const nomeParametroQuery = "query";
            const nomeASerFiltrado = evento.getParameter(nomeParametroQuery);
            let animaisFiltrados = HttpRequestAnimalSilvestre.executarObterTodos(nomeASerFiltrado);
            this.setarModelo(new JSONModel(await animaisFiltrados), NOME_MODELO_ANIMAIS_SILVESTRES);
        },

        async _obterListaDeAnimais() {
            const naoFoiPossivelCarregarAListaDeAnimaisi18n = "erroNaoFoiPossivelCarregarAListaDeAnimais"
            const erroAoCarregarAListai18n = "erroAoCarregarALista";

            try {
                let listaDeAnimais = await HttpRequestAnimalSilvestre.executarObterTodos();
                this.setarModelo(new JSONModel(await listaDeAnimais), NOME_MODELO_ANIMAIS_SILVESTRES);
            } catch (erro) {
                this.dispararMessageBoxDeErro(naoFoiPossivelCarregarAListaDeAnimaisi18n, erroAoCarregarAListai18n, erro);
            }
        },

        aoClicarNoItemDaLista(evento) {
            const nomePropriedadeId = "id";
            const id = {id: this.obterFonteDoEvento(evento).getBindingContext(NOME_MODELO_ANIMAIS_SILVESTRES).getProperty(nomePropriedadeId)};
            this.navegarPara(this.NOME_ROTA_DETALHES, id);
		},

        aoClicarEmCadastrar() {
            this.navegarPara(this.NOME_ROTA_CADASTRO);
        }
	});
});
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
            const nomeRotaLista = "lista";
            this.obterRoteadorEManipularRota(nomeRotaLista, this._aoCoincidirRota);
		},
        
        _aoCoincidirRota() {
            this._obterListaDeAnimais();
        },

        aoFiltrarAnimais(evento) {
            const nomeParametroQuery = "query";
            const nomeASerFiltrado = evento.getParameter(nomeParametroQuery);
            this._executarObterTodos(nomeASerFiltrado);
        },

        _obterListaDeAnimais() {
            const naoFoiPossivelCarregarAListaDeAnimais18n = "erroNaoFoiPossivelCarregarAListaDeAnimais"
            const naoFoiPossivelExcluirOCadastro = this.obterStringDoi18n(naoFoiPossivelCarregarAListaDeAnimais18n);
            const erroAoCarregarALista18n = "erroAoCarregarALista";
            const erroAoExcluir = this.obterStringDoi18n(erroAoCarregarALista18n);

            try {
                this._executarObterTodos();
            } catch (erro) {
                this.dispararMessageBoxDeErro(naoFoiPossivelExcluirOCadastro, erroAoExcluir, erro);
            }
        },

        aoClicarNoItemDaLista(evento) {
            const nomeRotaDetalhes = "detalhes";
            const nomePropriedadeId = "id";
            const id = this.obterFonteDoEvento(evento).getBindingContext(NOME_MODELO_ANIMAIS_SILVESTRES).getProperty(nomePropriedadeId);
            this.navegarParaRota(nomeRotaDetalhes, id);
		},

        aoClicarEmCadastrar() {
            const nomeRotaCadastro = "cadastro";
            this.navegarParaRota(nomeRotaCadastro);
        },

        async _executarObterTodos(nomeASerFiltrado) {
            const mensagemDeErro =  "<strong>Ocorreu um erro:</strong> <br>";
            let resposta = await HttpRequest.obterTodos(nomeASerFiltrado);

            if (!resposta.ok) {
                const textoDoBackEnd = resposta.text();
                throw (mensagemDeErro + textoDoBackEnd);
            }
            let listaDeAnimais = await resposta.json();
            this.setarModelo(new JSONModel(await listaDeAnimais), NOME_MODELO_ANIMAIS_SILVESTRES);
        }
	});
});
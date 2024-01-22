sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
    "../model/FormatterAnimal",
    "../common/HttpRequestAnimalSilvestre"
], (BaseController, JSONModel, FormatterAnimal, HttpRequestAnimalSilvestre) => {
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

        _modeloAnimaisSilvestres(dados) {
            return this.modelo(NOME_MODELO_ANIMAIS_SILVESTRES, dados);
        },

        async aoFiltrarAnimais(evento) {
            const nomeParametroQuery = "query";
            const nomeASerFiltrado = evento.getParameter(nomeParametroQuery);
            let animaisFiltrados = HttpRequestAnimalSilvestre.executarObterTodos(nomeASerFiltrado);
            this._modeloAnimaisSilvestres(new JSONModel(await animaisFiltrados));
        },

        async _obterListaDeAnimais() {
            const naoFoiPossivelCarregarAListaDeAnimaisi18n = "erroNaoFoiPossivelCarregarAListaDeAnimais"
            const erroAoCarregarAListai18n = "erroAoCarregarALista";

            try {
                let listaDeAnimais = await HttpRequestAnimalSilvestre.executarObterTodos();
                this._modeloAnimaisSilvestres(new JSONModel(await listaDeAnimais));
            } catch (erro) {
                this.mostrarMensagemDeErro({textoDoCorpoDoErroi18n: naoFoiPossivelCarregarAListaDeAnimaisi18n, 
                                            textoDoCabecalhoDoErroi18n: erroAoCarregarAListai18n, 
                                            detalhesDoErro: erro});
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
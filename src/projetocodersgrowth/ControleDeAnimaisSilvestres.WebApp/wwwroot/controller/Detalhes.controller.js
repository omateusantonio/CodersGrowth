sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "../model/FormatterAnimal",
    "sap/m/MessageBox",
    "../common/HttpRequest",
    "../common/HttpRequestAnimalSilvestre"
], (BaseController, JSONModel, FormatterAnimal, MessageBox, HttpRequestAnimalSilvestre) => {
    "use strict";

    let ID_ANIMAL_SELECIONADO = null;

    return BaseController.extend("ui5.controledeanimaissilvestres.controller.Detalhes", {
        formatterAnimal: FormatterAnimal,
        
        onInit() {
            this.obterRoteadorEManipularRota(this.NOME_ROTA_DETALHES, this._aoCoincidirRota);
        },

        _aoCoincidirRota(evento)  {
            const nomeParametroArguments = "arguments";
            const id = evento.getParameter(nomeParametroArguments).id;
            this._definirAnimalPeloId(id);
            ID_ANIMAL_SELECIONADO = {id: id};
        },

        async _definirAnimalPeloId(id) {
            const nomeDoModelo = "animal";
            const naoFoiPossivelCarregarOAnimalSelecionadoi18n = "erroNaoFoiPossivelCarregarOAnimalSelecionado"
            const erroAoCarregarOCadastroDoAnimali18n = "erroAoCarregarOCadastroDoAnimal";

            try {
                let dados = await HttpRequestAnimalSilvestre.executarObterPorId(id);
                this.setarModelo(new JSONModel(await dados), nomeDoModelo);
            } catch (erro) {
                this.dispararMessageBoxDeErro(naoFoiPossivelCarregarOAnimalSelecionadoi18n, erroAoCarregarOCadastroDoAnimali18n, erro);
            }
        },

        aoClicarEmVoltar() {
            this.navegarPara(this.NOME_ROTA_LISTA);
        },

        aoClicarEmEditar() {
            this.navegarPara(this.NOME_ROTA_EDICAO, ID_ANIMAL_SELECIONADO);
        },
        
        aoClicarEmRemover() {
            this._abrirCaixaDeConfirmacaoDaRemocao();
        },

        _abrirCaixaDeConfirmacaoDaRemocao() {
            this.dialogo ??= this.loadFragment({
                name: "ui5.controledeanimaissilvestres.fragment.CaixaDeConfirmacaoRemocao"
            });

            this.dialogo.then((caixaDeDialogo) => caixaDeDialogo.open())
        },

        _fecharCaixaDeDialogo() {
            const idDoFragment = "confirmacaoDaRemocao";
            this.byId(idDoFragment).close();
        },

        aoClicarNoBotaoCancelar() {
            this._fecharCaixaDeDialogo();
        },

        async aoClicarNoBotaoDeExcluir() {
            const rotaDetalhes = "Detalhes/";
            const id = this.obterIdAPartirDaRota(rotaDetalhes);
            const naoFoiPossivelExcluirOCadastroi18n = "erroNaoFoiPossivelExcluirOCadastro"
            const erroAoExcluir18n = "erroAoExcluir";

            try {
                const statusDaRemocao = await HttpRequestAnimalSilvestre.executarRemocao(id);
                if (statusDaRemocao) {
                    this._fecharCaixaDeDialogo();
                    this._exibirMensagemDeExclusaoBemSucedida();
                }
            }
            catch (erro) {
                this._fecharCaixaDeDialogo();
                this.dispararMessageBoxDeErro(naoFoiPossivelExcluirOCadastroi18n, erroAoExcluir18n, erro);
            }
        },

        _exibirMensagemDeExclusaoBemSucedida() {
            const exclusaoFeitaComSucessoi18n = "exclusaoFeitaComSucesso";
            const exclusaoFeitaComSucesso = this.obterStringDoi18n(exclusaoFeitaComSucessoi18n);

            MessageBox.success(exclusaoFeitaComSucesso, {
                actions: [MessageBox.Action.OK],
                onClose: (acao) => {
                    if (acao == MessageBox.Action.OK) {
                        this.navegarPara(this.NOME_ROTA_LISTA);
                    }
                }
            });
        }
    });
});
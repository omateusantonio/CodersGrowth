sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "../model/FormatterAnimal",
    "sap/m/MessageBox",
    "../common/HttpRequest"
], (BaseController, JSONModel, FormatterAnimal, MessageBox, HttpRequest) => {
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
            ID_ANIMAL_SELECIONADO = id;
        },

        async _definirAnimalPeloId(id) {
            const naoFoiPossivelCarregarOAnimalSelecionadoi18n = "erroNaoFoiPossivelCarregarOAnimalSelecionado"
            const erroAoCarregarOCadastroDoAnimali18n = "erroAoCarregarOCadastroDoAnimal";

            try {
                await this._executarObterPorId(id);
            } catch (erro) {
                this.dispararMessageBoxDeErro(naoFoiPossivelCarregarOAnimalSelecionadoi18n, erroAoCarregarOCadastroDoAnimali18n, erro);
            }
        },

        async _executarObterPorId(id) {
            const nomeDoModelo = "animal";
            let resposta = await HttpRequest.obterPorId(id);

            if (!resposta.ok) {
                const textoDoBackEnd = await resposta.text();
                throw (this.MENSAGEM_DE_ERRO + textoDoBackEnd);
            } else {
                let dados = await resposta.json();
                this.setarModelo(new JSONModel(await dados), nomeDoModelo);
            }
        },

        aoClicarEmVoltar() {
            const nomeRotaLista = "lista";
            this.navegarParaRota(this.NOME_ROTA_LISTA);
        },

        aoClicarEmEditar() {
            const nomeRotaEdicao = "edicao"
            this.navegarParaRota(this.NOME_ROTA_EDICAO, ID_ANIMAL_SELECIONADO);
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
            const naoFoiPossivelExcluirOCadastroi18n = "erroNaoFoiPossivelExcluirOCadastro"
            const erroAoExcluir18n = "erroAoExcluir";

            try {
                const statusDaRemocao = await this._executarRemocao();
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
        
        async _executarRemocao() {
            const rotaDetalhes = "Detalhes/";
            const id = this.obterIdAPartirDaRota(rotaDetalhes);

            let resposta = await HttpRequest.remover(id);
            
            if (!resposta.ok) {
                const mensagemDoBackEnd = await resposta.text();
                throw (this.MENSAGEM_DE_ERRO + mensagemDoBackEnd);
            } else {
                return await resposta.ok;
            };
        },

        _exibirMensagemDeExclusaoBemSucedida() {
            const exclusaoFeitaComSucessoi18n = "exclusaoFeitaComSucesso";
            const exclusaoFeitaComSucesso = this.obterStringDoi18n(exclusaoFeitaComSucessoi18n);

            MessageBox.success(exclusaoFeitaComSucesso, {
                actions: [MessageBox.Action.OK],
                onClose: (acao) => {
                    if (acao == MessageBox.Action.OK) {
                        this.navegarParaRota(this.NOME_ROTA_LISTA);
                    }
                }
            });
        }
    });
});
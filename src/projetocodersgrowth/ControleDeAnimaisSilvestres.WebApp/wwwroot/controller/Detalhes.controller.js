sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "../model/FormatterAnimal",
    "sap/m/MessageBox",
    "../common/HttpRequest"
], (BaseController, JSONModel, FormatterAnimal, MessageBox, HttpRequest) => {
    "use strict";

    let ID_ANIMAL_SELECIONADO = null;
    const NOME_ROTA_DETALHES = "detalhes";
    const NOME_ROTA_LISTA = "lista";

    return BaseController.extend("ui5.controledeanimaissilvestres.controller.Detalhes", {
        formatterAnimal: FormatterAnimal,
        
        onInit() {
            this.obterRoteadorEManipularRota(NOME_ROTA_DETALHES, this._aoCoincidirRota);
        },

        _aoCoincidirRota(evento)  {
            const nomeParametroArguments = "arguments";
            const id = evento.getParameter(nomeParametroArguments).id;
            this._definirAnimalPeloId(id);
            ID_ANIMAL_SELECIONADO = id;
        },

        async _definirAnimalPeloId(id) {
            const naoFoiPossivelCarregarOAnimalSelecionado18n = "erroNaoFoiPossivelCarregarOAnimalSelecionado"
            const naoFoiPossivelCarregarOAnimalSelecionado = this.obterStringDoi18n(naoFoiPossivelCarregarOAnimalSelecionado18n);
            const erroAoCarregarOCadastroDoAnimal18n = "erroAoCarregarOCadastroDoAnimal";
            const erroAoCarregarOCadastroDoAnimal = this.obterStringDoi18n(erroAoCarregarOCadastroDoAnimal18n);

            try {
                this._executarObterPorId(id);
            } catch (erro) {
                this.dispararMessageBoxDeErro(naoFoiPossivelCarregarOAnimalSelecionado, erroAoCarregarOCadastroDoAnimal, erro);
            }
        },

        async _executarObterPorId(id) {
            const nomeDoModelo = "animal";
            const mensagemDeErro =  "<strong>Ocorreu um erro:</strong> <br>";
            let resposta = await HttpRequest.obterPorId(id);

            if (!resposta.ok) {
                const textoDoBackEnd = resposta.text();
                throw (mensagemDeErro + textoDoBackEnd);
            }

            let dados = await resposta.json();
            this.setarModelo(new JSONModel(await dados), nomeDoModelo);
        },

        aoClicarEmVoltar() {
            const nomeRotaLista = "lista";
            this.navegarParaRota(nomeRotaLista);
        },

        aoClicarEmEditar() {
            const nomeRotaEdicao = "edicao"
            this.navegarParaRota(nomeRotaEdicao, ID_ANIMAL_SELECIONADO);
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
            const naoFoiPossivelExcluirOCadastro = this.obterStringDoi18n(naoFoiPossivelExcluirOCadastroi18n);
            const erroAoExcluir18n = "erroAoExcluir";
            const erroAoExcluir = this.obterStringDoi18n(erroAoExcluir18n);

            try {
                const statusDaRemocao = await this._executarRemocao();
                if (statusDaRemocao) {
                    this._fecharCaixaDeDialogo();
                    this._exibirMensagemDeExclusaoBemSucedida();
                }
            }
            catch (erro) {
                this._fecharCaixaDeDialogo();
                this.dispararMessageBoxDeErro(naoFoiPossivelExcluirOCadastro, erroAoExcluir, erro);
            }
        },
        
        async _executarRemocao() {
            const rotaDetalhes = "Detalhes/";
            const id = this.obterIdAPartirDaRota(rotaDetalhes);
            const mensagemDeErro = "<strong>Ocorreu um erro:</strong> <br>";

            let resposta = await HttpRequest.remover(id);
            
            if (!resposta.ok) {
                const mensagemDoBackEnd = await resposta.text();
                throw (mensagemDeErro + mensagemDoBackEnd);
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
                        this.navegarParaRota(NOME_ROTA_LISTA);
                    }
                }
            });
        }
    });
});
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/History",
    "../model/FormatterAnimal",
    "sap/m/MessageBox"
], (Controller, JSONModel, History, FormatterAnimal, MessageBox) => {
    "use strict";

    let ID_ANIMAL_SELECIONADO = null;
    const NOME_MODELO_I18N = "i18n";
    const NOME_ROTA_DETALHES = "detalhes";

    return Controller.extend("ui5.controledeanimaissilvestres.controller.Detalhes", {
        formatterAnimal: FormatterAnimal,
        
        onInit() {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute(NOME_ROTA_DETALHES).attachPatternMatched(this.aoCoincidirRota, this);
        },

        aoCoincidirRota(oEvent)  {
            const id = oEvent.getParameter("arguments").id;
            this._definirAnimalPeloId(id);
            ID_ANIMAL_SELECIONADO = id;
        },

        _definirAnimalPeloId(id) {
            fetch(`/api/AnimalSilvestre/${id}`)
            .then(response => response.json())
            .then(response => this.getView().setModel(new JSONModel(response), "animal"))
            .catch(erro => console.error(erro));
        },

        aoClicarEmVoltar() {
            const oHistory = History.getInstance();
            const sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("lista", {}, true);
            }
        },

        aoClicarEmEditar() {
            this._navegarParaEdicao(ID_ANIMAL_SELECIONADO);
        },

        _navegarParaEdicao(id) {
            const nomeRotaEdicao = "edicao"
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo(nomeRotaEdicao, {
                id : id
            });
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
            this.byId("confirmacaoDaRemocao").close();
        },

        aoClicarNoBotaoCancelar() {
            this._fecharCaixaDeDialogo();
        },

        _obterIdDaRota() {
            const vazio = "";
            const cadastro = "Detalhes/";
            const hash = this.getOwnerComponent().getRouter().getHashChanger().hash;
            const id = hash.replace(cadastro, vazio);

            return id;
        },

        async aoClicarNoBotaoDeExcluir() {
            let oResourceBundle = this.getOwnerComponent().getModel(NOME_MODELO_I18N).getResourceBundle();
            const naoFoiPossivelExcluirOCadastroi18n = "erroNaoFoiPossivelExcluirOCadastro"
            const naoFoiPossivelExcluirOCadastro = oResourceBundle.getText(naoFoiPossivelExcluirOCadastroi18n);
            const erroAoExcluir18n = "erroAoExcluir";
            const erroAoExcluir = oResourceBundle.getText(erroAoExcluir18n);

            try {
                const statusDaRemocao = await this._executarRemocao();
                if (statusDaRemocao) {
                    this._fecharCaixaDeDialogo();
                    this._exibirMensagemDeExclusaoBemSucedida();
                }
            }
            catch (erro) {
                this._fecharCaixaDeDialogo();
                MessageBox.error(naoFoiPossivelExcluirOCadastro, {
                    title: erroAoExcluir,
                    details: erro
                })
            }
        },
        
        _executarRemocao() {
            const id = this._obterIdDaRota();
            const metodoDoFetch = "DELETE";
            const url = `/api/AnimalSilvestre/${id}`;
            const mensagemDeErro = "<strong>Ocorreu um erro:</strong> <br>";
    
            return fetch (url, {
                method: metodoDoFetch
            })
            .then(async (response) => {
                if (!response.ok) {
                    const mensagemDoBackEnd = await response.text();
                    throw (mensagemDeErro + mensagemDoBackEnd);
                } else {
                    return response.ok;
                }
            });
        },

        _exibirMensagemDeExclusaoBemSucedida() {
            let oResourceBundle = this.getOwnerComponent().getModel(NOME_MODELO_I18N).getResourceBundle();
            const exclusaoFeitaComSucessoi18n = "exclusaoFeitaComSucesso";
            const exclusaoFeitaComSucesso = oResourceBundle.getText(exclusaoFeitaComSucessoi18n);

            MessageBox.success(exclusaoFeitaComSucesso, {
                actions: [MessageBox.Action.OK],
                onClose: (acao) => {
                    if (acao == MessageBox.Action.OK) {
                        this._navegarParaLista();
                    }
                }
            });
        },

        _navegarParaLista() {
            const nomeRotaLista = "lista";
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo(nomeRotaLista, {});
        },
    });
});
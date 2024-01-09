sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../validation/ValidadorDeAnimalSilvestre",
    "sap/m/MessageBox"
], (Controller, JSONModel, ValidadorDeAnimalSilvestre, MessageBox) => {
    "use strict";

    const NOME_ROTA_CADASTRO = "cadastro";
    const NOME_ROTA_LISTA = "lista";
    const NOME_MODELO_ANIMAL_SILVESTRE = "animalSilvestre";
    const NOME_MODELO_I18N = "i18n";
    let _validador = null;

    return Controller.extend("ui5.controledeanimaissilvestres.controller.Cadastro", {

        onInit() {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute(NOME_ROTA_CADASTRO).attachPatternMatched(this.aoCoincidirRota, this);
        },

        aoCoincidirRota() {
            _validador = this._criarValidadorDeAnimalSilvestre();
            this._inicializarModeloAnimalSilvestre();
            this._definirItensDaCombobox();
            this._limparStatusDeErro();
        },

        aoClicarEmVoltar() {
            this._navegarParaLista();
        },

        aoClicarEmCancelar() {
            this._navegarParaLista();
        },

        _obterDadosDoAnimal() {
            const zero = 0;
            let oCadastro = this.getView().getModel(NOME_MODELO_ANIMAL_SILVESTRE).getData();
            oCadastro.emExtincao = oCadastro.emExtincao == undefined ? false : true;
            oCadastro.classe = Number(oCadastro.classe);
            oCadastro.custoDeVacinacao = oCadastro.custoDeVacinacao == undefined ? zero : (oCadastro.custoDeVacinacao)[0];
            
            return oCadastro;
        },

        aoClicarEmSalvar() {
            this._salvarAnimal();
        },

        _definirItensDaCombobox() {
            const nomeAliasLista = "classes";

            const enumClasseAnfibio = 0;
            const enumClasseAve = 1;
            const enumClasseMamifero = 2;
            const enumClassePeixe = 3;
            const enumClasseReptil = 4;

            const enumClasseAnfibioNome = "Anfíbio";
            const enumClasseAveNome = "Ave";
            const enumClasseMamiferoNome = "Mamífero";
            const enumClassePeixeNome = "Peixe";
            const enumClasseReptilNome = "Réptil";

            const oItems = [{ Nome : enumClasseAnfibioNome, Chave : enumClasseAnfibio}, 
                            {Nome : enumClasseAveNome, Chave : enumClasseAve}, 
                            {Nome : enumClasseMamiferoNome, Chave : enumClasseMamifero}, 
                            {Nome : enumClassePeixeNome, Chave : enumClassePeixe}, 
                            {Nome : enumClasseReptilNome, Chave : enumClasseReptil}];
            const oLista = new JSONModel(oItems);
            const oView = this.getView();

            oView.setModel(oLista, nomeAliasLista);
        },

        async _executarSalvarAnimal(dados) {
            const url = '/api/AnimalSilvestre';
            const metodoDoFetch = "POST";
            let resposta = null;
            let formulario = null;
            let idDoCadastro = null;
            let mensagemDeErro = "<strong>ERRO HTTP</strong> <br>Status: "

            resposta = await fetch(url, {
                method: metodoDoFetch,
                body: JSON.stringify(dados),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            });

            if (!resposta.ok) {
                throw (mensagemDeErro + resposta.status);
            }

            formulario = await resposta.json();
            idDoCadastro =  await formulario.id;

            return idDoCadastro;
        },

        _inicializarModeloAnimalSilvestre() {
            let oModelo = new JSONModel({});
            this.getView().setModel(oModelo, NOME_MODELO_ANIMAL_SILVESTRE);
        },

        _navegarParaDetalhes(id) {
            const nomeRotaDetalhes = "detalhes"
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo(nomeRotaDetalhes, {
                id : id
            });
        },

        aoAlterarData(oEvento) {
            _validador.validarDataDeResgatePelaView(oEvento);
        },

        aoAlterarPreco(oEvento) {
            _validador.validarPrecoDeVacinacaoPelaView(oEvento);
        },

        aoAlterarNomeDoAnimal(oEvento) {
            _validador.validarNomeDoAnimalPelaView(oEvento);
        },

        aoAlterarNomeDaEspecie(oEvento) {
            _validador.validarNomeDaEspeciePelaView(oEvento);
        },

        _limparStatusDeErro() {
            const campoNomeDoAnimal = "inputNomeDoAnimal";
            const campoNomeDaEspecie = "inputNomeDaEspecie";
            const campoPrecoDaVacinacao = "inputPrecoDaVacinacao";
            const campoClasseDeAnimal = "inputClasseDeAnimal";
            const campoDataDoResgate = "inputDataDoResgate";

            this._redefinirPropriedadesDoStatus(campoNomeDoAnimal);
            this._redefinirPropriedadesDoStatus(campoNomeDaEspecie);
            this._redefinirPropriedadesDoStatus(campoPrecoDaVacinacao);
            this._redefinirPropriedadesDoStatus(campoClasseDeAnimal);
            this._redefinirPropriedadesDoStatus(campoDataDoResgate);
        },

        _redefinirPropriedadesDoStatus(id) {
            const stringEstadoDoCampo = "valueState";
            const stringTextoDeEstadoDoCampo = "valueStateText";
            const oView = this.getView();

            oView.byId(id).resetProperty(stringEstadoDoCampo);
            oView.byId(id).resetProperty(stringTextoDeEstadoDoCampo);
        },

        async _salvarAnimal() {
            let oCadastro = this._obterDadosDoAnimal();
            let oResourceBundle = this.getOwnerComponent().getModel(NOME_MODELO_I18N).getResourceBundle();
            const cabecalhoDeErroDoi18n = "mensagemDeErroCabecalho";
            const corpoDoErroDoi18n = "erroAoSalvar";
            const erroAoSalvar = oResourceBundle.getText(corpoDoErroDoi18n);
            const mensagemDeErroCabecalho = oResourceBundle.getText(cabecalhoDeErroDoi18n);
            let idDoNovoCadastro = null;
            
            try {
                _validador.validacaoDeTodosOsCampos(oCadastro);
                idDoNovoCadastro = await this._executarSalvarAnimal(oCadastro);
                this._navegarParaDetalhes(idDoNovoCadastro);
            }
            catch (erro) {
                MessageBox.error(erroAoSalvar, {
                    title: mensagemDeErroCabecalho,
                    details: erro
                })
            }
        },

        _navegarParaLista() {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo(NOME_ROTA_LISTA, {});
        },

        _criarValidadorDeAnimalSilvestre() {
            let oView = this.getView();
            let oResourceBundle = this.getOwnerComponent().getModel(NOME_MODELO_I18N).getResourceBundle();
            return new ValidadorDeAnimalSilvestre(oView, oResourceBundle);
        }
    });
});
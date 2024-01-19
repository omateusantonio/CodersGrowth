sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "../validation/ValidadorDeAnimalSilvestre",
    "../common/HttpRequest",
], (BaseController, JSONModel, ValidadorDeAnimalSilvestre, HttpRequest) => {
    "use strict";

    const NOME_MODELO_ANIMAL_SILVESTRE = "animalSilvestre";
    const ROTA_CADASTRO = "Cadastro/";
    let _validador = null;
    let edicaoAtivada = false;

    return BaseController.extend("ui5.controledeanimaissilvestres.controller.Cadastro", {

        onInit() {
            this.obterRoteadorEManipularRota(this.NOME_ROTA_CADASTRO, this._aoCoincidirRotaDoCadastro);
            this.obterRoteadorEManipularRota(this.NOME_ROTA_EDICAO, this._aoCoincidirRotaDaEdicao);
        },

        _aoCoincidirRotaComum() {
            _validador = this._criarValidadorDeAnimalSilvestre();
            this._inicializarModeloAnimalSilvestre();
            this._definirItensDaCombobox();
            this._limparStatusDeErro();
        },

        _aoCoincidirRotaDoCadastro() {
            this._aoCoincidirRotaComum();
        },

        _aoCoincidirRotaDaEdicao() {
            edicaoAtivada = true;
            this._aoCoincidirRotaComum();
            this._carregarAnimalSilvestre();
        },

        aoClicarEmVoltar() {
            this._navegarParaListaOuDetalhes();
        },

        _navegarParaListaOuDetalhes() {
            if (edicaoAtivada == false) {
                this.navegarParaRota(this.NOME_ROTA_LISTA);
            } else {
                const id = this.obterIdAPartirDaRota(ROTA_CADASTRO);
                this.navegarParaRota(this.NOME_ROTA_DETALHES, id);
            }
        },

        aoClicarEmCancelar() {
            this.navegarParaRota(this.NOME_ROTA_LISTA);
        },

        _obterDadosDoAnimal() {
            const dadosDeCadastro = this._modeloAnimalSilvestre().getData();
            dadosDeCadastro.emExtincao = dadosDeCadastro.emExtincao == undefined ? false : true;
            dadosDeCadastro.classe = Number(dadosDeCadastro.classe);
            dadosDeCadastro.custoDeVacinacao = dadosDeCadastro.custoDeVacinacao == undefined ? this.ZERO : (dadosDeCadastro.custoDeVacinacao);
            
            return dadosDeCadastro;
        },

        aoClicarEmSalvar() {
            if (!edicaoAtivada) {
                this._salvarAnimal();
            } else {
                this._atualizarAnimal();
            }
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
            this.setarModelo(oLista, nomeAliasLista);
        },

        async _executarSalvarAnimal(dados) {
            let resposta = await HttpRequest.criar(dados);

            if (!resposta.ok) {
                const textoDoBackEnd = await resposta.text();
                throw (this.MENSAGEM_DE_ERRO + textoDoBackEnd);
            }

            let formulario = await resposta.json();
            let idDoCadastro =  await formulario.id;

            return idDoCadastro;
        },

        _inicializarModeloAnimalSilvestre() {
            let oModelo = new JSONModel({});
            this._modeloAnimalSilvestre(oModelo);
        },

        _navegarParaDetalhes(id) {
            this.navegarParaRota(this.NOME_ROTA_DETALHES, id);
        },

        aoAlterarData(evento) { 
            const nomePropriedadeValorDaData = "dateValue";
            const data = this.obterFonteDoEvento(evento).getProperty(nomePropriedadeValorDaData);
            _validador.validarDataDeResgatePelaView(data);
        },

        aoAlterarPreco(evento) {
            const preco = this.obterFonteDoEvento(evento).getProperty(this.NOME_PROPRIEDADE_VALUE);
            this._definirValorZeroSePrecoForVazio(preco);
            _validador.validarPrecoDeVacinacaoPelaView(preco);
        },

        _definirValorZeroSePrecoForVazio (preco) {
            if (!preco) {
                const propriedadeDataDoModelo = "/custoDeVacinacao";
                this._modeloAnimalSilvestre().setProperty(propriedadeDataDoModelo, ZERO)
            }
        },

        aoAlterarNomeDoAnimal(evento) {
            const nomeDoAnimal = this.obterFonteDoEvento(evento).getProperty(this.NOME_PROPRIEDADE_VALUE);
            _validador.validarNomeDoAnimalPelaView(nomeDoAnimal);
        },

        aoAlterarNomeDaEspecie(evento) {
            const nomeDaEspecie = this.obterFonteDoEvento(evento).getProperty(this.NOME_PROPRIEDADE_VALUE);
            _validador.validarNomeDaEspeciePelaView(nomeDaEspecie);
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
            const oView = this.obterView();

            oView.byId(id).resetProperty(stringEstadoDoCampo);
            oView.byId(id).resetProperty(stringTextoDeEstadoDoCampo);
        },

        async _salvarAnimal() {
            let cadastro = this._obterDadosDoAnimal();
            const cabecalhoDeErroDoi18n = "erroAoSalvar";
            const corpoDoErroDoi18n = "naoFoiPossivelEnviarOCadastro";
            let idDoNovoCadastro = null;
            
            try {
                _validador.validacaoDeTodosOsCampos(cadastro);
                idDoNovoCadastro = await this._executarSalvarAnimal(cadastro);
                this._navegarParaDetalhes(idDoNovoCadastro);
            }
            catch (erro) {
                this.dispararMessageBoxDeErro(corpoDoErroDoi18n, cabecalhoDeErroDoi18n, erro);
            }
        },

        _navegarParaLista() {
            this.navegarParaRota(this.NOME_ROTA_LISTA);
        },

        _criarValidadorDeAnimalSilvestre() {
            let oView = this.obterView();
            let oResourceBundle = this.obterResourceBundle();
            return new ValidadorDeAnimalSilvestre(oView, oResourceBundle);
        },

        async _carregarAnimalSilvestre() {
            const id = this.obterIdAPartirDaRota(ROTA_CADASTRO);
            let retorno = await this._obterAnimalPeloId(id);
            this._modeloAnimalSilvestre(new JSONModel(retorno));
        },

        _modeloAnimalSilvestre(dados) {
            if (dados) {
                this.setarModelo(dados, NOME_MODELO_ANIMAL_SILVESTRE);
                return;
            }
            return this.obterModelo(NOME_MODELO_ANIMAL_SILVESTRE);
        },

        _obterAnimalPeloId(id) {
            return HttpRequest.obterPorId(id)
            .then(resposta => resposta.json())
            .then(resposta => {return resposta});
        },

        async _atualizarAnimal() {
            let dadosDoAnimal = this._obterDadosDoAnimal();
            let id = this.obterIdAPartirDaRota(ROTA_CADASTRO);
            const cabecalhoDeErroDoi18n = "erroAoSalvarAEdicao";
            const corpoDoErroDoi18n = "naoFoiPossivelSalvarAEdicaoFeita";
            
            try {
                _validador.validacaoDeTodosOsCampos(dadosDoAnimal);
                await this._executarAtualizacao(dadosDoAnimal);
                this._navegarParaDetalhes(id);
            }
            catch (erro) {
                this.dispararMessageBoxDeErro(corpoDoErroDoi18n, cabecalhoDeErroDoi18n, erro);
            }
        },

        async _executarAtualizacao(dadosDoAnimal) {
            await HttpRequest.atualizar(dadosDoAnimal).then(async (resposta) => {
                    if (!resposta.ok) {
                        const textoDoBackEnd = await resposta.text();
                        throw (this.MENSAGEM_DE_ERRO + textoDoBackEnd);
                    }
            });
        }
    });
});
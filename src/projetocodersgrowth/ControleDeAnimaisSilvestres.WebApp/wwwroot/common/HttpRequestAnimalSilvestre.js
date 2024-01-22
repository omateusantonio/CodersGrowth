sap.ui.define([
    "./HttpRequest"
], (HttpRequest) => {
    "use strict";

    const MENSAGEM_DE_ERRO = "<strong>Ocorreu um erro:</strong> <br>";

    return {

        async executarObterTodos(nomeASerFiltrado) {
            let resposta = await HttpRequest.obterTodos(nomeASerFiltrado);

            if (!resposta.ok) {
                const textoDoBackEnd = resposta.text();
                throw (MENSAGEM_DE_ERRO + textoDoBackEnd);
            }
            
            return await resposta.json();
        },

        async executarObterPorId(id) {
            let resposta = await HttpRequest.obterPorId(id);

            if (!resposta.ok) {
                const textoDoBackEnd = await resposta.text();
                throw (MENSAGEM_DE_ERRO + textoDoBackEnd);
            }
     
            return await resposta.json();
        },
        
        async executarRemocao(id) {
            let resposta = await HttpRequest.remover(id);
            
            if (!resposta.ok) {
                const mensagemDoBackEnd = await resposta.text();
                throw (MENSAGEM_DE_ERRO + mensagemDoBackEnd);
            } else {
                return await resposta.ok;
            };
        },

        async executarCriarAnimal(dados) {
            let resposta = await HttpRequest.criar(dados);

            if (!resposta.ok) {
                const textoDoBackEnd = await resposta.text();
                throw (MENSAGEM_DE_ERRO + textoDoBackEnd);
            }

            let formulario = await resposta.json();
            let idDoCadastro =  await formulario.id;

            return idDoCadastro;
        },

        async executarSalvarAnimal(dados) {
            let resposta = await HttpRequest.atualizar(dados);

            if (!resposta.ok) {
                const textoDoBackEnd = await resposta.text();
                throw (MENSAGEM_DE_ERRO + textoDoBackEnd);
            };
        }
    }
})
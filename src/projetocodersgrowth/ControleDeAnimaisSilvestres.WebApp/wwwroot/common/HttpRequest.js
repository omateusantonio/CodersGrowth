sap.ui.define([], () => {
    "use strict";

    const URL = "/api/AnimalSilvestre";

    return {

        obterTodos(nomeASerFiltrado) {
            if(nomeASerFiltrado) {
                const caminhoDoFiltro = "?animal=";
                let novaUrl = null;

                novaUrl = URL + caminhoDoFiltro + nomeASerFiltrado;
                return fetch(novaUrl);
            } else {
                return fetch(URL);
            }
        },

        criar(dados) {
            const url = '/api/AnimalSilvestre';
            const metodoDoFetch = "POST";
            
            return fetch(url, {
                method: metodoDoFetch,
                body: JSON.stringify(dados),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            });
        },

        obterPorId(id) {
            const urlComId = `${URL}/${id}`;
            return fetch(urlComId)
        },

        atualizar(dadosDoAnimal) {
            const metodoDoFetch = "PUT";

            return fetch(URL, {
                method: metodoDoFetch,
                body: JSON.stringify(dadosDoAnimal),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
        },

        remover(id) {
            const urlComId = `${URL}/${id}`;
            const metodoDoFetch = "DELETE";
    
            return fetch (urlComId, {
                method: metodoDoFetch
            });
        }
    }
})
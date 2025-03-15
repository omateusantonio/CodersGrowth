sap.ui.define([], () => {
    "use strict";

    const URL = "/api/AnimalSilvestre";

    return {
        
        obterTodos(nomeASerFiltrado) {
            if(nomeASerFiltrado) {
                const caminhoDoFiltro = "?animal=";
                let novaUrl = URL + caminhoDoFiltro + nomeASerFiltrado;

                return this._request(novaUrl);
            } else {
                return this._request(URL);
            }
        },


        criar(dados) {
            const metodoDoFetch = "POST";
            const cabecalho = {"Content-type": "application/json; charset=UTF-8"};

            return this._request(URL, metodoDoFetch, dados, cabecalho);
        },

        obterPorId(id) {
            const urlComId = `${URL}/${id}`;
            return this._request(urlComId);
        },

        atualizar(dadosDoAnimal) {
            const metodoDoFetch = "PUT";
            const cabecalho = {"Content-type": "application/json; charset=UTF-8"};

            return this._request(URL, metodoDoFetch, dadosDoAnimal, cabecalho);
        },

        remover(id) {
            const urlComId = `${URL}/${id}`;
            const metodoDoFetch = "DELETE";
            
            return this._request(urlComId, metodoDoFetch);
        },

        _request(url, metodoHttp, dados, cabecalho={}) {
            return fetch (url, {
                method: metodoHttp,
                body: JSON.stringify(dados),
                headers: cabecalho
            });
        }
    }
})
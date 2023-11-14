﻿using CodersGrowthProjeto.Dominio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControleDeAnimaisSilvestres.Dominio
{
    public interface IRepositorio
    {
        public List<AnimalSilvestre> ObterTodos();
        public void Criar(AnimalSilvestre animalNovo);
        public void Remover(int id);
        public AnimalSilvestre ObterPorId(int id);
        public void Atualizar(AnimalSilvestre animalSelecionado);
        
    }
}

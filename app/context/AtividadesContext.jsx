import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  getInscricoesDoUsuario,
   inscreverAtividade as inscreverAtividadeNoFirestore,
  cancelarInscricao as cancelarInscricaoNoFirestore
} from '../../services/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../factory/firebase';

const AtividadesContext = createContext();

export const AtividadesProvider = ({ children }) => {
  const [minhasAtividades, setMinhasAtividades] = useState([]);

  const carregarInscricoes = async () => {
    const inscricoes = await getInscricoesDoUsuario();
    setMinhasAtividades(inscricoes);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        carregarInscricoes();
      }
    });

    return () => unsubscribe();
  }, []);


  const inscreverAtividade = async (atividade, selectedDate) => {
    await inscreverAtividadeNoFirestore(atividade.id, selectedDate);
    await carregarInscricoes();
  };

  const cancelarInscricao = async (atividadeId, selectedDate) => {
    await cancelarInscricaoNoFirestore(atividadeId, selectedDate);
    await carregarInscricoes();
  };

  return (
    <AtividadesContext.Provider value={{ minhasAtividades, inscreverAtividade, cancelarInscricao }}>
      {children}
    </AtividadesContext.Provider>
  );
};

export const useAtividades = () => useContext(AtividadesContext);

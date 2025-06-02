import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  getInscricoesDoUsuario,
  registrarAvaliacao,
  inscreverAtividade as inscreverAtividadeNoFirestore,
  cancelarInscricao as cancelarInscricaoNoFirestore
} from '../../services/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../factory/firebase';

const MinhasAtividadesContext = createContext();

export const AtividadesProvider = ({ children }) => {
  const [minhasAtividades, setMinhasAtividades] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
        setMinhasAtividades([]);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userId) {
      carregarInscricoes();
    }
  }, [userId]);

  const carregarInscricoes = async () => {
    const inscricoes = await getInscricoesDoUsuario();
    setMinhasAtividades(inscricoes);
  };

  const inscreverAtividade = async (atividade, selectedDate) => {
    await inscreverAtividadeNoFirestore(atividade.id, selectedDate);
    await carregarInscricoes();
  };

  const cancelarInscricao = async (atividadeId, selectedDate) => {
    await cancelarInscricaoNoFirestore(atividadeId, selectedDate);
    await carregarInscricoes();
  };

  const avaliarAtividade = async (id, nota, avaliacaoTexto, selectedDate) => {
    await registrarAvaliacao(id, nota, avaliacaoTexto, selectedDate);
    await carregarInscricoes();
  };

  return (
    <MinhasAtividadesContext.Provider value={{ minhasAtividades, inscreverAtividade, cancelarInscricao, avaliarAtividade, carregarInscricoes }}>
      {children}
    </MinhasAtividadesContext.Provider>
  );
};

export const useMinhasAtividades = () => useContext(MinhasAtividadesContext);

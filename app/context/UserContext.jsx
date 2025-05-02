import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@usuario');
        if (jsonValue != null) {
          setUsuario(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error('Erro ao carregar usuário do AsyncStorage:', e);
      }
    };

    carregarUsuario();
  }, []);

  const atualizarUsuario = async (dados) => {
    try {
      setUsuario(dados);
      await AsyncStorage.setItem('@usuario', JSON.stringify(dados));
    } catch (e) {
      console.error('Erro ao salvar usuário no AsyncStorage:', e);
    }
  };

  const limparUsuario = async () => {
    try {
      await AsyncStorage.removeItem('@usuario');
      setUsuario(null);
    } catch (e) {
      console.error('Erro ao limpar usuário no AsyncStorage:', e);
    }
  };

  return (
    <UserContext.Provider value={{ usuario, setUsuario: atualizarUsuario, limparUsuario }}>
      {children}
    </UserContext.Provider>
  );
};

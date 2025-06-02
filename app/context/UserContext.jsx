import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../factory/firebase';
import { doc, getDoc } from 'firebase/firestore';
import banco from '../../factory/firebase';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const uid = firebaseUser.uid;
          const userDoc = await getDoc(doc(banco, 'users', uid));
          const userData = userDoc.exists() ? { id: uid, ...userDoc.data() } : null;

          setUsuario(userData);
          await AsyncStorage.setItem('@usuario', JSON.stringify(userData));
        } catch (error) {
          console.error('Erro ao buscar dados do usuário autenticado:', error);
        }
      } else {
        // Deslogado
        setUsuario(null);
        await AsyncStorage.removeItem('@usuario');
      }
    });

    return () => unsubscribe();
  }, []);

  const atualizarUsuario = async (dados) => {
    setUsuario(dados);
    await AsyncStorage.setItem('@usuario', JSON.stringify(dados));
  };

  const limparUsuario = async () => {
    setUsuario(null);
    await AsyncStorage.removeItem('@usuario');
  };

  return (
    <UserContext.Provider value={{ usuario, setUsuario: atualizarUsuario, limparUsuario }}>
      {children}
    </UserContext.Provider>
  );
};

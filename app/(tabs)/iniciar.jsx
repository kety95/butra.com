import { View, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import Banner from "../../components/banner";
import Btn_iniciar from "../../components/btn_iniciar";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../factory/firebase';

const Iniciar = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Usuário logado:", user.displayName || user.email);
        navigation.reset({
          index: 0,
          routes: [{ name: 'pesquisa' }],
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Banner navigation={navigation} />
      <View style={styles.botoesContainer}>
        <Btn_iniciar titulo="Começar" onPress={() => navigation.navigate('cadastro', {userType: 'participant'})} />
        <Btn_iniciar titulo="Login" onPress={() => navigation.navigate('login')} />
        <Btn_iniciar titulo="Criar conta de parceiro" onPress={() => navigation.navigate('cadastro', {userType: 'organizer'})} />
      </View>
    </View>
  );
};

export default Iniciar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  botoesContainer: {
    paddingTop: 100,
    gap: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

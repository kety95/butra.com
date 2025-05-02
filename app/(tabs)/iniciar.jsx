import { View, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect, useContext } from 'react';
import Banner from "../../components/banner";
import Btn_iniciar from "../../components/btn_iniciar";
import { UserContext } from '../context/UserContext';

const Iniciar = ({ navigation }) => {
  const { usuario, carregando } = useContext(UserContext);

  useEffect(() => {
    if (!carregando && usuario) {
      if (usuario.userType === 'organizer') {
        navigation.reset({
          index: 0,
          routes: [{ name: 'listaAtracoes' }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'pesquisa' }],
        });
      }
    }
  }, [usuario, carregando]);

  if (carregando) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Banner navigation={navigation} tela="iniciar" />
      <View style={styles.botoesContainer}>
        <Btn_iniciar titulo="Começar" onPress={() => navigation.navigate('cadastro', { userType: 'participant' })} />
        <Btn_iniciar titulo="Login" onPress={() => navigation.navigate('login')} />
        <Btn_iniciar titulo="Criar conta de parceiro" onPress={() => navigation.navigate('cadastro', { userType: 'organizer' })} />
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

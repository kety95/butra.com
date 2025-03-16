import { View, StyleSheet } from 'react-native';
import React from 'react';
import Banner from "../../components/banner/banner";
import Btn_iniciar from "../../components/btn_iniciar/btn_iniciar";

const Iniciar = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Banner />
      <View style={styles.botoesContainer}>
        <Btn_iniciar titulo="Começar" onPress={() => navigation.navigate('cadastro')}/>
        <Btn_iniciar titulo="Login" onPress={() => alert('Botão clicado!')}/>
        <Btn_iniciar titulo="Criar conta de parceiro" onPress={() => alert('Botão clicado!')}/>
      </View>
    </View>
  );
};

export default Iniciar;

const styles = StyleSheet.create({
  botoesContainer: {
    paddingTop: 100,
    gap: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

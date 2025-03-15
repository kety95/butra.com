import { View, StyleSheet } from 'react-native';
import React from 'react';
import Banner from "../../components/banner/banner";
import Btn_iniciar from "../../components/btn_iniciar/btn_iniciar";

const Iniciar = () => {
  return (
    <View style={styles.container}>
      <Banner />
      <View style={styles.botoesContainer}>
        <Btn_iniciar titulo="Começar" />
        <Btn_iniciar titulo="Login" />
        <Btn_iniciar titulo="Criar conta de parceiro" />
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
    justifyContent: "center", // Centraliza verticalmente na tela
    alignItems: "center",                   // Espaçamento entre os botões (React Native 0.71+)
  },
});

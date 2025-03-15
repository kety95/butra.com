import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import React from 'react';
import { Colors } from '../../constants/Colors';

const BtnIniciar = ({ titulo }) => {
  return (
    <TouchableOpacity style={styles.button}>
      <View style={styles.content}>
        <Text style={styles.texto}>{titulo}</Text>
        <Icon name="arrowright" size={24} color={Colors.mainColor} />
      </View>
    </TouchableOpacity>
  );
};

export default BtnIniciar;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#EDEDED",
    borderWidth: 2,
    borderColor: Colors.mainColor,
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: 350
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  texto: {
    color: Colors.mainColor,
    fontWeight: "600",
    fontSize: 16,
  },
});

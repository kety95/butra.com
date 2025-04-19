import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAtividades } from '../app/context/AtividadesContext';
import { formatDateToDisplay } from '../app/utils/dateUtils';

const CardAtividadeInscrita = ({ id, title, dates, image, reviewsCount, description, accessibilities, location, adress, selectedDate }) => {
  const navigation = useNavigation();
  const { cancelarInscricao } = useAtividades();

  const handleCancelar = () => {
    Alert.alert(
      "Cancelar inscrição",
      "Deseja cancelar sua inscrição nesta atividade?",
      [
        { text: "Não", style: "cancel" },
        { 
          text: "Sim", 
          onPress: () =>{ console.log("Data selecionada ", selectedDate); 
            cancelarInscricao(id, selectedDate); 
            Alert.alert('Inscrição cancelada!','Você não está mais inscrito nesta atividade')}
        }
      ]
    );
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('detalhesatividade',
        {
          atividade: { id, title, image, description, accessibilities, location, adress, dates },
          reviewsCount
        })}
    >
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.container}>
          <View style={styles.data}>
            <Icon name="calendar" size={16} color={"#6D6D6D"} />
            <Text>{formatDateToDisplay(selectedDate)}</Text>
          </View>
          
          <View style={styles.btn}>
            <Text style={styles.btn_txt}>Inscrito</Text>
            <Icon name="check" color={'white'} size={18} />
          </View>
        </View>
        <TouchableOpacity onPress={handleCancelar}>
          <Text style={styles.cancel}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 5,
    paddingLeft: 15,
    paddingBottom: 0,
    flexDirection: 'row',
    paddingRight: 20,
    gap: 12,
  },
  image: {
    width: 120,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  container_reviews: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 23,
  },
  reviews: {
    fontSize: 14,
  },
  cancel: {
    marginTop: 1,
    textAlign: 'right',
    fontSize: 14,
    color: 'red',
  },
  btn: {
    marginTop: 15,
    borderRadius: 4,
    backgroundColor: "#1E90FE",
    paddingVertical: 6,
    paddingHorizontal: 20,
    alignItems: "right",
    marginBottom: 8,
    alignSelf: "flex-end",
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  btn_txt: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: '500',
  },
  data:{
    flexDirection: 'row',
    gap: 5,
    marginTop: 5,
  },
});

export default CardAtividadeInscrita;

import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import IconStar from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../constants/Colors';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const AtividadeListada = ({ id, title, image, reviewsCount, description, accessibilities, location, adress }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate('detalhesatividade', { atividade: { id, title, image, reviewsCount, description, accessibilities, location, adress } })}
    >
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.container_reviews}>
          <IconStar name="star" size={20} color={Colors.stars}/>
          <Text style={styles.reviews}>({reviewsCount}) avaliações</Text>
        </View>

        <Text style={styles.description}>Disponível</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
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
  description: {
    marginTop: 18,
    textAlign: 'right',
    fontSize: 12,
    marginRight: 20,

  }
});

export default AtividadeListada;

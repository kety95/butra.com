import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AtividadeListada from '../../components/atividadeListada';
import Icon from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../constants/Colors';

const ListaAtividades = ({ route }) => {
  const navigation = useNavigation();
  const { date, location } = route.params || {};
  const [atividades, setAtividades] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      fetch('http://localhost:3000/activities').then(res => res.json()),
      fetch('http://localhost:3000/reviews').then(res => res.json()),
    ])
      .then(([atividadesData, reviewsData]) => {
        const reviewsCount = reviewsData.reduce((acc, review) => {
          acc[review.activity] = (acc[review.activity] || 0) + 1;
          return acc;
        }, {});

        const atividadesFiltradas = atividadesData.filter(atividade => {
          const cidadeCorresponde = !location || atividade.location.includes(location);
          const dataCorresponde = date ? atividade.dates[0] === date : true;
          return cidadeCorresponde && dataCorresponde;
        });

        const atividadesComReviews = atividadesFiltradas.map(atividade => ({
          ...atividade,
          reviewsCount: reviewsCount[atividade.id] || 0,
        }));

        setAtividades(atividadesComReviews);
      })
      .catch(error => {
        console.error('Erro ao buscar dados:', error);
        alert('Houve um erro ao buscar as atividades. Tente novamente mais tarde.');
      })      
      .finally(() => setLoading(false));
  }, [date, location]);

  return (
    <View>
      <View style={styles.div}>
        <View style={styles.backBar}>
          <View style={styles.descBar}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrowleft" size={24} />
            </TouchableOpacity>
            <Text style={styles.txt}>
              {location || 'Todos os lugares'} - {date || 'Qualquer data'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.separator} />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : atividades.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>Nenhuma atividade encontrada para os filtros aplicados.</Text>
        </View>
      ) : (
        <FlatList
          data={atividades}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <AtividadeListada {...item} />}
        />
      )}

    </View>
  );
};

export default ListaAtividades;

const styles = StyleSheet.create({
  backBar: {
    backgroundColor: Colors.mainColor,
    position: 'relative',
    height: 45,
  },
  descBar: {
    flexDirection: 'row',
    borderWidth: 3,
    borderColor: Colors.backSearchColor,
    borderRadius: 10,
    borderStyle: 'solid',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 5,
    padding: 8,
    backgroundColor: 'white',
    position: 'absolute',
    marginTop: 20,
    width: "90%",
    marginHorizontal: "5%",
  },
  txt: {
    fontWeight: '400',
    fontSize: 16,
  },
  div: {
    paddingBottom: 50,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 10,
  },
  noDataContainer: {
    paddingHorizontal: 30,
  }
});

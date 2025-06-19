import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import CardAtividadeListada from '../../components/CardatividadeListada';
import { formatDateToDisplay } from '../utils/dateUtils';
import Icon from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../constants/Colors';
import { getAtividadesComReviews } from '../../services/firestore';
import Toast from 'react-native-toast-message';

const ListaAtividades = ({ route }) => {
  const navigation = useNavigation();
  const { date, location } = route.params || {};
  const [atividades, setAtividades] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    getAtividadesComReviews()
      .then(atividades => {
        const atividadesFiltradas = atividades.filter(atividade => {
          const cidadeCorresponde = !location || atividade.location.includes(location);
          const dataCorresponde = date ? atividade.dates?.includes(date) : true;
          return cidadeCorresponde && dataCorresponde;
        });

        setAtividades(atividadesFiltradas);
      })
      .catch(error => {
        console.error('Erro ao buscar dados:', error);
        Toast.show({
          type: 'error',
          text1: 'Erro ao buscar atividades',
        });
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
              {location || 'Todos os lugares'} - {formatDateToDisplay(date) || 'Qualquer data'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.separator} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
            renderItem={({ item }) => <CardAtividadeListada {...item} />}
          />
        )}
      </ScrollView>
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

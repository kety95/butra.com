import { View, Text, Image, StyleSheet, FlatList, ScrollView, RefreshControl } from 'react-native';
import React from 'react';
import BackButton from '../../components/backButton';
import { useMinhasAtividades } from '../context/MinhasAtividadesContext';
import CardAtividadeInscrita from '@/components/cardAtividadeInscrita';

const MinhasAtividades = () => {
  const { minhasAtividades, carregarInscricoes } = useMinhasAtividades();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await carregarInscricoes();
    setRefreshing(false);
  };
  // console.log(...minhasAtividades)
  if (minhasAtividades.length === 0) {
    return (
      <>
        <BackButton title="Minhas atividades" />
        <ScrollView contentContainerStyle={styles.scrollContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.container}>
            <Image source={require('../../assets/images/semAtiv.svg')} style={styles.image} />
            <Text style={styles.pergunta}>Qual será a próxima atividade?</Text>
            <Text style={styles.txt}>
              Você ainda não se inscreveu em nenhuma atividade. Quando se inscrever, ela aparecerá aqui.
            </Text>
          </View>
        </ScrollView>
      </>
    );
  }

  return (
    <>
      <BackButton title="Minhas atividades" />
      <View style={styles.listContainer}>
        <FlatList
          data={[...minhasAtividades].
            filter(item => item.review).
            sort((a, b) => new Date(b.selectedDate) - new Date(a.selectedDate))}
          keyExtractor={(item) => `${item.id}-${item.selectedDate}`}
          contentContainerStyle={styles.flatListContent}
          renderItem={({ item }) => (
            <View style={styles.atividadeContainer}>
              <CardAtividadeInscrita {...item.atividade} selectedDate={item.selectedDate} atividadeId={item.atividade.id}/>
            </View>
          )}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    image: {
      width: 200,
      height: 200,
      resizeMode: 'contain',
      marginBottom: 20,
    },
    pergunta: {
      fontSize: 20,
      fontWeight: '500',
      marginBottom: 15,
    },
    txt: {
      textAlign: 'center',
      fontSize: 16,
    },
    atividadeContainer: {
      paddingTop: 20,
      paddingBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      width: '100%',
    },
    flatListContent: {
        paddingBottom: 100,
      },
    listContainer: {
  flex: 1,
}
  });
  
  export default MinhasAtividades;

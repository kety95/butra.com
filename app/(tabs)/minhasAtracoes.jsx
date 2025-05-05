import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import Banner from '../../components/banner';
import { buscarAtividadesPorOrganizador } from '../../services/firestore';
import { UserContext } from '../context/UserContext';
import CardAtracao from '../../components/cardAtracao'

const MinhasAtracoes = ({ navigation }) => {
  const { usuario } = useContext(UserContext);
  const [atividades, setAtividades] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarAtividades = async () => {
      try {
        const lista = await buscarAtividadesPorOrganizador(usuario.uid);
        setAtividades(lista);
      } catch (error) {
        console.error('Erro ao buscar atividades:', error);
      } finally {
        setCarregando(false);
      }
    };

    if (usuario) {
      carregarAtividades();
    }
  }, [usuario]);

  if (carregando) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Banner tela="admin" navigation={navigation} onPress={() => navigation.navigate('')} />
      
      {atividades.length === 0 ? (
        <Text style={{ padding: 20 }}>Suas atrações aparecerão aqui</Text>
      ) : (
        <FlatList
          data={atividades}
          keyExtractor={(item) => `${item.id}-${item.selectedDate}`}
          contentContainerStyle={styles.flatListContent}
          renderItem={({ item }) => (
            <View style={styles.atividadeContainer}>
              <CardAtracao atracao={item}/>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default MinhasAtracoes;

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
  });

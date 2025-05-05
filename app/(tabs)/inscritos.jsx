import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import BackButton from '../../components/backButton';
import { buscarUsuariosAgrupadosPorData } from '@/services/firestore';
import UserAvatar from '@/components/userAvatar';

const Inscritos = () => {
  const route = useRoute();
  const { id, title } = route.params || {};

  const [usuariosPorData, setUsuariosPorData] = useState({});
  const [filtroData, setFiltroData] = useState(null);

  useEffect(() => {
    const carregarUsuarios = async () => {
      try {
        const agrupados = await buscarUsuariosAgrupadosPorData(id);
        setUsuariosPorData(agrupados);
      } catch (error) {
        console.error('Erro ao buscar inscritos:', error);
      }
    };

    if (id) carregarUsuarios();
  }, [id]);

  const datasDisponiveis = Object.keys(usuariosPorData).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  const exibirDatas = filtroData ? [filtroData] : datasDisponiveis;

  return (
    <View style={{ flex: 1 }}>
      <BackButton title="Inscritos" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>

          {datasDisponiveis.length > 0 && (
            <View style={styles.filtroContainer}>
              <TouchableOpacity onPress={() => setFiltroData(null)}>
                <Text style={[styles.filtroBtn, !filtroData && styles.filtroAtivo]}>Todas</Text>
              </TouchableOpacity>
              {datasDisponiveis.map((data) => (
                <TouchableOpacity key={data} onPress={() => setFiltroData(data)}>
                  <Text
                    style={[
                      styles.filtroBtn,
                      filtroData === data && styles.filtroAtivo,
                    ]}
                  >
                    {new Date(data).toLocaleDateString()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {exibirDatas.length === 0 ? (
            <Text style={styles.empty}>Ainda não há inscritos para esta atividade.</Text>
          ) : (
            exibirDatas.map((data) => (
              <View key={data} style={styles.blocoData}>
                <Text style={styles.dataTitulo}>
                  {new Date(data).toLocaleDateString()} (inscritos: {usuariosPorData[data].length})
                </Text>
                {usuariosPorData[data].map((user, index) => (
                  <View key={index} style={styles.userBox}>
                    <UserAvatar name={user.name} />
                    <Text style={styles.userName}>{user.name}</Text>
                  </View>
                ))}
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Inscritos;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 20,
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 10,
  },
  empty: {
    fontSize: 16,
    marginTop: 10,
  },
  userBox: {
    marginBottom: 10,
    paddingVertical: 2,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
  },
  blocoData: {
    marginTop: 10,
    borderRadius: 12,
  },
  dataTitulo: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  filtroContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
    gap: 10,
  },
  filtroBtn: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#eee',
    color: '#333',
  },
  filtroAtivo: {
    backgroundColor: '#333',
    color: '#fff',
  },
});

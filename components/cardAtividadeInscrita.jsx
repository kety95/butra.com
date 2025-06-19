import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import StarIcon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useMinhasAtividades } from '../app/context/MinhasAtividadesContext';
import { formatDateToDisplay } from '../app/utils/dateUtils';
import { Colors } from '../constants/Colors';
import ConfirmModal from './ConfirmModal';
import Toast from 'react-native-toast-message';

const CardAtividadeInscrita = ({
  atividadeId,
  title,
  image,
  reviewsCount,
  description,
  accessibilities,
  location,
  adress,
  selectedDate,
}) => {
  const navigation = useNavigation();
  const { cancelarInscricao, avaliarAtividade } = useMinhasAtividades();

  const [avaliando, setAvaliando] = React.useState(false);
  const [avaliacaoTexto, setAvaliacaoTexto] = React.useState('');
  const [nota, setNota] = React.useState(0);
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);

  const handleCancelar = async () => {
    try {
      await cancelarInscricao(atividadeId, selectedDate);
      Toast.show({
        type: 'success',
        text1: 'Inscrição cancelada!',
      });
    } catch (e) {
      console.error("Erro ao cancelar inscrição:", e);
      Toast.show({
        type: 'error',
        text1: 'Erro ao cancelar inscrição.',
      });
    } finally {
      setShowConfirmModal(false);
    }
  };

  const avaliar = async () => {
    if (nota === 0 || avaliacaoTexto.trim() === '') {
      Toast.show({
        type: 'error',
        text1: "Dê uma nota e escreva sua avaliação.",
      });
      return;
    }

    await avaliarAtividade(atividadeId, nota, avaliacaoTexto, selectedDate);

    Toast.show({
      type: 'success',
      text1: "Sua avaliação foi registrada.",
    });
    
    setAvaliando(false);
    setNota(0);
    setAvaliacaoTexto('');
  };

  const inscricaoAtiva = (
    <View>
      <View style={styles.btn}>
        <Text style={styles.btn_txt}>Inscrito</Text>
        <Icon name="check" color={'white'} size={18} />
      </View>

      <TouchableOpacity onPress={() => setShowConfirmModal(true)}>
        <Text style={styles.cancel}>Cancelar</Text>
      </TouchableOpacity>

      <ConfirmModal
        visible={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleCancelar}
        message="Deseja cancelar sua inscrição nesta atividade?"
      />

    </View>
  );

  const inscricaoVencida = (
    <View>
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: Colors.detailsColor2 }]}
        onPress={() => setAvaliando(!avaliando)}
      >
        <Text style={styles.btn_txt}>{'Avaliar'}</Text>
      </TouchableOpacity>
    </View>
  );

  const hoje = new Date();
  const dataAtividade = new Date(selectedDate);
  const conteudo = dataAtividade < hoje ? inscricaoVencida : inscricaoAtiva;

  return (
    <>
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('detalhesatividade', {
              atividade: {
                id: atividadeId,
                title,
                image,
                description,
                accessibilities,
                location,
                adress,
              },
              reviewsCount,
            })
          }
        >
          <Image source={{ uri: image }} style={styles.image} />
        </TouchableOpacity>
        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>

          <View style={styles.container}>
            <View style={styles.data}>
              <Icon name="calendar" size={16} color={"#6D6D6D"} />
              <Text>{formatDateToDisplay(selectedDate)}</Text>
            </View>
          </View>

          {conteudo}
        </View>
      </View>

      {avaliando && (
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Avaliar atividade</Text>

          <Text style={{ marginBottom: 8 }}>Estrelas:</Text>
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            {[1, 2, 3, 4, 5].map((num) => (
              <TouchableOpacity key={num} onPress={() => setNota(num)}>
                <StarIcon
                  name={num <= nota ? 'star' : 'star-o'}
                  size={28}
                  color="#f1c40f"
                  style={{ marginHorizontal: 4 }}
                />
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            placeholder="Escreva sua avaliação..."
            multiline
            value={avaliacaoTexto}
            onChangeText={setAvaliacaoTexto}
            style={styles.input}
          />

          <TouchableOpacity
            onPress={avaliar}
            style={[
              styles.btn,
              { backgroundColor: Colors.detailsColor2 },
              { alignSelf: 'flex-end' },
            ]}
          >
            <Text style={styles.btn_txt}>Finalizar</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
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
  cancel: {
    marginTop: 1,
    textAlign: 'right',
    fontSize: 14,
    color: 'red',
  },
  btn: {
    marginTop: 15,
    borderRadius: 8,
    backgroundColor: Colors.detailsColor,
    paddingVertical: 6,
    paddingHorizontal: 20,
    marginBottom: 8,
    alignSelf: "flex-end",
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    width: 160,
    justifyContent: 'center',
  },
  btn_txt: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: '400',
  },
  data: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 5,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    elevation: 2,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    height: 80,
    marginBottom: 15,
    textAlignVertical: 'top',
  },
});

export default CardAtividadeInscrita;

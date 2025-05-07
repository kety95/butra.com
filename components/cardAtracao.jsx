import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import IconCalendar from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-modern-datepicker';
import { Colors } from '../constants/Colors';
import { adicionarDatasAtividade, buscarDatasAtividade } from '../services/firestore';
import { toApiDate, formatDateToDisplay, minimunDate } from '@/app/utils/dateUtils';

const CardAtracao = (props) => {
  const navigation = useNavigation();
  const { image, title, id } = props.atracao;
  const [datasExistentes, setDatasExistentes] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const carregarDatas = async () => {
      try {
        const datas = await buscarDatasAtividade(id);
        setDatasExistentes(datas);
      } catch (error) {
        console.error('Erro ao carregar datas da atividade:', error);
      }
    };

    carregarDatas();
  }, [id]);

  const handleAddDate = (date) => {
    const apiFormatted = toApiDate(date);

    if (datas.includes(apiFormatted)) {
      return;
    }

    const existingFormatted = datasExistentes.map(d => toApiDate(d));
    if (existingFormatted.includes(apiFormatted)) {
      alert('Data já existente', 'Essa data já está disponível para a atividade.');
      return;
    }

    setDatas(prev => [...prev, apiFormatted]);
  };

  const handleRemoveDate = (index) => {
    const novasDatas = datas.filter((_, i) => i !== index);
    setDatas(novasDatas);
  };

  const toggleDatePicker = () => {
    if (showDatePicker) {
      setDatas([]);
    }
    setShowDatePicker(!showDatePicker);
  };

  const handleConcluir = async () => {
    try {
      const novasDatasApi = datas.map(toApiDate);
      await adicionarDatasAtividade(id, novasDatasApi);

      alert('Datas adicionadas com sucesso!');
      setDatasExistentes(prev => [...prev, ...novasDatasApi]);
      setDatas([]);
      setShowDatePicker(false);
    } catch (error) {
      console.error('Erro ao salvar datas:', error);
      alert('Erro', 'Não foi possível salvar as datas. Tente novamente.');
    }
  };

  return (
    <>
      <TouchableOpacity style={styles.card} activeOpacity={1}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>
          {/* Botões */}
          <View style={styles.btns}>
            <TouchableOpacity
              style={[styles.btn, styles.btn1]}
              onPress={() => navigation.navigate('inscritos', { id, title })}
            >
              <Text style={[styles.btn_txt, styles.btn_txt1]}>Ver inscritos</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn, styles.btn2]}
              onPress={toggleDatePicker}
            >
              <IconCalendar name="calendar" size={16} color="black" />
              <Text style={styles.btn_txt}>Adicionar datas</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>

      {/* Modal */}
      {showDatePicker && (
        <View style={styles.containerModal}>
          {/* Datas já existentes */}
          {datasExistentes.length > 0 && (
            <>
              <Text style={styles.subtitle}>Datas existentes:</Text>
              <View style={styles.data}>
                {[...datasExistentes]
                  .sort((a, b) => new Date(a) - new Date(b))
                  .map((data, index) => (
                    <View key={index} style={styles.dateItem}>
                      <Text>{formatDateToDisplay(data)}</Text>
                    </View>
                  ))}
              </View>
            </>
          )}

          {/* Novas datas adicionadas */}
          {datas.length > 0 && (
            <>
              <Text style={styles.subtitle}>Novas datas:</Text>
              <View style={styles.data}>
                {datas.map((data, index) => (
                  <View key={index} style={styles.dateItem}>
                    <Text>{formatDateToDisplay(data)}</Text>
                    <TouchableOpacity onPress={() => handleRemoveDate(index)}>
                      <Text style={{ color: 'red', marginLeft: 8 }}>✕</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </>
          )}

          {/* Date Picker */}
          <View style={styles.datePickerModal}>
            <DatePicker
              mode="calendar"
              minimumDate={minimunDate()}
              onSelectedChange={handleAddDate}
              options={{
                backgroundColor: '#fff',
                textHeaderColor: Colors.mainColor,
                textDefaultColor: Colors.detailsColor,
                selectedTextColor: '#fff',
                mainColor: Colors.detailsColor,
                textSecondaryColor: '#999',
                borderColor: 'rgba(122, 146, 165, 0.1)',
              }}
            />
          </View>

          {/* Botão Concluir */}
          {datas.length > 0 && (
            <TouchableOpacity
              style={[styles.btn, styles.btn1, { marginTop: 10 }]}
              onPress={handleConcluir}
            >
              <Text style={[styles.btn_txt, styles.btn_txt1]}>Concluir</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 5,
    paddingLeft: 15,
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
  subtitle: {
    marginTop: 10,
    fontWeight: '400',
  },
  btns: {
    marginBottom: 8,
    marginTop: 15,
    flexDirection: 'column',
    gap: 8,
    width: 150,
  },
  btn: {
    borderRadius: 8,
    paddingVertical: 6,
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  btn1: {
    backgroundColor: '#FFC300',
  },
  btn2: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  btn_txt: {
    color: 'black',
    fontSize: 14,
    fontWeight: '400',
  },
  btn_txt1: {
    color: 'white',
  },
  data: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 5,
  },
  dateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 5,
  },
  removeDateText: {
    color: 'red',
    marginLeft: 10,
  },
  datePickerModal: {
    marginTop: 20,
  },
  containerModal: {
    paddingHorizontal: 20,
  }
});

export default CardAtracao;

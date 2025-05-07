import React, { useState, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import BackButton from '../../components/backButton';
import { Colors } from '../../constants/Colors';
import { criarAtividade } from '../../services/firestore';
import Checkbox from 'expo-checkbox';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-modern-datepicker';
import { UserContext } from '../context/UserContext';
import { minimunDate, toApiDate, formatDateToDisplay } from '../utils/dateUtils';

const CriarAtividade = ({ navigation }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { usuario } = useContext(UserContext);

  const atividadeSchema = Yup.object().shape({
    title: Yup.string().required('Título é obrigatório'),
    image: Yup.string().required('Imagem (base64) é obrigatória'),
    dates: Yup.array().min(1, 'Adicione pelo menos uma data').required('Pelo menos uma data é obrigatória'),
    description: Yup.string(),
    location: Yup.string().required('Localização é obrigatória'),
    address: Yup.string().required('Endereço é obrigatória'),
    category: Yup.string(),
    accessibilities: Yup.string(),
  });

  const handleCreate = async (values, { setSubmitting, resetForm }) => {
    try {
      const dados = {
        title: values.title,
        image: values.image,
        dates: values.dates.map(toApiDate),
        description: values.description,
        location: values.location,
        address: values.address,
        category: values.category,
        accessibilities: values.accessibilities
          ? values.accessibilities.split(',').map(a => a.trim())
          : [],
        organizer: usuario.uid,
      };

      await criarAtividade(dados);

      alert('Atividade criada com sucesso!');
      resetForm();
      navigation.navigate('minhasAtracoes')
    } catch (error) {
      alert('Erro ao criar atividade');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <BackButton title='Criar atração' />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Nova Atração</Text>

        <Formik
          initialValues={{
            title: '',
            image: '',
            dates: [],
            description: '',
            location: '',
            address: '',
            category: '',
            accessibilities: '',
          }}
          validationSchema={atividadeSchema}
          onSubmit={handleCreate}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue, isSubmitting }) => (
            <View>
              {[
                { name: 'title', label: 'Título' },
                { name: 'image', label: 'Link Imagem' },
                { name: 'description', label: 'Descrição' },
                { name: 'location', label: 'Localização' },
                { name: 'address', label: 'Endereço' },
              ].map(field => (
                <View key={field.name} style={styles.inputContainer}>
                  <Text style={styles.label}>{field.label}</Text>
                  <TextInput
                    style={[styles.input, errors[field.name] && touched[field.name] && styles.inputError]}
                    onChangeText={handleChange(field.name)}
                    onBlur={handleBlur(field.name)}
                    value={values[field.name]}
                    multiline={field.name === 'description'}
                    placeholder={
                      field.name === 'location'
                        ? 'Cidade, Estado'
                        : ''
                    }
                    placeholderTextColor="#ccc"
                  />
                  {errors[field.name] && touched[field.name] && (
                    <Text style={styles.error}>{errors[field.name]}</Text>
                  )}
                </View>
              ))}

              {/* Campo: Datas */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Datas da Atividade</Text>

                <TouchableOpacity
                  style={styles.addDateButton}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text style={styles.addDateButtonText}>Adicionar Data</Text>
                </TouchableOpacity>

                {/* Exibe as datas selecionadas */}
                {values.dates.length > 0 ? (
                  values.dates.map((date, index) => (
                    <View key={index} style={styles.dateItem}>
                      <Text>{formatDateToDisplay(date)}</Text>
                      <TouchableOpacity onPress={() => {
                        const updatedDates = values.dates.filter((_, i) => i !== index);
                        setFieldValue('dates', updatedDates);
                      }}>
                        <Text style={{ color: 'red', marginLeft: 8 }}>✕</Text>
                      </TouchableOpacity>
                    </View>
                  ))
                ) : (
                  <Text style={{ color: '#888', marginTop: 10 }}>Nenhuma data adicionada ainda.</Text>
                )}

                {/* Date Picker Modal */}
                {showDatePicker && (
                  <View style={styles.datePickerModal}>
                    <DatePicker
                      mode="calendar"
                      minimumDate={minimunDate()}
                      onSelectedChange={(date) => {
                        if (!values.dates.includes(date)) {
                          setFieldValue('dates', [...values.dates, date]);
                        }
                        setShowDatePicker(false);
                      }}                      
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
                )}

                {errors.dates && touched.dates && (
                  <Text style={styles.error}>{errors.dates}</Text>
                )}
              </View>

              {/* Campo: Categoria */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Categoria</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={values.category}
                    onValueChange={(itemValue) => setFieldValue('category', itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Selecione uma categoria" value="" />
                    <Picker.Item label="Passeios" value="Passeios" />
                    <Picker.Item label="Museus, arte e cultura" value="Museus, arte e cultura" />
                    <Picker.Item label="Entretenimento e ingressos" value="Entretenimento e ingressos" />
                    <Picker.Item label="Gastronomia e bebidas" value="Gastronomia e bebidas" />
                    <Picker.Item label="Natureza e vida ao ar livre" value="Natureza e vida ao ar livre" />
                    <Picker.Item label="Workshops e aulas" value="Workshops e aulas" />
                  </Picker>
                </View>
                {errors.category && touched.category && (
                  <Text style={styles.error}>{errors.category}</Text>
                )}
              </View>

              {/* Campo: Acessibilidades */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Acessibilidades</Text>
                {[
                  'Intérprete de libras',
                  'Tradução em braile',
                  'Adaptações para cadeirantes'
                ].map(option => (
                  <View key={option} style={styles.checkboxContainer}>
                    <Checkbox
                      style={styles.checkbox}
                      value={values.accessibilities.split(',').includes(option)}
                      onValueChange={(isChecked) => {
                        const selected = values.accessibilities ? values.accessibilities.split(',') : [];
                        let updated = [];
                        if (isChecked) {
                          updated = [...selected, option];
                        } else {
                          updated = selected.filter(item => item !== option);
                        }
                        setFieldValue('accessibilities', updated.join(','));
                      }}
                      color={Colors.detailsColor}
                    />
                    <Text style={styles.checkboxLabel}>{option}</Text>
                  </View>
                ))}
              </View>

              {/* Botão de Criar */}
              <TouchableOpacity
                style={[styles.button, isSubmitting && styles.buttonDisabled]}
                onPress={handleSubmit}
                disabled={isSubmitting}
              >
                <Text style={styles.buttonText}>
                  {isSubmitting ? 'Salvando...' : 'Criar Atração'}
                </Text>
              </TouchableOpacity>

            </View>
          )}
        </Formik>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: '500',
    color: Colors.mainColor,
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: Colors.mainColor,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  inputError: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    fontSize: 13,
    marginTop: 4,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
  },
  picker: {
    height: 50,
    color: Colors.mainColor,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkbox: {
    marginRight: 8,
    width: 20,
    height: 20,
    borderRadius: 4,
  },
  checkboxLabel: {
    fontSize: 16,
    color: Colors.mainColor,
  },
  button: {
    backgroundColor: Colors.detailsColor,
    paddingVertical: 14,
    borderRadius: 6,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addDateButton: {
    backgroundColor: Colors.detailsColor,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  addDateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  removeDateText: {
    color: 'red',
    fontWeight: 'bold',
  },
  datePickerModal: {
    marginTop: 20,
  },
});

export default CriarAtividade;

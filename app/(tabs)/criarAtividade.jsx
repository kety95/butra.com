import React from 'react';
import { View, Text, ScrollView, StyleSheet, Button, TextInput } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import banco from '../../factory/firebase';
import { collection, addDoc } from 'firebase/firestore';

const CriarAtividade = ({ navigation }) => {
  const atividadeSchema = Yup.object().shape({
    title: Yup.string().required('Título é obrigatório'),
    image: Yup.string().required('Imagem (base64) é obrigatória'),
    dates: Yup.string().required('Datas separadas por vírgula'),
    description: Yup.string(),
    location: Yup.string().required('Localização é obrigatória'),
    adress: Yup.string().required('Endereço é obrigatório'),
    category: Yup.string().required('Categoria é obrigatória'),
    accessibilities: Yup.string(),
    maxRegistrations: Yup.number().required('Capacidade máxima é obrigatória'),
  });

  const handleCreate = async (values, { setSubmitting, resetForm }) => {
    const fakeLoggedUserId = 2;
    try {
      const docRef = await addDoc(collection(banco, 'activities'), {
        title: values.title,
        image: values.image,
        dates: values.dates.split(',').map(date => date.trim()),
        description: values.description,
        location: values.location,
        adress: values.adress,
        category: values.category,
        accessibilities: values.accessibilities
          ? values.accessibilities.split(',').map(a => a.trim())
          : [],
        maxRegistrations: parseInt(values.maxRegistrations),
        organizer: fakeLoggedUserId,
        participants: [],
        reviews: []
      });
      alert('Atividade criada com sucesso!');
      resetForm();
    //   navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao criar atividade:', error);
      alert('Erro ao criar atividade');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Criar Nova Atividade</Text>
      <Formik
        initialValues={{
          title: '',
          image: '',
          dates: '',
          description: '',
          location: '',
          adress: '',
          category: '',
          accessibilities: '',
          maxRegistrations: '',
        }}
        validationSchema={atividadeSchema}
        onSubmit={handleCreate}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
          <View>
            {[
              { name: 'title', label: 'Título' },
              { name: 'image', label: 'Imagem (base64)' },
              { name: 'dates', label: 'Datas (separadas por vírgula)' },
              { name: 'description', label: 'Descrição' },
              { name: 'location', label: 'Localização' },
              { name: 'adress', label: 'Endereço' },
              { name: 'category', label: 'Categoria' },
              { name: 'accessibilities', label: 'Acessibilidades (separadas por vírgula)' },
              { name: 'maxRegistrations', label: 'Capacidade máxima' },
            ].map(field => (
              <View key={field.name} style={styles.inputContainer}>
                <Text style={styles.label}>{field.label}</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange(field.name)}
                  onBlur={handleBlur(field.name)}
                  value={values[field.name]}
                  multiline={field.name === 'description'}
                />
                {errors[field.name] && touched[field.name] && (
                  <Text style={styles.error}>{errors[field.name]}</Text>
                )}
              </View>
            ))}

            <Button onPress={handleSubmit} title={isSubmitting ? 'Salvando...' : 'Criar Atividade'} disabled={isSubmitting} />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  inputContainer: {
    marginBottom: 12
  },
  label: {
    fontSize: 16,
    marginBottom: 4
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10
  },
  error: {
    color: 'red',
    marginTop: 4
  }
});

export default CriarAtividade;

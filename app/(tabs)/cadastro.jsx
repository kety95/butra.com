import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import BackButton from '../../components/backButton';
import { auth } from '../../factory/firebase';
import banco from '../../factory/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Cadastro = ({ navigation }) => {
  const REQUIRED_FIELD = "Campo obrigatório";
  return (
    <>
      <BackButton title={""} />
      <View style={styles.container}>
        <Text style={styles.header}>Cadastro</Text>
        <Formik
          initialValues={{ name: '', email: '', password: '', phone: '' }}
          validate={values => {
            const errors = {};
            if (!values.email) {
              errors.email = REQUIRED_FIELD;
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'Email inválido';
            }
            if (!values.name) {
              errors.name = REQUIRED_FIELD;
            }
            if (!values.phone) {
              errors.phone = REQUIRED_FIELD;
            } else if (!/^\d{8,15}$/.test(values.phone)) {
              errors.phone = "Número inválido (8-15 dígitos)";
            }
            if (!values.password) {
              errors.password = REQUIRED_FIELD;
            } else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/.test(values.password)) {
              errors.password = "A senha deve ter no mínimo 8 caracteres, incluindo uma maiúscula, um número e um caractere especial.";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
              const user = userCredential.user;

              await setDoc(doc(banco, 'users', user.uid), {
                name: values.name,
                email: values.email,
                phone: values.phone,
                userType: 'participant',
              });

              navigation.navigate('pesquisa');
            } catch (error) {
              console.error('Erro ao cadastrar:', error);
              alert('Erro ao cadastrar');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, isSubmitting }) => (
            <View style={styles.formContainer}>
              <Text>Nome completo</Text>
              <TextInput
                style={styles.input}
                placeholder="Nome e sobrenome"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              {errors.name && <Text style={styles.error}>{errors.name}</Text>}

              <Text>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
              />
              {errors.email && <Text style={styles.error}>{errors.email}</Text>}

              <Text>Telefone</Text>
              <TextInput
                style={styles.input}
                placeholder="Telefone"
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
              />
              {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

              <Text>Senha</Text>
              <TextInput
                style={styles.input}
                placeholder="Senha"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry
              />
              {errors.password && <Text style={styles.error}>{errors.password}</Text>}

              <View style={styles.buttonContainer}>
                <Button title="Enviar" onPress={handleSubmit} disabled={isSubmitting} />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </>
  );
};

export default Cadastro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  formContainer: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
});

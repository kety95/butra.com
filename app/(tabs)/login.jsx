import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import BackButton from '../../components/backButton';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../factory/firebase';

const Login = ({ navigation }) => {
  const REQUIRED_FIELD = "Campo obrigatório";

  return (
    <>
      <BackButton title={""} />
      <View style={styles.container}>
        <Text style={styles.header}>Login</Text>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={values => {
            const errors = {};
            if (!values.email) {
              errors.email = REQUIRED_FIELD;
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'Email inválido';
            }
            if (!values.password) {
              errors.password = REQUIRED_FIELD;
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await signInWithEmailAndPassword(auth, values.email, values.password);
              navigation.navigate('pesquisa');
            } catch (error) {
              console.error('Erro ao fazer login:', error);
              Alert.alert('Erro de login', 'Email ou senha inválidos.');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, isSubmitting }) => (
            <View style={styles.formContainer}>
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
                <Button title="Entrar" onPress={handleSubmit} disabled={isSubmitting} />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </>
  );
};

export default Login;

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

import React, { useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, BackHandler } from 'react-native';
import { Formik } from 'formik';
import { useFocusEffect } from '@react-navigation/native';
import BackButton from '../../components/backButton';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../factory/firebase';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getDadosUsuario } from '../../services/firestore';
import { UserContext } from '../context/UserContext';
import Toast from 'react-native-toast-message';

const Login = ({ navigation }) => {
  const REQUIRED_FIELD = "Campo obrigatório";
  const { setUsuario } = useContext(UserContext);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  return (
    <>
      <BackButton title={""} customGoBack={() => navigation.navigate('iniciar')} />
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
              const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
              const userData = await getDadosUsuario();
              setUsuario({ ...userData, uid: auth.currentUser.uid });

              if (userData.userType === 'organizer') {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'minhasAtracoes' }],
                });
              } else {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'pesquisa' }],
                });
              }
            } catch (error) {
              console.error('Erro ao fazer login:', error);
              Toast.show({
                type: 'error',
                text1: 'Email ou senha inválidos',
              });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, isSubmitting }) => (
            <View style={styles.formContainer}>
              <Text>Email</Text>
              <View style={styles.inputWrapper}>
                <Icon name="email" size={20} color="#555" style={styles.icon} />
                <TextInput
                  style={styles.inputWithIcon}
                  placeholder="Email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                />
              </View>
              {errors.email && <Text style={styles.error}>{errors.email}</Text>}

              <Text>Senha</Text>
              <View style={styles.inputWrapper}>
                <Icon name="lock" size={20} color="#555" style={styles.icon} />
                <TextInput
                  style={styles.inputWithIcon}
                  placeholder="Senha"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                  underlineColorAndroid="transparent"
                />
              </View>
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  inputWithIcon: {
    flex: 1,
    paddingVertical: 10,
  },
  icon: {
    marginRight: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
});

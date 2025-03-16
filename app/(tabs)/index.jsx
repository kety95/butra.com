import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Iniciar from './iniciar'
import Cadastro from './cadastro'
import React from 'react'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="iniciar" options={{ headerShown: false }} component={Iniciar} />
        <Stack.Screen name="cadastro" component={Cadastro} />
      </Stack.Navigator>
  )
}

export default App

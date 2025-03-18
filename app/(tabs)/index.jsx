import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Iniciar from './iniciar'
import Cadastro from './cadastro'
import Pesquisa from './pesquisa'
import React from 'react'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="pesquisa" options={{ headerShown: false }} component={Pesquisa} />
        <Stack.Screen name="iniciar" options={{ headerShown: false }} component={Iniciar} />
        <Stack.Screen name="cadastro" options={{ headerShown: false }} component={Cadastro} />
      </Stack.Navigator>
  )
}

export default App

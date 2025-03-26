import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Iniciar from './iniciar'
import Cadastro from './cadastro'
import Pesquisa from './pesquisa'
import ListaAtividades from './listaAtividades'
import DetalhesAtividade from './detalhesAtividade'
import React from 'react'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: '#FFFFFF' }
        }}
      >
        <Stack.Screen name="pesquisa" options={{ headerShown: false }} component={Pesquisa} />
        <Stack.Screen name="iniciar" options={{ headerShown: false }} component={Iniciar} />
        <Stack.Screen name="cadastro" options={{ headerShown: false }} component={Cadastro} />
        <Stack.Screen name="listaatividades" options={{ headerShown: false }} component={ListaAtividades} />
        <Stack.Screen name="detalhesatividade" options={{ headerShown: false }} component={DetalhesAtividade} />
      </Stack.Navigator>
  )
}

export default App

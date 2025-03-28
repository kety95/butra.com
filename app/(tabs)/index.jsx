import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Iniciar from './iniciar'
import Cadastro from './cadastro'
import CadastroParceiro from './cadastroParceiro'
import Pesquisa from './pesquisa'
import ListaAtividades from './listaAtividades'
import DetalhesAtividade from './detalhesAtividade'
import React from 'react'
import Avaliacoes from './avaliacoes'
import MinhasAtividades from './minhasAtividades'
import Notificacoes from './notificacoes'
import Login from './login'
import { AtividadesProvider } from '../context/AtividadesContext';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AtividadesProvider>
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: '#FFFFFF' }
        }}
      >
        <Stack.Screen name="iniciar" options={{ headerShown: false }} component={Iniciar} />
        <Stack.Screen name="pesquisa" options={{ headerShown: false }} component={Pesquisa} />
        <Stack.Screen name="cadastro" options={{ headerShown: false }} component={Cadastro} />
        <Stack.Screen name="listaatividades" options={{ headerShown: false }} component={ListaAtividades} />
        <Stack.Screen name="detalhesatividade" options={{ headerShown: false }} component={DetalhesAtividade} />
        <Stack.Screen name="avaliacoes" options={{ headerShown: false }} component={Avaliacoes} />
        <Stack.Screen name="minhasAtividades" options={{ headerShown: false }} component={MinhasAtividades} />
        <Stack.Screen name="notificacoes" options={{ headerShown: false }} component={Notificacoes} />
        <Stack.Screen name="login" options={{ headerShown: false }} component={Login} />
        <Stack.Screen name="cadastroParceiro" options={{ headerShown: false }} component={CadastroParceiro} />
      </Stack.Navigator>
    </AtividadesProvider>
  )
}

export default App

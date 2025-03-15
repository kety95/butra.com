import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Iniciar from './iniciar'
import React from 'react'

const Telas = createNativeStackNavigator();

const iniciar = () => {
  return (
    <Iniciar/>
  )
}

export default iniciar

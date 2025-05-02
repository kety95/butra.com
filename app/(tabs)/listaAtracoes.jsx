import { View, Text } from 'react-native'
import React from 'react'
import Banner from '../../components/banner'

const ListaAtracoes = ({ navigation }) => {
  return (
    <View>
        <Banner tela="admin" navigation={navigation} onPress={() => navigation.navigate('')}/>
      <Text>L</Text>
    </View>
  )
}

export default ListaAtracoes
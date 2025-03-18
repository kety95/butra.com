import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Colors } from '../constants/Colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import React from 'react'

const Menu_sup = ({onPress}) => {
    let menu = ["Atrações", "Minhas atividades"]
    return (
        <View style={styles.menu_pesq}>
            <Text style={[styles.color, styles.menu_pesq_left]}>
                {menu[0]}
            </Text>
            
            <TouchableOpacity style={[styles.menu_pesq_right]} onPress={onPress}>
                <Icon name="ticket" size={24} style={styles.color} />
                <Text style={[styles.color, styles.underline]}>{menu[1]}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Menu_sup

const styles = StyleSheet.create({
menu_pesq:{
    flexDirection: 'row',
    color: 'withe',
    justifyContent: 'space-around',
    marginBottom: 10,
},
menu_pesq_left:{
    backgroundColor: Colors.secondColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
},
menu_pesq_right:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
},
underline: {
    textDecorationLine: 'underline',
    textShadowColor: 'wight',
    textShadowOffset: { width: 0, height: 2 },
  },
  color: {
    color: "white"
},
})
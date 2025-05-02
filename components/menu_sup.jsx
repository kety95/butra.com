import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Colors } from '../constants/Colors'
import TicketIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import SettingsIcon from 'react-native-vector-icons/Feather'
import AddIcon from 'react-native-vector-icons/Ionicons'

import React from 'react'

const Menu_sup = ({ onPress, tela }) => {
    let menu = {}

    if (tela === "admin") {
        menu = {item1: "Gerenciar Atrações", 
            item2: "Criar Atração",
            icon: <AddIcon name="add" size={24} style={styles.color} />
        }
    }else if (tela === "pesquisa"){
        menu = {item1: "Atrações",
            item2: "Minhas atividades",
            icon: <TicketIcon name="ticket" size={24} style={styles.color} />
        }
    }
    
    return (
        <View style={styles.menu}>
            <Text style={[styles.color, styles.menu_left]}>
                {menu.item1}
            </Text>

            <TouchableOpacity style={[styles.menu_right]} onPress={onPress}>
                {menu.icon}
                <Text style={[styles.color, styles.underline]}>{menu.item2}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Menu_sup

const styles = StyleSheet.create({
    menu: {
        flexDirection: 'row',
        color: 'withe',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    menu_left: {
        backgroundColor: Colors.secondColor,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderColor: 'white',
        borderRadius: 12,
        borderWidth: 1,
    },
    menu_right: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    underline: {
        textDecorationLine: 'underline',
        textShadowOffset: { width: 0, height: 2 },
    },
    color: {
        color: "white"
    },
})
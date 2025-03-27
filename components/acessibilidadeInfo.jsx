import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import IconCheck from 'react-native-vector-icons/Feather';
import IconChair from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../constants/Colors';

const AcessibilidadeInfo = ({ accessibilities }) => {
    return (
        <View style={styles.acessibilidadeCont}>
            {accessibilities.length > 0 ? (
                accessibilities.map((item, index) => (
                    <View key={index} style={styles.acessibilidadeItem}>
                        <IconChair name="wheelchair" color={Colors.detailsColor} size={18} />
                        <Text style={[styles.acessibilidade, { color: Colors.detailsColor }]}>{item}</Text>
                        <IconCheck name="check" color={Colors.detailsColor} size={18} />
                    </View>
                ))
            ) : (
                <View style={styles.acessibilidadeItem}>
                    <IconChair name="wheelchair" color="gray" size={18} />
                    <Text style={[styles.acessibilidade, { color: 'gray' }]}>Sem acessibilidade</Text>
                    <Icon name="close" color="gray" size={18} />
                </View>
            )}
        </View>
    );
};

export default AcessibilidadeInfo;

const styles = StyleSheet.create({
    acessibilidadeCont: {
        paddingTop: 20,
    },
    acessibilidadeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 5,
    },
    acessibilidade: {
        fontSize: 16,
    }
});

import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const BackButton = ({ title, customGoBack }) => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        if (customGoBack) {
            customGoBack();
        } else {
            navigation.goBack();
        }
    };

    return (
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Icon name="arrowleft" color="white" size={24} />
            <Text style={styles.backTitle}>{title}</Text>
        </TouchableOpacity>
    )
}

export default BackButton

const styles = StyleSheet.create({
    backButton: {
        backgroundColor: Colors.mainColor,
        flexDirection: 'row',
        padding: 15,
        gap: 15,
        paddingLeft: 20,
    },
    backTitle: {
        color: 'white',
        fontSize: 17,
    },
})
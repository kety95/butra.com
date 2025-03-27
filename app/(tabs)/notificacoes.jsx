import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import BackButton from '../../components/backButton';


const Notificacoes = () => {
    return (
        <>
            <BackButton title="Notificações" />
            <View style={styles.container}>
                <Image source={require('../../assets/images/Character.svg')} style={styles.image} />
                <Text style={styles.txt}>Você não possui novas noficações</Text>
            </View>
        </>
    );
};

export default Notificacoes;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        marginTop: 100,
        marginBottom: 30,
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    txt: {
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 15,
        width: 250,
        textAlign: 'center',
    },
});
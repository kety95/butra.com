import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import BackButton from '../../components/backButton';

const MinhasAtividades = () => {
    return (
        <>
            <BackButton title="Minhas atividades" />
            <View style={styles.container}>
                <Image source={require('../../assets/images/semAtiv.svg')} style={styles.image} />
                <Text style={styles.pergunta}>Qual será a próxima atividade?</Text>
                <Text style={styles.txt}>Você ainda não se inscreveu em nenhuma atividade. Quando se inscrever, ela aparecerá aqui</Text>
            </View>
            
        </>
    );
};

export default MinhasAtividades;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    pergunta: {
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 15,
    },
    txt: {
        textAlign: 'center',
        fontSize: 16,
    }
});

import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import BackButton from '../../components/backButton';
import { useAtividades } from '../context/AtividadesContext';
import CardAtividadeInscrita from '@/components/cardAtividadeInscrita';

const MinhasAtividades = () => {
    const { minhasAtividades } = useAtividades();

    return (
        <>
            <BackButton title="Minhas atividades" />
            <View>
                {minhasAtividades.length === 0 ? (
                    <View style={styles.container}>
                        <Image source={require('../../assets/images/semAtiv.svg')} style={styles.image} />
                        <Text style={styles.pergunta}>Qual será a próxima atividade?</Text>
                        <Text style={styles.txt}>
                            Você ainda não se inscreveu em nenhuma atividade. Quando se inscrever, ela aparecerá aqui.
                        </Text>
                    </View>
                ) : (
                    <View>
                        <FlatList
                            data={minhasAtividades}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.atividadeContainer}>
                                    <CardAtividadeInscrita {...item} />
                                </View>
                            )}
                        />
                    </View>
                )}
            </View>
        </>
    );
};

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
    },
    atividadeContainer: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        width: '100%',
    },
});

export default MinhasAtividades;

import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import IconLocation from 'react-native-vector-icons/EvilIcons';
import IconStar from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../constants/Colors';
import AcessibilidadeInfo from '../../components/acessibilidadeInfo';
import BackButton from '../../components/backButton';
import { useAtividades } from '../context/AtividadesContext';

const DetalhesAtividade = ({ route }) => {
    const navigation = useNavigation();
    const { atividade, reviewsCount } = route.params;
    const [isExpanded, setIsExpanded] = useState(false);

    const { minhasAtividades, inscreverAtividade } = useAtividades();

    // Verifica se o usuário já está inscrito
    const jaInscrito = minhasAtividades.some((a) => a.id === atividade.id);

    const handleInscricao = () => {
        if (!jaInscrito) {
            inscreverAtividade(atividade);
            alert('Você se inscreveu com sucesso!');
            navigation.navigate('MinhasAtividades');
        }
    };

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <BackButton title={atividade.title} />

            <Image source={{ uri: atividade.image }} style={styles.image} />

            <View style={styles.container}>
                <Text style={styles.title}>{atividade.title}</Text>

                <View style={styles.contAvaliacoes}>
                    <IconStar name="star" size={20} color={Colors.stars} />
                    <Text style={styles.qtdAvaliacoes}>{reviewsCount} Avaliações </Text>
                </View>

                <TouchableOpacity
                    style={styles.btnAvalicoes}
                    onPress={() => navigation.navigate('avaliacoes', { atividade, reviewsCount })}
                >
                    <Text style={styles.btnTxtAvaliacoes}>
                        Ver todas as avaliações
                    </Text>
                </TouchableOpacity>

                <Text style={styles.h2}>Descrição</Text>

                <Text style={styles.description}>
                    {isExpanded ? atividade.description : `${atividade.description?.substring(0, 190)}...`}
                </Text>

                <TouchableOpacity onPress={toggleDescription} style={styles.toggleButton}>
                    <Text style={styles.toggleButtonText}>{isExpanded ? 'Ler menos' : 'Ler mais'}</Text>
                </TouchableOpacity>

                <AcessibilidadeInfo accessibilities={atividade.accessibilities} />

                <Text style={styles.h2}>Localização</Text>
                <View style={styles.adress}>
                    <Text style={styles.toggleButtonText}>Endereço</Text>
                    <IconLocation name="location" color={Colors.detailsColor} size={20} />
                </View>
                <Text>{atividade.adress}</Text>

                <TouchableOpacity
                    style={[styles.btn, jaInscrito && styles.btnDisabled]}
                    onPress={handleInscricao}
                    disabled={jaInscrito}
                >
                    <Text style={styles.btn_txt}>
                        {jaInscrito ? 'Já inscrito' : 'Me inscrever'}
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default DetalhesAtividade;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        marginBottom: 600,
    },
    image: {
        width: '100%',
        height: 190,
    },
    title: {
        fontSize: 26,
        fontWeight: '600',
        marginVertical: 5,
        fontFamily: 'System',
    },
    description: {
        fontSize: 16,
    },
    toggleButton: {
        marginTop: 4,
    },
    toggleButtonText: {
        color: Colors.detailsColor,
        fontWeight: '500',
        fontSize: 16,
    },
    h2: {
        fontSize: 18,
        fontWeight: '500',
        marginVertical: 10,
    },
    adress: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 5,
    },
    btn: {
        marginTop: 15,
        borderRadius: 4,
        backgroundColor: "#1E90FE",
        paddingVertical: 10,
        paddingHorizontal: 25,
        alignItems: "center",
        marginBottom: 8,
        alignSelf: "flex-end"
    },
    btn_txt: {
        color: "white",
        textAlign: "center",
        fontSize: 16,
        fontWeight: '500',
    },
    btnDisabled: {
        backgroundColor: "#ccc",
    },
    contAvaliacoes: {
        fontWeight: '500',
        flexDirection: 'row',
        gap: 10,
        marginTop: 10,
    },
    qtdAvaliacoes: {
        fontWeight: '500',
    },
    btnTxtAvaliacoes: {
        color: Colors.detailsColor,
        fontWeight: '500',
        paddingLeft: 25,
    }
});

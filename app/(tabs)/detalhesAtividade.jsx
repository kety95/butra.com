import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import IconLocation from 'react-native-vector-icons/EvilIcons';
import IconStar from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../constants/Colors';
import AcessibilidadeInfo from '../../components/acessibilidadeInfo';
import BackButton from '../../components/backButton';
import { useMinhasAtividades } from '../context/MinhasAtividadesContext';
import DateCard from '../../components/dateCard';
import { getReviewsCountByActivity } from '../../services/firestore'

const DetalhesAtividade = ({ route }) => {
    const navigation = useNavigation();
    const { atividade, mostrarBotaoInscricao = true } = route.params;
    const [reviewsCount, setReviewsCount] = useState(0);

    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const { minhasAtividades, inscreverAtividade } = useMinhasAtividades();

    useEffect(() => {
        const fetchReviewsCount = async () => {
            try {
                const count = await getReviewsCountByActivity(atividade.id);
                setReviewsCount(count);
            } catch (error) {
                console.error('Erro ao buscar avaliações:', error);
            }
        };

        fetchReviewsCount();
    }, [atividade.id]);

    const jaInscrito = selectedDate && minhasAtividades.some(
        (a) => a.id === atividade.id && a.selectedDate === selectedDate
    );

    const handleInscricao = async () => {
        if (!selectedDate) {
            alert("Selecione uma data.");
            return;
        }

        if (jaInscrito) {
            alert("Você já está inscrito nessa atividade para esta data.");
            return;
        }

        try {
            await inscreverAtividade(atividade, selectedDate);
            alert('Você se inscreveu com sucesso!');
            navigation.navigate('minhasAtividades');
        } catch (error) {
            console.error("Erro ao se inscrever:", error);
            alert("Erro ao se inscrever. Tente novamente.");
        }
    };


    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <BackButton title={atividade.title} />

            <ScrollView contentContainerStyle={styles.scrollContainer}>
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

                    {atividade.dates && atividade.dates.length > 0 && (
                        <>
                            <Text style={styles.h2}>Datas</Text>
                            <DateCard dates={atividade.dates} onSelectDate={setSelectedDate} />

                            {mostrarBotaoInscricao && (
                                <TouchableOpacity
                                    style={[styles.btn, jaInscrito && styles.btnDisabled]}
                                    onPress={handleInscricao}
                                    disabled={jaInscrito}
                                >
                                    <Text style={styles.btn_txt}>
                                        {jaInscrito ? 'Já inscrito' : 'Me inscrever'}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </>
                    )}

                </View>
            </ScrollView>
        </>
    );
};

export default DetalhesAtividade;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
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
    },
});

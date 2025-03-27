import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import BackButton from '../../components/backButton';
import ReviewCard from '../../components/reviewCard';
import IconStar from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../constants/Colors';

const Avaliacoes = () => {
    const route = useRoute();
    const { atividade, reviewsCount } = route.params;

    const [reviews, setReviews] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3000/reviews?activity=${atividade.id}`)
            .then(res => res.json())
            .then(data => {
                setReviews(data)
            })
            .catch(error => console.error('Erro ao buscar avaliações:', error));

        fetch('http://localhost:3000/users')
            .then(res => res.json())
            .then(data => {
                setUsers(data);
            })
            .catch(error => console.error('Erro ao buscar usuários:', error))
            .finally(() => setLoading(false));
    }, [atividade.id]);

    const getUserById = (userId) => {
        return users.find(user => user.id === userId) || { firstName: "Usuário", lastName: "Desconhecido" };
    };
    

    return (
        <>
            <BackButton title="Avaliações" />

            <View style={styles.container}>
                <Text>O que os visitantes estão dizendo sobre</Text>
                <Text style={styles.title}>{atividade.title}</Text>

                <View style={styles.contAvaliacoes}>
                    <IconStar name="star" size={20} color={Colors.stars} />
                    <Text style={styles.qtdAvaliacoes}>{reviewsCount} Avaliações </Text>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : users.length === 0 ? (
                    <Text style={styles.noReviews}>Carregando usuários...</Text>
                ) : reviews.length === 0 ? (
                    <Text style={styles.noReviews}>Nenhuma avaliação encontrada.</Text>
                ) : (
                    <FlatList
                        data={reviews}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => {
                            const user = getUserById(item.participant);
                            return <ReviewCard review={item} user={user} />;

                        }}
                    />
                )}

            </View>
        </>
    );
};

export default Avaliacoes;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    contAvaliacoes: {
        fontWeight: '500',
        flexDirection: 'row',
        gap: 10,
        marginTop: 10,
        marginBottom: 20,
    },
    qtdAvaliacoes: {
        fontWeight: '500',
    },
    reviewsCount: {
        fontSize: 16,
        marginBottom: 15,
    },
    noReviews: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
    },
});

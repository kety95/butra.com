import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import BackButton from '../../components/backButton';
import ReviewCard from '../../components/reviewCard';
import IconStar from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../constants/Colors';
import { getReviewsByActivity, getUsersByRefs } from '../../services/firestore';
import Toast from 'react-native-toast-message';

const Avaliacoes = () => {
  const route = useRoute();
  const { atividade, reviewsCount } = route.params;

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviewsAndUsers = async () => {
      try {
        const fetchedReviews = await getReviewsByActivity(atividade.id);

        const userRefs = [
          ...new Set(fetchedReviews.map((r) => r.participant).filter(Boolean))
        ];

        let fetchedUsers = [];

        if (userRefs.length > 0) {
          fetchedUsers = await getUsersByRefs(userRefs);
        }

        const reviewsWithUsers = fetchedReviews.map((review) => {
        const user = fetchedUsers.find((u) => u.id === review.participant?.id);
          return {
            ...review,
            user: user || { name: 'Usuário Desconhecido' },
          };
        });

        setReviews(reviewsWithUsers);
      } catch (error) {
        console.error('Erro ao buscar avaliações ou usuários:', error);
              Toast.show({
                type: 'error',
                text1: 'Erro ao carregar avaliações.',
              });
      } finally {
        setLoading(false);
      }
    };

    fetchReviewsAndUsers();
  }, [atividade.id]);

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
        ) : reviews.length === 0 ? (
          <Text style={styles.noReviews}>Nenhuma avaliação encontrada.</Text>
        ) : (
          <FlatList
            data={reviews}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ReviewCard review={item} user={item.user} />
            )}
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

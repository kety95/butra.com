import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IconStar from 'react-native-vector-icons/FontAwesome';
import UserAvatar from './userAvatar';

const ReviewCard = ({ review, user = { firstName: "Usuário", lastName: "Desconhecido" } }) => {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <UserAvatar name={user.firstName} />
                <Text style={styles.userName}>
                    {user.firstName} {user.lastName}
                </Text>
            </View>

            <View style={styles.starsContainer}>
                {[...Array(5)].map((_, index) => (
                    <IconStar
                        key={index}
                        name="star"
                        size={18}
                        color={index < review.stars ? 'gold' : 'gray'}
                    />
                ))}
            </View>
            <Text style={styles.reviewDescription}>{review.description}</Text>
        </View>
    );
};

export default ReviewCard;

const styles = StyleSheet.create({
    card: {
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#CBCBCB',
        borderRadius: 10,
        borderStyle: 'solid',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    userName: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 10,
    },
    starsContainer: {
        flexDirection: 'row',
        marginVertical: 15,
        gap: 3,
    },
    reviewDescription: {
        fontSize: 14,
        color: '#555',
    },
});


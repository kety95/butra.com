import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

const UserAvatar = ({ name }) => {
    const firstLetter = name ? name.charAt(0).toUpperCase() : '?';

    return (
        <View style={styles.avatar}>
            <Text style={styles.letter}>{firstLetter}</Text>
        </View>
    );
};

export default UserAvatar;

const styles = StyleSheet.create({
    avatar: {
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: Colors.mainColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    letter: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

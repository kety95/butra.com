import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

const UserAvatar = ({ name, avatarStyle, letterStyle }) => {
    const firstLetter = name ? name.charAt(0).toUpperCase() : '?';
  
    return (
      <View style={[styles.avatar, avatarStyle]}>
        <Text style={[styles.letter, letterStyle]}>{firstLetter}</Text>
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

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../constants/Colors';

const formatDate = (dateString) => {
    const date = new Date(`${dateString}T12:00:00`);
    const optionsDay = { weekday: 'short' };
    const optionsMonth = { month: 'short' };

    return {
        dayName: date.toLocaleDateString('pt-BR', optionsDay).replace('.', ''),
        dayNumber: date.getDate(),
        monthName: date.toLocaleDateString('pt-BR', optionsMonth).replace('.', ''),
    };
};

const DateCard = ({ dates, onSelectDate }) => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleSelectDate = (date) => {
        setSelectedDate(date);
        if (onSelectDate) {
            onSelectDate(date);
        }
    };

    const sortedDates = [...dates].sort((a, b) => new Date(a) - new Date(b));

    return (
        <View style={styles.datesCont}>
            {sortedDates.length > 0 ? (
                sortedDates.map((item, index) => {
                    const { dayName, dayNumber, monthName } = formatDate(item);
                    const isSelected = selectedDate === item;

                    return (
                        <TouchableOpacity 
                            key={index} 
                            style={[styles.dateItem, isSelected && styles.selectedDate]}
                            onPress={() => handleSelectDate(item)}
                        >
                            <Text style={styles.dayName}>{dayName}</Text>
                            <Text style={styles.dayNumber}>{dayNumber}</Text>
                            <Text style={styles.monthName}>{monthName}</Text>
                        </TouchableOpacity>
                    );
                })
            ) : (
                <View style={styles.dateItem}>
                    <Text style={[styles.dayName, { color: 'gray' }]}>Indisponível</Text>
                </View>
            )}
        </View>
    );
};

export default DateCard;

const styles = StyleSheet.create({
    datesCont: {
        flexDirection: 'row',
        gap: 10,
        padding: 10,
        flexWrap: 'wrap',
    },
    dateItem: {
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        borderColor: Colors.detailsColor,
        borderWidth: 2,
        color: Colors.detailsColor,
    },
    selectedDate: {
        backgroundColor: Colors.detailsColor,
    },
    dayName: {
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    dayNumber: {
        fontSize: 20,
        fontWeight: '500',
    },
    monthName: {
        fontSize: 14,
        textTransform: 'uppercase',
    },
});

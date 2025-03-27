import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import IconLocation from 'react-native-vector-icons/EvilIcons';
import { Colors } from '../../constants/Colors';
import AcessibilidadeInfo from '../../components/acessibilidadeInfo';

const DetalhesAtividade = ({ route }) => {
    const navigation = useNavigation();
    const { atividade } = route.params;

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Icon name="arrowleft" color="white" size={24} />
                <Text style={styles.backTitle}>{atividade.title}</Text>
            </TouchableOpacity>

            <Image source={{ uri: atividade.image }} style={styles.image} />

            <View style={styles.container}>
                <Text style={styles.title}>{atividade.title}</Text>

                

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
                    style={styles.btn}
                    onPress={() => alert('Você se inscreveu com sucesso!')}
                >
                    <Text style={styles.btn_txt}>Me inscrever</Text>
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
    backButton: {
        backgroundColor: Colors.mainColor,
        flexDirection: 'row',
        padding: 15,
        gap: 15,
        paddingLeft: 20,
    },
    backTitle: {
        color: 'white',
        fontSize: 17,
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
        alignItems: "right",
        marginBottom: 8,
        alignSelf: "flex-end"
    },
    btn_txt: {
        color: "white",
        textAlign: "center",
        fontSize: 16,
        fontWeight: '500',
    },
});



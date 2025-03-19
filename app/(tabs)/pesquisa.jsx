import { View, TextInput, StyleSheet, TouchableOpacity, Text, Modal } from 'react-native';
import { Colors } from '../../constants/Colors';
import Banner from '../../components/banner/banner';
import React, { useState } from 'react';
import IconSearch from 'react-native-vector-icons/AntDesign';
import IconCalendar from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-modern-datepicker';
import { getFormatedDate } from 'react-native-modern-datepicker';

const Pesquisa = ({ navigation }) => {
    const today = new Date();
    const startDate = getFormatedDate(today.setDate(today.getDate() + 1), 'YYYY/MM/DD');

    const [open, setOpen] = useState(false);
    const [date, setDate] = useState('');

    function handleOnPress() {
        setOpen(true);
    }


    function handleChange(propDate) {
        if (propDate !== date) {
            setDate(propDate);
            setOpen(false);
        }
    }

    function handleClearDate() {
        setDate('');
        setOpen(false);
    }

    return (
        <View>
            <Banner tela="pesquisa" navigation={navigation} />
            <View style={styles.fundo}>
                <View style={styles.searchCity}>
                    <IconSearch name="search1" size={24} />
                    <TextInput
                        style={styles.input}
                        placeholder="Para onde você vai?"
                        onChangeText={(text) => console.log(text)}
                    />
                </View>

                <TouchableOpacity style={styles.searchDate} onPress={handleOnPress}>
                    <IconCalendar name="calendar" size={24} />
                    <TextInput
                        style={styles.input}
                        placeholder="Qualquer data"
                        value={date || 'Qualquer data'}
                        editable={false}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btn_txt}>Pesquisar</Text>
                </TouchableOpacity>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={open}
                    onRequestClose={() => setOpen(false)}    
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                        <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.clearButton} onPress={handleClearDate}>
                                    <Text style={styles.clearText}>Limpar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.closeButton} onPress={() => setOpen(false)}>
                                    <Text style={styles.closeText}>Fechar</Text>
                                </TouchableOpacity>
                            </View>
                            <DatePicker
                                mode="calendar"
                                minimumDate={startDate}
                                selected={date}
                                onSelectedChange={handleChange}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
};
export default Pesquisa;


const margin = 8;
const styles = StyleSheet.create({
    fundo:{
        backgroundColor: Colors.backSearchColor,
        margin: 15,
        marginTop: 20,
        borderRadius: 16,
    },
    searchCity:{
        backgroundColor: "white",
        marginTop: margin,
        marginHorizontal: margin,
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 2,
        paddingLeft: 6,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    searchDate:{
        backgroundColor: "white",
        marginHorizontal: margin,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 6,
        paddingLeft: 6,
    },
    btn:{
        marginHorizontal: margin,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        backgroundColor: "#1E90FE",
        padding: 10,
        textAlign: "center",
        marginBottom: margin,
    },
    btn_txt:{
        color: "white",
        textAlign: "center",
        fontSize: 16,
        fontWeight: 500,
    },
    input:{
        flex: 1,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
        gap: 10,
    },
    clearButton: {
        backgroundColor: '#ff6666',
        padding: 10,
        borderRadius: 5,
    },
    closeButton: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    clearText: {
        color: 'white',
        fontWeight: 'bold',
    },
    closeText: {
        color: 'black',
        fontWeight: 'bold',
    },

}) 
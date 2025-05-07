import { View, TextInput, StyleSheet, TouchableOpacity, Text, Modal } from 'react-native';
import { Colors } from '../../constants/Colors';
import Banner from '../../components/banner';
import React, { useState } from 'react';
import IconSearch from 'react-native-vector-icons/AntDesign';
import IconCalendar from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-modern-datepicker';
import Autocomplete from 'react-native-autocomplete-input';
import { formatDateToDisplay, minimunDate } from '../utils/dateUtils';

const capitais = [
    "Buenos Aires", "São Paulo", "Brasília", "Paris", "Londres", "Roma", "Madrid", 
    "Lisboa", "Berlim", "Moscou", "Pequim", "Tóquio", "Washington", "Ottawa"
];

const Pesquisa = ({ navigation }) => {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState('');

    function handleOnPress() {
        setOpen(true);
    }


    function handleChange(propDate) {
        if (propDate !== date) {
            const [year, month, day] = propDate.split('/');
            const formatted = `${year}-${month}-${day}`;
            setDate(formatted);
        }
    }

    function handleClearDate() {
        setDate('');
        setOpen(false);
    }      

    const [query, setQuery] = useState('');
    const [filteredCapitais, setFilteredCapitais] = useState([]);

    function handleSearch(text) {
        setQuery(text);
        if (text.length > 0) {
            const matches = capitais.filter(capital => 
                capital.toLowerCase().startsWith(text.toLowerCase())
            );
            setFilteredCapitais(matches);
        } else {
            setFilteredCapitais([]);
        }
    }

    function handleSelectCity(city) {
        setQuery(city);
        setFilteredCapitais([]);
    }

    return (
        <View>
            <Banner tela="pesquisa" navigation={navigation} onPress={() => navigation.navigate('pesquisa')}/>
            
            <View style={styles.fundo}>
                <View style={styles.searchCity}>
                    <IconSearch name="search1" size={24} />
                    <Autocomplete style={styles.autocomplete}
                        data={filteredCapitais}
                        value={query}
                        onChangeText={handleSearch}
                        placeholder="Para onde você vai?"
                        flatListProps={{
                            keyboardShouldPersistTaps: "handled",
                            data: filteredCapitais,
                            keyExtractor: (item, index) => index.toString(),
                            renderItem: ({ item }) => (
                                <TouchableOpacity onPress={() => handleSelectCity(item)}>
                                    <Text style={{ padding: 10}}>{item}</Text>
                                </TouchableOpacity>
                            ),
                        }}
                        containerStyle={{ flex: 1 }}
                        inputContainerStyle={{ borderWidth: 0, backgroundColor: 'white' }}
                    />

                </View>

                <TouchableOpacity style={styles.searchDate} onPress={handleOnPress}>
                    <IconCalendar name="calendar" size={24} />
                    <TextInput
                        style={styles.input}
                        placeholder="Qualquer data"
                        value={date ? formatDateToDisplay(date) : 'Qualquer data'}
                        editable={false}
                    />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.btn} 
                    onPress={() => navigation.navigate('listaatividades', { date, location: query })}
                >
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
                                minimumDate={minimunDate()}
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
        paddingRight: 1.5,
        paddingBottom: 2,
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
    autocomplete: {
        width: '80%',
    }
}) 
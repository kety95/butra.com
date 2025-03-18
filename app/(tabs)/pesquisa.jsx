import { View, TextInput, StyleSheet, Button, TouchableOpacity, Text } from 'react-native'
import { Colors } from '../../constants/Colors'
import Banner from '../../components/banner/banner'
import React from 'react'
import IconSearch from 'react-native-vector-icons/AntDesign'
import IconCalendar from 'react-native-vector-icons/Feather'
import { Formik } from 'formik';

const Pesquisa = ({navigation}) => {
  return (
    <View>
        <Banner tela="pesquisa" navigation={navigation}/>
        <Formik>
            <View style={styles.fundo}>
                <View style={styles.searchCity}>
                    <IconSearch name="search1" size={24}/>
                    <TextInput
                        style={styles.input}
                        placeholder="Para onde você vai?"
                        // onChangeText={handleChange('name')}
                        // onBlur={handleBlur('name')}
                        // value={values.name}
                    />
                </View>

                <View style={styles.searchDate}>
                    <IconCalendar name="calendar" size={24}/>
                    <TextInput
                        style={styles.input}
                        placeholder="Qualquer data"
                        // onChangeText={handleChange('name')}
                        // onBlur={handleBlur('name')}
                        // value={values.name}
                    />
                </View>

                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btn_txt}>Pesquisar</Text>
                    </TouchableOpacity>
            </View>
        </Formik>
    </View>
  )
}

export default Pesquisa

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
    }
}) 
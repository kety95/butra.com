import { StyleSheet, View, Text } from 'react-native';
import Menu_sup from './menu_sup'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '../constants/Colors';

const Banner = ({tela, navigation}) => {
    if(tela === "pesquisa"){
        return (
            <View style={styles.container}>
                <View style={styles.banner_pesq}>
                    <Text type="title" style={styles.txt_pesq}>Butra.com</Text>
                    <Icon name="bell-outline" size={24} style={styles.color}
                        onPress={() => navigation.navigate('notificacoes')}
                    />
                </View>
                <Menu_sup onPress={() => navigation.navigate('minhasAtividades')}/>
            </View>
        )
    }else{
        return (
            <View style={styles.container}>
                <View style={styles.banner}>
                    <Text onPress={() => navigation.navigate('pesquisa')} type="title" style={styles.txt}>Butra.com</Text>
                </View>
            </View>
        )
    }
};

export default Banner;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: Colors.mainColor,
    },
    banner: {
        width: '100%',
        backgroundColor: Colors.mainColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 50,
        paddingHorizontal: 20,
    },
    txt: {
        color: 'white',
        fontSize: 24,
        fontWeight: '500',
    },
    banner_pesq: {
        width: '100%',
        backgroundColor: Colors.mainColor,
        alignItems: 'center',
        justifyContent: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: "row"
    },
    txt_pesq: {
        flex: 1,
        textAlign: "center",
        color: "white",
        fontSize: 20,
        fontWeight: '500',
        paddingLeft: '5%',
    },
    color: {
        color: "white"
    },
});

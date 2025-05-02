import { StyleSheet, View, Text } from 'react-native';
import Menu_sup from './menu_sup';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UserIcon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../constants/Colors';

const Banner = ({ tela, navigation }) => {
    if (tela === "iniciar") {
        return (
            <View style={styles.container}>
                <View style={styles.banner}>
                    <Text style={styles.txt}>Butra.com</Text>
                </View>
            </View>
        );
    }

    const handlePress = () => {
        if (tela === "admin") {
            navigation.navigate('criarAtividade');
        } else {
            navigation.navigate('minhasAtividades');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.banner_pesq}>
                <UserIcon
                    name="user-circle"
                    size={24}
                    style={styles.color}
                    onPress={() => navigation.navigate('userData')}
                />
                <Text style={styles.txt_pesq}>Butra.com</Text>
                <Icon
                    name="bell-outline"
                    size={24}
                    style={styles.color}
                    onPress={() => navigation.navigate('notificacoes')}
                />
            </View>
            <Menu_sup tela={tela} onPress={handlePress} />
        </View>
    );
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    txt_pesq: {
        flex: 1,
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        fontWeight: '500',
        paddingLeft: '5%',
    },
    color: {
        color: 'white',
    },
});

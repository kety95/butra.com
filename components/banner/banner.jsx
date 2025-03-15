import { StyleSheet, View, Text } from 'react-native';

const Banner = () => {
    return (
        <View style={styles.container}>
            <View style={styles.banner}>
                <Text type="title" style={styles.txt}>Butra.com</Text>
            </View>
        </View>
    );
};

export default Banner;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },
    banner: {
        width: '100%',
        backgroundColor: '#003B88',
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
});

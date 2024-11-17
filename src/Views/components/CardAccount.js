import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import EvilIcons from '@expo/vector-icons/EvilIcons';

export default function CardAccount2({ service, userName, imgUrl }) {
    return (
        <View style={styles.card}>
            <Image style={styles.logo} source={imgUrl} />
            <View style={styles.infoContainer}>
                <Text style={styles.service}>{service}</Text>
                <Text style={styles.username}>{userName}</Text>
            </View>
            <EvilIcons name="arrow-right" size={26} color="#CCCCCC" />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',  // fundo cinza claro
        padding: 15,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        marginVertical: 10,
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 10,  // cantos arredondados para a imagem
    },
    infoContainer: {
        flex: 1,
        marginLeft: 15,
    },
    service: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 4,
    },
    username: {
        color: '#777777',
        fontSize: 14,
    },
});

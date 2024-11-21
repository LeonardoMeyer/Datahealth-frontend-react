import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import EvilIcons from '@expo/vector-icons/EvilIcons';

export default function CardAccount2({ record }) {
    return (
        <View style={styles.card}>
            {/* Exibindo a imagem do exame */}
            <Image style={styles.logo} source={{ uri: record.exam }} />

            <View style={styles.infoContainer}>
                <Text style={styles.service}>Relatório: {record.report}</Text>
                <Text style={styles.username}>Receita: {record.recipe}</Text>
                <Text style={styles.date}>Data: {new Date(record.date).toLocaleDateString()}</Text>
            </View>

            {/* Ícone de seta */}
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
    date: {
        fontSize: 12,
        color: '#555555',
        marginTop: 4,
    },
});

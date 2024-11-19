import { View, StyleSheet, Text, TextInput, Alert } from 'react-native';
import { useState } from "react";
import Button from '../Views/components/Button.js';
import { useRouter } from 'expo-router';

export default function SignUp() {
    const router = useRouter();

    const [txtName, setTxtName] = useState('');
    const [txtEmail, setTxtEmail] = useState('');
    const [txtPass, setTxtPass] = useState('');
    const [txtAvatar, setTxtAvatar] = useState('');
    const [txtAge, setTxtAge] = useState('');
    const [txtEthnicity, setTxtEthnicity] = useState('');
    const [txtGender, setTxtGender] = useState('');
    const [txtBloodType, setTxtBloodType] = useState('');  // Added Blood Type state

    const handleCreateAccount = async () => {
        const user = {
            name: txtName,
            email: txtEmail,
            pass: txtPass,
            avatar: txtAvatar,
            age: parseInt(txtAge),
            ethnicity: txtEthnicity,
            gender: txtGender,
            Blood_type: txtBloodType,  // Include blood_type here
        };

        const response = await fetch('http://localhost:3000/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            Alert.alert('Usuário Criado com Sucesso!');
            setTxtName('');
            setTxtEmail('');
            setTxtPass('');
            setTxtAvatar('');
            setTxtAge('');
            setTxtEthnicity('');
            setTxtGender('');
            setTxtBloodType('');  // Clear Blood Type field
            router.back();
        } else {
            const data = await response.json();
            Alert.alert('Erro ao Criar Usuário', data?.error || 'Erro desconhecido');
            console.log(data?.error);
        }
    }

    return (
        <View style={styles.container}>
            <Text>Nome:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setTxtName}
                value={txtName}
                placeholder='Digite seu nome...'
                placeholderTextColor='#DDDDDD'
            />

            <Text>Email:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setTxtEmail}
                value={txtEmail}
                placeholder='Digite seu email...'
                placeholderTextColor='#DDDDDD'
                keyboardType="email-address"
            />

            <Text>Idade:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setTxtAge}
                value={txtAge}
                placeholder='Digite sua idade...'
                placeholderTextColor='#DDDDDD'
                keyboardType="numeric"
            />

            <Text>Etnia:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setTxtEthnicity}
                value={txtEthnicity}
                placeholder='Digite sua etnia...'
                placeholderTextColor='#DDDDDD'
            />

            <Text>Avatar URL:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setTxtAvatar}
                value={txtAvatar}
                placeholder='URL da imagem de avatar...'
                placeholderTextColor='#DDDDDD'
                keyboardType='url'
            />

            <Text>Sexo:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setTxtGender}
                value={txtGender}
                placeholder='Digite seu sexo...'
                placeholderTextColor='#DDDDDD'
            />

            <Text>Tipo Sanguíneo:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setTxtBloodType}
                value={txtBloodType}
                placeholder='Digite seu tipo sanguíneo...'
                placeholderTextColor='#DDDDDD'
            />

            <Text>Senha:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setTxtPass}
                value={txtPass}
                placeholder='Digite sua senha...'
                placeholderTextColor='#DDDDDD'
                secureTextEntry={true}
            />

            <Button onPress={handleCreateAccount}>Cadastrar</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#444444',
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginVertical: 5,
        borderRadius: 5,
        color: '#333333',
    },
});

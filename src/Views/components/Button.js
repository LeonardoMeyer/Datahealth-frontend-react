import { View, StyleSheet, Text, TextInput, Alert } from 'react-native';
import { useState } from "react";

import { useRouter } from 'expo-router';
import { useAccountStore } from '../../stores/useAccountStore';
import { useLoginStore } from '../stores/useLoginStore';
import colors from '../colors';

export default function CreateAccount() {
    const { addAccount } = useAccountStore();
    const router = useRouter();
    const { accessToken } = useLoginStore();

    const [txtName, setTxtName] = useState('');
    const [txtEmail, setTxtEmail] = useState('');
    const [txtAge, setTxtAge] = useState('');
    const [txtEthnicity, setTxtEthnicity] = useState('');
    const [txtAvatar, setTxtAvatar] = useState('');
    const [txtPass, setTxtPass] = useState('');

    const handleCreateAccount = async () => {
        const user = {
            name: txtName,
            email: txtEmail,
            age: parseInt(txtAge),
            ethnicity: txtEthnicity,
            avatar: txtAvatar,
            pass: txtPass,
        };
    
        const response = await fetch('http://localhost:3000/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            const data = await response.json();
            addAccount(data.user);
            Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
            router.back();
        } else {
            const data = await response.json();
            Alert.alert("Erro", data?.error || "Não foi possível cadastrar o usuário.");
        }
    };

    return( 
        <View style={styles.container}>
          <Text style={styles.label}>Nome:</Text>
          <TextInput 
            style={styles.input}
            onChangeText={setTxtName}
            value={txtName}
            placeholder='Digite seu nome...'
            placeholderTextColor={colors.accent}
          />

          <Text style={styles.label}>Email:</Text>
          <TextInput 
            style={styles.input}
            onChangeText={setTxtEmail}
            value={txtEmail}
            placeholder='Digite seu email...'
            placeholderTextColor={colors.accent}
          />

          <Text style={styles.label}>Idade:</Text>
          <TextInput 
            style={styles.input}
            onChangeText={setTxtAge}
            value={txtAge}
            placeholder='Digite sua idade...'
            placeholderTextColor={colors.accent}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Etnia:</Text>
          <TextInput 
            style={styles.input}
            onChangeText={setTxtEthnicity}
            value={txtEthnicity}
            placeholder='Digite sua etnia...'
            placeholderTextColor={colors.accent}
          />

          <Text style={styles.label}>Avatar URL:</Text>
          <TextInput 
            style={styles.input}
            onChangeText={setTxtAvatar}
            value={txtAvatar}
            placeholder='URL da imagem de avatar...'
            placeholderTextColor={colors.accent}
            keyboardType='url'
          />

          <Text style={styles.label}>Senha:</Text>
          <TextInput 
            style={styles.input}
            onChangeText={setTxtPass}
            value={txtPass}
            secureTextEntry
            placeholder='Digite sua senha...'
            placeholderTextColor={colors.accent}
          />

          <Button onPress={handleCreateAccount} title="Concluir Cadastro" /> {/* Título atualizado para "Concluir Cadastro" */}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.lightBackground,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.accent,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: colors.secondary,
    fontSize: 16,
    color: colors.primary,
  },
});
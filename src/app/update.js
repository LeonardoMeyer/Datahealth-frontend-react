import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Alert, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Button from '../Views/components/Button.js';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAccountStore } from '../stores/useAccountStore';

export default function Update() {
  const { accounts, updateAccount } = useAccountStore();
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const account = accounts.find((item) => item.id === +id);

  const [txtName, setTxtName] = useState(account?.name || '');
  const [txtSpecialization, setTxtSpecialization] = useState(account?.specialization || '');
  const [txtAvatar, setTxtAvatar] = useState(account?.avatar || '');
  const [txtPassword, setTxtPassword] = useState('');
  const [txtConfirmPassword, setTxtConfirmPassword] = useState('');

  const specializationsList = [
    "Cardiologia",
    "Pediatria",
    "Dermatologia",
    "Neurologia",
    "Ortopedia",
    "Oftalmologia",
    "Psicologia",
    "Endocrinologia",
    "Ginecologia",
  ];

  const handleUpdateAccount = async () => {
    if (txtPassword !== txtConfirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    const updatedAccount = {
      name: txtName,
      specialization: txtSpecialization,
      avatar: txtAvatar,
      password: txtPassword,
    };

    try {
      const response = await fetch(`http://localhost:3000/account/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAccount),
      });

      if (response.ok) {
        const data = await response.json();
        updateAccount(data.account);
        Alert.alert('Sucesso', 'Perfil atualizado com sucesso.');
        router.back();
        return;
      }

      Alert.alert('Erro', 'Não foi possível atualizar o perfil.');
    } catch (error) {
      console.error('Erro ao atualizar conta:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao atualizar o perfil.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Nome:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTxtName}
        value={txtName}
        placeholder="Digite seu nome..."
        placeholderTextColor="#DDDDDD"
      />
      <Text>Especialização:</Text>
      <Picker
        selectedValue={txtSpecialization}
        onValueChange={(value) => setTxtSpecialization(value)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione uma especialização" value="" />
        {specializationsList.map((spec, index) => (
          <Picker.Item key={index} label={spec} value={spec} />
        ))}
      </Picker>
      <Text>URL do Avatar:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTxtAvatar}
        value={txtAvatar}
        placeholder="Digite a URL do avatar..."
        keyboardType="url"
        placeholderTextColor="#DDDDDD"
      />
      {txtAvatar && <Image source={{ uri: txtAvatar }} style={styles.avatarPreview} />}
      <Text>Nova Senha:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTxtPassword}
        value={txtPassword}
        placeholder="Digite sua nova senha..."
        secureTextEntry
        placeholderTextColor="#DDDDDD"
      />
      <Text>Confirme a Senha:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTxtConfirmPassword}
        value={txtConfirmPassword}
        placeholder="Confirme sua nova senha..."
        secureTextEntry
        placeholderTextColor="#DDDDDD"
      />
      <Button onPress={handleUpdateAccount}>Atualizar</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#444444',
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginVertical: 5,
    borderRadius: 5,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#CCC',
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  avatarPreview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
});

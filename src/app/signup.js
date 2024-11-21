import { View, StyleSheet, Text, TextInput, Alert, ScrollView, Picker } from 'react-native';
import { useState } from "react";
import Button from '../Views/components/Button.js';
import { useRouter } from 'expo-router';

export default function SignUp() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pass: '',
    avatar: '',
    age: '',
    ethnicity: '',
    gender: '',
    blood_type: '',
  });

  const handleInputChange = (key, value) => {
    setFormData(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleCreateAccount = async () => {
    const user = {
      ...formData,
      age: parseInt(formData.age) || null,
    };

    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Usuário criado com sucesso!');
        router.back(); // Retorna para a tela anterior
      } else {
        const data = await response.json();
        Alert.alert('Erro', data?.error || 'Erro desconhecido ao criar o usuário.');
      }
    } catch (error) {
      console.error('Erro ao se conectar ao servidor:', error.message);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor. Verifique sua conexão.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Campos de Cadastro */}
      {[
        { label: 'Nome', key: 'name', placeholder: 'Digite seu nome...' },
        { label: 'Email', key: 'email', placeholder: 'Digite seu email...', keyboardType: 'email-address' },
        { label: 'Idade', key: 'age', placeholder: 'Digite sua idade...', keyboardType: 'numeric' },
        { label: 'Senha', key: 'pass', placeholder: 'Digite sua senha...', secureTextEntry: true },
        { label: 'Avatar (URL)', key: 'avatar', placeholder: 'Digite a URL do avatar...' },
      ].map(({ label, key, placeholder, ...inputProps }) => (
        <View key={key}>
          <Text style={styles.label}>{label}:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleInputChange(key, value)}
            value={formData[key]?.toString()}
            placeholder={placeholder}
            placeholderTextColor="#DDDDDD"
            {...inputProps}
          />
        </View>
      ))}

      {/* Gênero */}
      <Text style={styles.label}>Gênero:</Text>
      <Picker
        selectedValue={formData.gender}
        onValueChange={(value) => handleInputChange('gender', value)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione" value="" />
        <Picker.Item label="Mulher" value="mulher" />
        <Picker.Item label="Homem" value="homem" />
        <Picker.Item label="Trans" value="trans" />
        <Picker.Item label="Não-binário" value="nao-binario" />
        <Picker.Item label="Outro" value="outro" />
      </Picker>

      {/* Tipo Sanguíneo */}
      <Text style={styles.label}>Tipo Sanguíneo:</Text>
      <Picker
        selectedValue={formData.blood_type}
        onValueChange={(value) => handleInputChange('blood_type', value)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione" value="" />
        <Picker.Item label="A+" value="A+" />
        <Picker.Item label="A-" value="A-" />
        <Picker.Item label="B+" value="B+" />
        <Picker.Item label="B-" value="B-" />
        <Picker.Item label="AB+" value="AB+" />
        <Picker.Item label="AB-" value="AB-" />
        <Picker.Item label="O+" value="O+" />
        <Picker.Item label="O-" value="O-" />
      </Picker>

      {/* Botão de Cadastro */}
      <Button onPress={handleCreateAccount} title="Cadastrar" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#444444',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 8,
    borderRadius: 5,
    backgroundColor: '#F9F9F9',
    color: '#333333',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#444444',
    borderRadius: 5,
    marginVertical: 8,
    padding: 10,
    backgroundColor: '#F9F9F9',
  },
});

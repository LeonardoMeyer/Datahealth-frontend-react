import { View, StyleSheet, Text, TextInput, Alert, ScrollView } from 'react-native';
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
    bloodType: '',
    phone: '',
    address: '',
    height: '',
    weight: '',
    chronicConditions: '',
    allergies: '',
    emergencyContact: '',
    insuranceProvider: '',
    insuranceNumber: '',
    smoker: false,
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
      age: parseInt(formData.age),
      height: parseFloat(formData.height),
      weight: parseFloat(formData.weight),
    };

    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
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
      {[
        { label: 'Nome', key: 'name', placeholder: 'Digite seu nome...' },
        { label: 'Email', key: 'email', placeholder: 'Digite seu email...', keyboardType: 'email-address' },
        { label: 'Telefone', key: 'phone', placeholder: 'Digite seu telefone...', keyboardType: 'phone-pad' },
        { label: 'Endereço', key: 'address', placeholder: 'Digite seu endereço...' },
        { label: 'Idade', key: 'age', placeholder: 'Digite sua idade...', keyboardType: 'numeric' },
        { label: 'Gênero', key: 'gender', placeholder: 'Digite seu gênero...' },
        { label: 'Tipo Sanguíneo', key: 'bloodType', placeholder: 'Digite seu tipo sanguíneo...' },
        { label: 'Altura (m)', key: 'height', placeholder: 'Digite sua altura (ex: 1.75)...', keyboardType: 'decimal-pad' },
        { label: 'Peso (kg)', key: 'weight', placeholder: 'Digite seu peso (ex: 70.5)...', keyboardType: 'decimal-pad' },
        { label: 'Condições Crônicas', key: 'chronicConditions', placeholder: 'Digite suas condições crônicas...' },
        { label: 'Alergias', key: 'allergies', placeholder: 'Digite suas alergias...' },
        { label: 'Contato de Emergência', key: 'emergencyContact', placeholder: 'Digite o telefone de emergência...', keyboardType: 'phone-pad' },
        { label: 'Convênio', key: 'insuranceProvider', placeholder: 'Digite o nome do convênio...' },
        { label: 'Número do Convênio', key: 'insuranceNumber', placeholder: 'Digite o número do convênio...' },
        { label: 'É fumante? (true/false)', key: 'smoker', placeholder: 'Digite true ou false' },
        { label: 'Senha', key: 'pass', placeholder: 'Digite sua senha...', secureTextEntry: true },
      ].map(({ label, key, placeholder, ...inputProps }) => (
        <View key={key}>
          <Text style={styles.label}>{label}:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleInputChange(key, key === 'smoker' ? value.toLowerCase() === 'true' : value)}
            value={formData[key].toString()}
            placeholder={placeholder}
            placeholderTextColor="#DDDDDD"
            {...inputProps}
          />
        </View>
      ))}

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
});

import { View, StyleSheet, Text, TextInput, Alert, ScrollView, Picker } from 'react-native';
import { useState } from "react";
import Button from '../Views/components/Button';
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
        router.back(); 
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
            placeholderTextColor="#BCCBD4"
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

      {/* Etnia */}
      <Text style={styles.label}>Etnia:</Text>
      <Picker
        selectedValue={formData.ethnicity}
        onValueChange={(value) => handleInputChange('ethnicity', value)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione" value="" />
        <Picker.Item label="Caucasiano" value="caucasiano" />
        <Picker.Item label="Negro" value="negro" />
        <Picker.Item label="Indígena" value="indigena" />
        <Picker.Item label="Asiático" value="asiatico" />
        <Picker.Item label="Pardo" value="pardo" />
        <Picker.Item label="Outro" value="outro" />
      </Picker>

      {/* Botão de Cadastro */}
      <Button onPress={handleCreateAccount}>
        Cadastrar-se
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#466684',
  },
  input: {
    borderWidth: 1,
    borderColor: '#587796',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F5F7FA',
    color: '#466684',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#587796',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#F5F7FA',
    color: '#466684',
  },
});

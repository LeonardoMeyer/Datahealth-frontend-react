import { View, StyleSheet, Text, TextInput, Alert, ScrollView } from 'react-native';
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
  const [txtPhone, setTxtPhone] = useState('');
  const [txtAddress, setTxtAddress] = useState('');
  const [txtGender, setTxtGender] = useState('');
  const [txtBloodType, setTxtBloodType] = useState('');
  const [txtHeight, setTxtHeight] = useState('');
  const [txtWeight, setTxtWeight] = useState('');
  const [txtChronicConditions, setTxtChronicConditions] = useState('');
  const [txtAllergies, setTxtAllergies] = useState('');
  const [txtEmergencyContact, setTxtEmergencyContact] = useState('');
  const [txtInsuranceProvider, setTxtInsuranceProvider] = useState('');
  const [txtInsuranceNumber, setTxtInsuranceNumber] = useState('');
  const [txtSmoker, setTxtSmoker] = useState(false);

  const handleCreateAccount = async () => {
    const user = {
      name: txtName,
      email: txtEmail,
      pass: txtPass,
      avatar: txtAvatar,
      age: parseInt(txtAge), // Convertendo idade para número
      ethnicity: txtEthnicity,
      phone: txtPhone,
      address: txtAddress,
      gender: txtGender,
      blood_type: txtBloodType,
      height: parseFloat(txtHeight),
      weight: parseFloat(txtWeight),
      chronic_conditions: txtChronicConditions,
      allergies: txtAllergies,
      emergency_contact: txtEmergencyContact,
      insurance_provider: txtInsuranceProvider,
      insurance_number: txtInsuranceNumber,
      smoker: txtSmoker,
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
      <Text style={styles.label}>Nome:</Text>
      <TextInput 
        style={styles.input}
        onChangeText={setTxtName}
        value={txtName}
        placeholder='Digite seu nome...'
        placeholderTextColor='#DDDDDD'
      />
      
      <Text style={styles.label}>Email:</Text>
      <TextInput 
        style={styles.input}
        onChangeText={setTxtEmail}
        value={txtEmail}
        placeholder='Digite seu email...'
        placeholderTextColor='#DDDDDD'
        keyboardType="email-address"
      />
      
      <Text style={styles.label}>Telefone:</Text>
      <TextInput 
        style={styles.input}
        onChangeText={setTxtPhone}
        value={txtPhone}
        placeholder='Digite seu telefone...'
        placeholderTextColor='#DDDDDD'
        keyboardType="phone-pad"
      />
      
      <Text style={styles.label}>Endereço:</Text>
      <TextInput 
        style={styles.input}
        onChangeText={setTxtAddress}
        value={txtAddress}
        placeholder='Digite seu endereço...'
        placeholderTextColor='#DDDDDD'
      />
      
      <Text style={styles.label}>Idade:</Text>
      <TextInput 
        style={styles.input}
        onChangeText={setTxtAge}
        value={txtAge}
        placeholder='Digite sua idade...'
        placeholderTextColor='#DDDDDD'
        keyboardType="numeric"
      />

      <Text style={styles.label}>Gênero:</Text>
      <TextInput 
        style={styles.input}
        onChangeText={setTxtGender}
        value={txtGender}
        placeholder='Digite seu gênero...'
        placeholderTextColor='#DDDDDD'
      />

      <Text style={styles.label}>Tipo Sanguíneo:</Text>
      <TextInput 
        style={styles.input}
        onChangeText={setTxtBloodType}
        value={txtBloodType}
        placeholder='Digite seu tipo sanguíneo...'
        placeholderTextColor='#DDDDDD'
      />

      <Text style={styles.label}>Altura (m):</Text>
      <TextInput 
        style={styles.input}
        onChangeText={setTxtHeight}
        value={txtHeight}
        placeholder='Digite sua altura (ex: 1.75)...'
        placeholderTextColor='#DDDDDD'
        keyboardType="decimal-pad"
      />

      <Text style={styles.label}>Peso (kg):</Text>
      <TextInput 
        style={styles.input}
        onChangeText={setTxtWeight}
        value={txtWeight}
        placeholder='Digite seu peso (ex: 70.5)...'
        placeholderTextColor='#DDDDDD'
        keyboardType="decimal-pad"
      />

      <Text style={styles.label}>Condições Crônicas:</Text>
      <TextInput 
        style={styles.input}
        onChangeText={setTxtChronicConditions}
        value={txtChronicConditions}
        placeholder='Digite suas condições crônicas...'
        placeholderTextColor='#DDDDDD'
      />

      <Text style={styles.label}>Alergias:</Text>
      <TextInput 
        style={styles.input}
        onChangeText={setTxtAllergies}
        value={txtAllergies}
        placeholder='Digite suas alergias...'
        placeholderTextColor='#DDDDDD'
      />

      <Text style={styles.label}>Contato de Emergência:</Text>
      <TextInput 
        style={styles.input}
        onChangeText={setTxtEmergencyContact}
        value={txtEmergencyContact}
        placeholder='Digite o telefone de emergência...'
        placeholderTextColor='#DDDDDD'
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Convênio:</Text>
      <TextInput 
        style={styles.input}
        onChangeText={setTxtInsuranceProvider}
        value={txtInsuranceProvider}
        placeholder='Digite o nome do convênio...'
        placeholderTextColor='#DDDDDD'
      />

      <Text style={styles.label}>Número do Convênio:</Text>
      <TextInput 
        style={styles.input}
        onChangeText={setTxtInsuranceNumber}
        value={txtInsuranceNumber}
        placeholder='Digite o número do convênio...'
        placeholderTextColor='#DDDDDD'
      />

      <Text style={styles.label}>É fumante? (true/false):</Text>
      <TextInput 
        style={styles.input}
        onChangeText={(value) => setTxtSmoker(value.toLowerCase() === 'true')}
        value={txtSmoker.toString()}
        placeholder='Digite true ou false'
        placeholderTextColor='#DDDDDD'
      />

      <Text style={styles.label}>Senha:</Text>
      <TextInput 
        style={styles.input}
        onChangeText={setTxtPass}
        value={txtPass}
        placeholder='Digite sua senha...'
        placeholderTextColor='#DDDDDD'
        secureTextEntry={true}
      />

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

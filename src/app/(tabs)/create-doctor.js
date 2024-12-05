import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Button from '../../Views/components/Button';

export default function CreateDoctor({ navigation }) {
  const [form, setForm] = useState({
    name: '', 
    email: '', 
    age: '',
    gender: '',
    specialization: '',
    avatar: '', 
  });

  const handleSubmit = async () => {

    if (!form.name || !form.email || !form.specialization || !form.age || !form.gender) {
      Alert.alert('Erro', 'Todos os campos obrigatórios devem ser preenchidos!');
      return;
    }
  
    try {
      const payload = {
        name: form.name,
        email: form.email,
        age: Number(form.age),
        gender: form.gender,
        specialization: form.specialization,
        avatar: form.avatar || null,
      };
  
      console.log('Payload enviado:', payload); 
  
      const response = await fetch('http://localhost:3000/doctor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao cadastrar médico.');
      }
  
      Alert.alert('Sucesso', 'Médico cadastrado com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };
  
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={form.name}
        onChangeText={(value) => setForm({ ...form, name: value })}
        placeholder="Digite o nome do médico"
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={form.email}
        onChangeText={(value) => setForm({ ...form, email: value })}
        placeholder="Digite o email"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Idade:</Text>
      <TextInput
        style={styles.input}
        value={form.age}
        onChangeText={(value) => setForm({ ...form, age: value })}
        placeholder="Digite a idade"
        keyboardType="numeric" 
      />

      <Text style={styles.label}>Gênero:</Text>
      <Picker
        selectedValue={form.gender}
        onValueChange={(value) => setForm({ ...form, gender: value })}
        style={styles.picker}
      >
        <Picker.Item label="Selecione" value="" />
        <Picker.Item label="Mulher" value="mulher" />
        <Picker.Item label="Homem" value="homem" />
        <Picker.Item label="Trans" value="trans" />
        <Picker.Item label="Não-binário" value="nao-binario" />
        <Picker.Item label="Outro" value="outro" />
      </Picker>

      <Text style={styles.label}>Especialização:</Text>
      <Picker
        selectedValue={form.specialization}
        onValueChange={(value) => setForm({ ...form, specialization: value })}
        style={styles.picker}
      >
        <Picker.Item label="Selecione" value="" />
        <Picker.Item label="Cardiologia" value="cardiologia" />
        <Picker.Item label="Pediatria" value="pediatria" />
        <Picker.Item label="Dermatologia" value="dermatologia" />
        <Picker.Item label="Ortopedia" value="ortopedia" />
        <Picker.Item label="Neurologia" value="neurologia" />
        <Picker.Item label="Psiquiatria" value="psiquiatria" />
        <Picker.Item label="Ginecologia" value="ginecologia" />
        <Picker.Item label="Urologia" value="urologia" />
        <Picker.Item label="Endocrinologia" value="endocrinologia" />
        <Picker.Item label="Oncologia" value="oncologia" />
        <Picker.Item label="Infectologia" value="infectologia" />
        <Picker.Item label="Reumatologia" value="reumatologia" />
        <Picker.Item label="Cirurgia Geral" value="cirurgia-geral" />
      </Picker>

      <Text style={styles.label}>Avatar (URL):</Text>
      <TextInput
        style={styles.input}
        value={form.avatar}
        onChangeText={(value) => setForm({ ...form, avatar: value })}
        placeholder="Digite o URL do avatar"
      />

      <Button onPress={handleSubmit}>Cadastrar</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#FFF',
  },
  picker: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    marginBottom: 15,
  },
});

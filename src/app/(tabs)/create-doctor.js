import React, { useState } from 'react'; 
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import Button from '../../Views/components/Button'; 

export default function CreateDoctor({ navigation }) {
  const [form, setForm] = useState({
    name: '',               // Nome do médico
    email: '',              // Email do médico
    age: '',                // Idade do médico
    gender: '',             // Gênero do médico
    specialization: '',     // Especialização do médico
    avatar: '',             // URL ou caminho da imagem do avatar
  });

  const handleSubmit = async () => {
    // Validação dos campos
    if (!form.name || !form.email || !form.specialization || !form.age || !form.gender) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/doctor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error('Erro ao cadastrar médico.');

      Alert.alert('Sucesso', 'Médico cadastrado com sucesso!');
      navigation.goBack();  // Voltar para a tela anterior após sucesso
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
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={form.email}
        onChangeText={(value) => setForm({ ...form, email: value })}
      />

      <Text style={styles.label}>Idade:</Text>
      <TextInput
        style={styles.input}
        value={form.age}
        onChangeText={(value) => setForm({ ...form, age: value })}
        keyboardType="numeric" // Apenas números
      />

      <Text style={styles.label}>Gênero:</Text>
      <TextInput
        style={styles.input}
        value={form.gender}
        onChangeText={(value) => setForm({ ...form, gender: value })}
      />

      <Text style={styles.label}>Especialização:</Text>
      <TextInput
        style={styles.input}
        value={form.specialization}
        onChangeText={(value) => setForm({ ...form, specialization: value })}
      />

      <Text style={styles.label}>Avatar (URL):</Text>
      <TextInput
        style={styles.input}
        value={form.avatar}
        onChangeText={(value) => setForm({ ...form, avatar: value })}
      />

      <Button onPress={handleSubmit}>Cadastrar</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
});

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import Button from '../views/components/Button';

export default function CreateDoctor({ navigation }) {
  const [form, setForm] = useState({
    public_id: '',
    name: '',
    email: '',
    age: '',
    gender: '',
    specialization: '',
    avatar: '',
  });

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/doctors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error('Erro ao cadastrar médico.');
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
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={form.email}
        onChangeText={(value) => setForm({ ...form, email: value })}
      />
      <Text style={styles.label}>Especialização:</Text>
      <TextInput
        style={styles.input}
        value={form.specialization}
        onChangeText={(value) => setForm({ ...form, specialization: value })}
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

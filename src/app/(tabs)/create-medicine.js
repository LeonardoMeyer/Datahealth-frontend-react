import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

export default function CreateMedication() {
  const [medicine, setMedicine] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [period, setPeriod] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.uri);
    }
  };

  const handleCreateMedication = async () => {
    if (!medicine || !description || !imageUri || !period) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('medicine', medicine);
    formData.append('description', description);
    formData.append('period', period);
    if (date) {
      formData.append('date', date);
    }

    const uriParts = imageUri.split('.');
    const fileType = uriParts[uriParts.length - 1];
    formData.append('image', {
      uri: imageUri,
      name: `image.${fileType}`,
      type: `image/${fileType}`,
    });

    try {
      const response = await fetch('http://localhost:3000/medication', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert('Sucesso', 'Medicação cadastrada com sucesso!');
        router.replace('/medications'); 
      } else {
        throw new Error('Erro ao cadastrar medicação');
      }
    } catch (error) {
      console.error('Erro:', error);
      Alert.alert('Erro', 'Ocorreu um erro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Medicação</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Medicamento"
        value={medicine}
        onChangeText={setMedicine}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity style={styles.button} onPress={handleImagePicker}>
        <Text style={styles.buttonText}>Escolher Imagem</Text>
      </TouchableOpacity>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
      <TextInput
        style={styles.input}
        placeholder="Período (em dias)"
        keyboardType="numeric"
        value={period}
        onChangeText={setPeriod}
      />
      <TextInput
        style={styles.input}
        placeholder="Data (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <TouchableOpacity
        style={[styles.submitButton, { opacity: loading ? 0.5 : 1 }]}
        onPress={handleCreateMedication}
        disabled={loading}
      >
        <Text style={styles.submitButtonText}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#7B9ABB',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 15,
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: '#27B9ABB',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

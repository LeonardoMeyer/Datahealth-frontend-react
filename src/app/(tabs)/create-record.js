import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useRecordStore } from '../../stores/useRecordStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateAccount() {
  const { addRecord } = useRecordStore();
  const router = useRouter();

  const [txtReport, setTxtReport] = useState('');
  const [txtRecipe, setTxtRecipe] = useState('');
  const [txtDate, setTxtDate] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.uri);
    }
  };

  const handleCreateRecord = async () => {
    setLoading(true);
    const id = await AsyncStorage.getItem('id');

    if (!id) {
      Alert.alert('Erro', 'Usuário não encontrado. Por favor, faça login novamente.');
      setLoading(false);
      return;
    }

    if (!txtReport || !txtDate || !imageUri) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('report', txtReport);
    formData.append('recipe', txtRecipe);
    formData.append('date', txtDate);
    formData.append('user_id', id);

    const uriParts = imageUri.split('.');
    const fileType = uriParts[uriParts.length - 1];

    formData.append('exam', {
      uri: imageUri,
      name: `exam.${fileType}`,
      type: `image/${fileType}`,
    });

    try {
      const response = await fetch('http://localhost:3000/record', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        addRecord(data.record);
        router.replace('/home');
        Alert.alert('Sucesso', 'Relatório cadastrado com sucesso!');
      } else {
        const errorData = await response.json();
        console.error('Erro ao criar record:', errorData);
        Alert.alert('Erro', 'Falha ao cadastrar o relatório. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      Alert.alert('Erro', 'Ocorreu um erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Cadastrar Relatório</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do Relatório"
          onChangeText={setTxtReport}
          value={txtReport}
        />
        <TextInput
          style={styles.input}
          placeholder="Nome da Receita"
          onChangeText={setTxtRecipe}
          value={txtRecipe}
        />
        <TextInput
          style={styles.input}
          placeholder="Data (YYYY-MM-DD)"
          onChangeText={setTxtDate}
          value={txtDate}
        />
        <TouchableOpacity style={styles.imageButton} onPress={handleImagePicker}>
          <Text style={styles.imageButtonText}>Escolher Imagem do Exame</Text>
        </TouchableOpacity>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
        <TouchableOpacity
          style={[styles.confirmButton, { opacity: loading ? 0.5 : 1 }]}
          onPress={handleCreateRecord}
          disabled={loading}
        >
          <Text style={styles.confirmButtonText}>
            {loading ? 'Carregando...' : 'Cadastrar'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  formContainer: {
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7B9ABB',
    marginBottom: 10,
  },
  imageButton: {
    backgroundColor: '#7B9ABB',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  imageButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
  },
  confirmButton: {
    backgroundColor: '#7B9ABB',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

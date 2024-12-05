import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import Button from '../../Views/components/Button';
import { useRecordStore } from '../../stores/useRecordStore';
import { fetchAuth } from '../../utils/fetchAuth';

export default function CreateAccount() {
  const { addRecord } = useRecordStore();
  const router = useRouter();

  const [txtReport, setTxtReport] = useState('');
  const [txtRecipe, setTxtRecipe] = useState('');
  const [txtDate, setTxtDate] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const checkPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão de acesso à galeria', 'Precisamos da sua permissão para acessar a galeria de fotos.');
    }
  };

  useEffect(() => {
    checkPermissions();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri); 
    }
  };

  const handleCreateRecord = async () => {
    if (!txtReport || !imageUri || !txtRecipe || !txtDate) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const formData = new FormData();
    formData.append('report', txtReport);
    formData.append('recipe', txtRecipe);
    formData.append('date', txtDate);

    const uriParts = imageUri.split('.');
    const fileType = uriParts[uriParts.length - 1];

    formData.append('exam', {
      uri: imageUri,
      name: `exam.${fileType}`,
      type: `image/${fileType}`,
    });

    try {
      const response = await fetchAuth('http://localhost:3000/record', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        const data = await response.json();
        addRecord(data.record);
        router.replace('/home');
      } else {
        console.log('Erro ao carregar records');
      }
    } catch (error) {
      console.log('Erro ao enviar dados:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Relatório:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTxtReport}
        value={txtReport}
        placeholder="Digite o nome do relatório..."
        placeholderTextColor="#DDDDDD"
      />
      <Text>Exame (Imagem):</Text>
      <Button onPress={pickImage}>Escolher Imagem do Exame</Button>
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
      )}
      <Text>Receita:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTxtRecipe}
        value={txtRecipe}
        placeholder="Digite o nome da receita..."
        placeholderTextColor="#DDDDDD"
      />
      <Text>Data:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTxtDate}
        value={txtDate}
        placeholder="Digite a data (YYYY-MM-DD)..."
        placeholderTextColor="#DDDDDD"
      />
      <Button onPress={handleCreateRecord}>Cadastrar</Button>
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
  imagePreview: {
    width: 100,
    height: 100,
    marginVertical: 10,
    borderRadius: 5,
  },
});

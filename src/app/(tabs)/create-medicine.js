import React, { useState } from 'react';
import { View, TextInput, Button, Text, Image, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { fetchAuth } from '../../utils/fetchAuth'; 

const CreateMedication = () => {
  const [medicine, setMedicine] = useState('');
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState('');
  const [period, setPeriod] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('Imagem não selecionada');
      } else if (response.errorCode) {
        console.error(response.errorMessage);
      } else {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const handleSubmit = async () => {
    if (!medicine || !description || !period || !imageUri) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios');
      return;
    }

    const formData = new FormData();
    formData.append('medicine', medicine);
    formData.append('description', description);
    formData.append('period', period);
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: `image_${Date.now()}.jpg`,
    });

    try {
      const response = await fetchAuth('http://localhost:3000/medication', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert('Sucesso', 'Medicamento criado com sucesso');
        console.log(data);
      } else {
        const errorData = await response.json();
        Alert.alert('Erro', errorData.error || 'Erro ao criar medicamento');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao conectar com o servidor');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="Nome do medicamento"
        value={medicine}
        onChangeText={setMedicine}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="Período (dias)"
        keyboardType="numeric"
        value={period}
        onChangeText={setPeriod}
      />

      {/* Seletor de imagem */}
      <Button title="Selecionar Imagem" onPress={pickImage} />
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 100, height: 100, marginVertical: 10 }}
        />
      )}

      <Button title="Criar Medicamento" onPress={handleSubmit} />
    </View>
  );
};

export default CreateMedication;

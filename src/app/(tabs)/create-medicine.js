import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { fetchAuth } from '../../utils/fetchAuth';

export default function CreateMedication() {
  const router = useRouter();
  const [form, setForm] = useState({
    medicine: '',
    description: '',
    image: null,
    period: '',
    date: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    requestImagePermission();
  }, []);

  const requestImagePermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar suas imagens.');
    }
  };

  const handleInputChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const { uri } = result.assets[0];
      handleInputChange('image', uri);
    }
  };

  const buildFormData = () => {
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== '') {
        if (key === 'image' && value) {
          const fileName = value.split('/').pop();
          const match = /\.(\w+)$/.exec(fileName);
          const fileType = match ? `image/${match[1]}` : 'image';

          formData.append('image', {
            uri: value,
            name: fileName,
            type: fileType,
          });
        } else {
          formData.append(key, value);
        }
      }
    });

    return formData;
  };

  const validateForm = () => {
    const requiredFields = ['medicine', 'description', 'image', 'period'];
    for (const field of requiredFields) {
      if (!form[field]) {
        Alert.alert('Erro', `Por favor, preencha o campo: ${field.replace(/([A-Z])/g, ' $1').trim()}`);
        return false;
      }
    }
    return true;
  };

  const handleCreateMedication = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetchAuth('http://localhost:3000/medication', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: buildFormData(),
      });

      if (response.ok) {
        await response.json();
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
        value={form.medicine}
        onChangeText={(text) => handleInputChange('medicine', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={form.description}
        onChangeText={(text) => handleInputChange('description', text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleImagePicker}>
        <Text style={styles.buttonText}>Escolher Imagem</Text>
      </TouchableOpacity>
      {form.image && <Image source={{ uri: form.image }} style={styles.imagePreview} />}
      <TextInput
        style={styles.input}
        placeholder="Período (em dias)"
        keyboardType="numeric"
        value={form.period}
        onChangeText={(text) => handleInputChange('period', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Data (YYYY-MM-DD)"
        value={form.date}
        onChangeText={(text) => handleInputChange('date', text)}
      />
      <TouchableOpacity
        style={[styles.submitButton, { opacity: loading ? 0.5 : 1 }]}
        onPress={handleCreateMedication}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Cadastrar</Text>
        )}
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
    backgroundColor: 'rgb(123, 154, 187)',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

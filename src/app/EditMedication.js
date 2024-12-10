import { View, StyleSheet, Text, TextInput, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import Button from '../Views/components/Button';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useMedicationStore } from '../stores/useMedicationStore';
import { fetchAuth } from '../utils/fetchAuth';

export default function UpdateMedication() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { medications, updateMedication } = useMedicationStore();

  // Converte o ID para número, validando se é válido
  const medication = medications.find((item) => item.id === Number(id));

  const [txtMedicine, setTxtMedicine] = useState(medication?.medicine || '');
  const [txtDescription, setTxtDescription] = useState(medication?.description || '');
  const [txtPeriod, setTxtPeriod] = useState(medication?.period?.toString() || '');
  const [txtImgUrl, setTxtImgUrl] = useState(medication?.image || '');

  useEffect(() => {
    if (!medication) {
      Alert.alert('Erro', 'Medicamento não encontrado.');
      router.push('/medication');
    }
  }, [medication]);

  const handleUpdateMedication = async () => {
    if (!txtMedicine || !txtDescription || !txtPeriod) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (isNaN(parseInt(txtPeriod, 10)) || parseInt(txtPeriod, 10) <= 0) {
      Alert.alert('Erro', 'O período deve ser um número positivo.');
      return;
    }

    const updatedMedication = {
      medicine: txtMedicine,
      description: txtDescription,
      period: parseInt(txtPeriod, 10),
      image: txtImgUrl,
    };

    try {
      const response = await fetchAuth(`http://localhost:3000/medication/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedMedication),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao atualizar medicamento');
      }

      const data = await response.json();
      updateMedication(data);
      Alert.alert('Sucesso', 'Medicamento atualizado com sucesso!');
      router.back();
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Nome do Medicamento:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTxtMedicine}
        value={txtMedicine}
        placeholder="Digite o nome do medicamento..."
      />
      <Text>Descrição:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTxtDescription}
        value={txtDescription}
        placeholder="Digite a descrição..."
      />
      <Text>Período (dias):</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTxtPeriod}
        value={txtPeriod}
        keyboardType="numeric"
        placeholder="Digite o período em dias..."
      />
      <Text>Imagem (URL):</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTxtImgUrl}
        value={txtImgUrl}
        placeholder="URL da imagem..."
        keyboardType="url"
      />
      <Button onPress={handleUpdateMedication}>Atualizar</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#444444',
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginVertical: 5,
    borderRadius: 5,
  },
});

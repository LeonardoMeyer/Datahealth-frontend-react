import { View, StyleSheet, Text, TextInput, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import Button from '../Views/components/Button';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useRecordStore } from '../stores/useRecordStore';
import { fetchAuth } from '../utils/fetchAuth';

export default function UpdateRecord() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { records, updateRecord } = useRecordStore();

  const record = records.find((item) => item.id === Number(id));

  const [txtReport, setTxtReport] = useState(record?.report || '');
  const [txtRecipe, setTxtRecipe] = useState(record?.recipe || '');
  const [txtDate, setTxtDate] = useState(record?.date?.substring(0, 10) || ''); // Formato yyyy-mm-dd
  const [txtImgUrl, setTxtImgUrl] = useState(record?.exam || '');

  useEffect(() => {
    if (!record) {
      Alert.alert('Erro', 'Registro não encontrado.');
      router.push('/records');
    }
  }, [record]);

  const handleUpdateRecord = async () => {
    if (!txtReport || !txtDate || !txtImgUrl) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const dateInput = new Date(txtDate);
    if (isNaN(dateInput)) {
      Alert.alert('Erro', 'A data fornecida é inválida. Use o formato yyyy-mm-dd.');
      return;
    }

    const updatedRecord = {
      report: txtReport,
      recipe: txtRecipe,
      date: dateInput.toISOString(),
      exam: txtImgUrl,
    };

    try {
      const response = await fetchAuth(`http://localhost:3000/record/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedRecord),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao atualizar o registro');
      }

      const data = await response.json();
      updateRecord(data);
      Alert.alert('Sucesso', 'Registro atualizado com sucesso!');
      router.back();
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Relatório:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTxtReport}
        value={txtReport}
        placeholder="Digite o relatório..."
      />
      <Text>Receita:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTxtRecipe}
        value={txtRecipe}
        placeholder="Digite a receita..."
      />
      <Text>Data:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTxtDate}
        value={txtDate}
        placeholder="Digite a data (yyyy-mm-dd)..."
        keyboardType="default"
      />
      <Text>URL do Exame:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTxtImgUrl}
        value={txtImgUrl}
        placeholder="Digite a URL do exame..."
        keyboardType="url"
      />
      <Button onPress={handleUpdateRecord}>Atualizar</Button>
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

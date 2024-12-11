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
  const [txtDate, setTxtDate] = useState(record?.date || '');
  const [txtImgUrl, setTxtImgUrl] = useState(record?.image_url || ''); 

  useEffect(() => {
    if (!record) {
      Alert.alert('Erro', 'Registro não encontrado.');
      router.push('/home'); 
    }
  }, [record]);

  const handleDateInput = (value) => {
    let cleanedValue = value.replace(/\D/g, ''); 

    if (cleanedValue.length > 2 && cleanedValue.length <= 4) {
      cleanedValue = `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2)}`;
    } else if (cleanedValue.length > 4) {
      cleanedValue = `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2, 4)}/${cleanedValue.slice(4, 8)}`;
    }

    setTxtDate(cleanedValue); 
  };

  const handleUpdateRecord = async () => {
    if (!txtReport || !txtRecipe || !txtDate) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const dateParts = txtDate.split('/');
    if (dateParts.length !== 3 || dateParts[0].length !== 2 || dateParts[1].length !== 2 || dateParts[2].length !== 4) {
      Alert.alert('Erro', 'Data inválida! Use o formato dd/mm/yyyy.');
      return;
    }

    const formattedDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`).toISOString();

    const updatedRecord = {
      report: txtReport,
      recipe: txtRecipe,
      date: formattedDate,
      image_url: txtImgUrl,
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
      updateRecord(data.record); 
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
        onChangeText={handleDateInput}
        value={txtDate}
        placeholder="Digite a data (dd/mm/yyyy)..."
        keyboardType="numeric"
        maxLength={10}
      />
      <Text>URL da Imagem:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTxtImgUrl}
        value={txtImgUrl}
        placeholder="Digite a URL da imagem..."
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

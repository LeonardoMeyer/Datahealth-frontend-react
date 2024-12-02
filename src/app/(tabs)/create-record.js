import { View, StyleSheet, Text, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import Button from '../../Views/components/Button';
import { useRouter } from 'expo-router';
import { useRecordStore } from '../../stores/useRecordStore'; 
import { fetchAuth } from '../../utils/fetchAuth';

export default function CreateRecord() {
  const { addRecord } = useRecordStore();
  const router = useRouter();

  const [txtReport, setTxtReport] = useState('');
  const [txtExam, setTxtExam] = useState('');
  const [txtRecipe, setTxtRecipe] = useState('');
  const [txtDate, setTxtDate] = useState('');

  const handleCreateRecord = async () => {
    if (!txtReport || !txtExam || !txtRecipe || !txtDate) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const record = {
      report: txtReport,
      exam: txtExam,
      recipe: txtRecipe,
      date: txtDate,
    };

    try {
      const response = await fetchAuth('http://localhost:3000/record', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record),
      });

      if (!response.ok) {
        const error = await response.json();
        Alert.alert('Erro', error.message || 'Falha ao criar o registro.');
        return;
      }

      const data = await response.json();
      addRecord(data.record);
      router.replace('/home');
    } catch (error) {
      console.error('Erro ao criar o registro:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao criar o registro. Tente novamente mais tarde.');
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
      <Text>Exame (URL da imagem):</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTxtExam}
        value={txtExam}
        placeholder="Digite a URL da imagem do exame..."
        placeholderTextColor="#DDDDDD"
        keyboardType="url"
      />
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
});

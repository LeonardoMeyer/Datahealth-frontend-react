import { View, StyleSheet, Text, TextInput } from 'react-native';
import { useState } from 'react';
import Button from '../../Views/components/Button';
import { useRouter } from 'expo-router';
import { useRecordStore } from '../../stores/useRecordStore'; // Mudança para usar o store de record
import { fetchAuth } from '../../utils/fetchAuth';

export default function CreateRecord() {
  const { addRecord } = useRecordStore(); // Função para adicionar um novo record
  const router = useRouter();

  const [txtReport, setTxtReport] = useState('');
  const [txtExam, setTxtExam] = useState('');
  const [txtRecipe, setTxtRecipe] = useState('');
  const [txtDate, setTxtDate] = useState('');

  const handleCreateRecord = async () => {
    const record = {
      report: txtReport,
      exam: txtExam, // Pode ser uma URL de imagem ou um caminho para o arquivo
      recipe: txtRecipe,
      date: txtDate, // Certifique-se de enviar a data no formato correto
    };

    const response = await fetchAuth('http://localhost:3000/record', {
      method: 'POST',
      body: JSON.stringify(record),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      addRecord(data.record); // Atualizando o store com o novo record
      router.replace('/home'); // Redireciona para a tela inicial
      return;
    }

    console.log('Erro ao criar o registro');
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

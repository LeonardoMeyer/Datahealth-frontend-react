import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import Button from '../Views/components/Button';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useRecordStore } from '../stores/useRecordStore';
import { fetchAuth } from '../utils/fetchAuth';

export default function UpdateRecord() {
  const { records, updateRecord } = useRecordStore();
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const record = records.find((item) => item.id === +id);

  const [txtReport, setTxtReport] = useState(record?.report || '');
  const [txtRecipe, setTxtRecipe] = useState(record?.recipe || '');
  const [txtDate, setTxtDate] = useState(record?.date || '');
  const [txtImgUrl, setTxtImgUrl] = useState(record?.exam || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!record) {
      Alert.alert('Erro', 'Registro não encontrado.');
      router.push('/record');
    }
  }, [record]);

  const handleUpdateRecord = async () => {
    const formattedDate = new Date(
      txtDate.split('/').reverse().join('-')
    ).toISOString();

    const updatedRecord = {
      report: txtReport,
      recipe: txtRecipe,
      exam: txtImgUrl || null,
      date: formattedDate,
      user_id: record?.user_id, 

    };

    setLoading(true);

    try {
      const response = await fetchAuth(`http://localhost:3000/record/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRecord),
      });

      if (response.ok) {
        const data = await response.json();
        updateRecord(data.record); 
        Alert.alert('Sucesso', 'Registro atualizado com sucesso!');
        router.push('/record'); 
      } else {
        const errorData = await response.json();
        console.error('Erro ao atualizar o registro:', errorData);
        Alert.alert('Erro', errorData.message || 'Erro ao atualizar o registro.');
      }
    } catch (error) {
      console.error('Erro ao atualizar registro:', error);
      Alert.alert('Erro', error.message || 'Erro desconhecido ao atualizar o registro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Relatório:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTxtReport}
        value={txtReport}
        placeholder="Digite o relatório..."
        placeholderTextColor="#DDDDDD"
      />

      <Text style={styles.text}>Receita:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTxtRecipe}
        value={txtRecipe}
        placeholder="Digite a receita..."
        placeholderTextColor="#DDDDDD"
      />

      <Text style={styles.text}>Data:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTxtDate}
        value={txtDate}
        placeholder="Digite a data (dd/mm/yyyy)..."
        keyboardType="numeric"
        maxLength={10}
      />

      <Text style={styles.text}>URL da Imagem:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTxtImgUrl}
        value={txtImgUrl}
        placeholder="Digite a URL da imagem..."
        keyboardType="url"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.buttonContainer}>
          <Button onPress={handleUpdateRecord}>Atualizar</Button>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f4f4',
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#444444',
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginVertical: 5,
    borderRadius: 5,
  },
  text: {
    fontWeight: '700',
    marginBottom: 5,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
});

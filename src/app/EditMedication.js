import { View, StyleSheet, Text, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import Button from '../Views/components/Button';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useMedicationStore } from '../stores/useMedicationStore';
import { fetchAuth } from '../utils/fetchAuth';

export default function UpdateMedication() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { medications, updateMedication } = useMedicationStore();

  const medication = medications.find((item) => item.id === +id);

  const [txtMedicine, setTxtMedicine] = useState(medication?.medicine || '');
  const [txtDescription, setTxtDescription] = useState(medication?.description || '');
  const [txtPeriod, setTxtPeriod] = useState(medication?.period.toString() || '');
  const [txtImgUrl, setTxtImgUrl] = useState(medication?.image || '');

  useEffect(() => {
    if (!medication) {
      router.push('/medication'); 
    }
  }, [medication]);

  const handleUpdateMedication = async () => {
    const updatedMedication = {
      medicine: txtMedicine,
      description: txtDescription,
      period: parseInt(txtPeriod, 10),
      image: txtImgUrl,
    };

    const response = await fetchAuth(`http://localhost:3000/medication/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedMedication),
    });

    if (response.ok) {
      const data = await response.json();
      updateMedication(data); 
      router.back(); 
      return;
    }

    console.log('Erro ao atualizar medicamento');
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
    borderStyle: 'solid',
    borderColor: '#444444',
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginVertical: 5,
    borderRadius: 5,
  },
});

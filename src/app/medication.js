import { FlatList, StyleSheet, View, Text, Alert, Image } from 'react-native';
import Button from '../Views/components/Button';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useMedicationStore } from '../stores/useMedicationStore';
import { fetchAuth } from '../utils/fetchAuth';

export default function Medications() {
  const router = useRouter();
  const { medications, setMedications, deleteMedication } = useMedicationStore();

  const fetchMedications = async () => {
    try {
      const response = await fetchAuth('http://localhost:3000/medication/list', {
        method: 'GET',
      });
      if (!response.ok) throw new Error('Erro ao buscar medicamentos');
      const data = await response.json();
      console.log('Fetched medications:', data);
      setMedications(data);
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  const handleDeleteMedication = async (id) => {
    try {
      const response = await fetchAuth(`http://localhost:3000/medication/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erro ao excluir medicamento');
      deleteMedication(id); 
      Alert.alert('Sucesso', 'Medicamento excluído com sucesso');
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  useEffect(() => {
    fetchMedications();
  }, []);

  const renderMedication = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.medicationName}>{item.medicine}</Text>
        <Text style={styles.description}>{item.description}</Text>
        {item.image && (
          <Image source={{ uri: item.image }} style={styles.medicationImage} />
        )}
        <Text style={styles.period}>Período: {item.period} dias</Text>
        <View style={styles.buttonGroup}>
        <Button
  onPress={() => router.push(`/EditMedication?id=${item.id}`)}
  style={styles.updateButton}
>
  Atualizar
</Button>

          <Button onPress={() => handleDeleteMedication(item.id)} style={styles.deleteButton}>
            Excluir
          </Button>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Medicamentos</Text>
      <FlatList
        data={medications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMedication}
        ListEmptyComponent={() => (
          <Text style={styles.emptyMessage}>Nenhum medicamento encontrado.</Text>
        )}
      />
     <Button onPress={() => router.push('/create-medicine')} style={styles.addButton}>
        + Adicionar Novo Medicamento
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7B9ABB',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 10,
  },
  medicationImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  period: {
    fontSize: 16,
    color: '#777',
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#7B9ABB',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 20,
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
});

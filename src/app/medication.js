import { FlatList, StyleSheet, View, Text, Alert } from 'react-native';
import Button from '../Views/components/Button';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useLoginStore } from '../stores/useLoginStore';
import { fetchAuth } from '../utils/fetchAuth'; 

export default function Medications() {
  const router = useRouter();
  const [medications, setMedications] = useState([]);
  const accessToken = useLoginStore.getState().accessToken;

  const fetchMedications = async () => {
    try {
      const response = await fetchAuth('http://localhost:3000/medication/list', { 
        method: 'GET', 
      });
      if (!response.ok) throw new Error('Erro ao buscar registros');
      const data = await response.json();
      setMedications(data.medications);
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  const handleCreateMedication = async () => {
    // Simulating new medication with unique ID
    const newMedication = {
      id: Date.now(), // Generates a unique ID based on timestamp
      medicine: 'Relatório Atualizado',
      image: 'http://example.com/exam-updated.jpg',
      description: 'Receita médica atualizada',
      period: '7',
    };

    try {
      const response = await fetchAuth('http://localhost:3000/medication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Ensure the content type is set correctly
        },
        body: JSON.stringify(newMedication),
      });

      if (!response.ok) throw new Error('Erro ao criar registro');
      const data = await response.json();
      Alert.alert('Sucesso', 'Registro criado com sucesso');
      fetchMedications(); 
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  const handleUpdateMedication = async (id) => {
    const updatedMedication = {
      id: id,
      medicine: 'Relatório Atualizado',
      image: 'http://example.com/exam-updated.jpg',
      description: 'Receita médica atualizada',
      period: '7',
    };

    try {
      const response = await fetchAuth(`http://localhost:3000/medication/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',  // Ensure the content type is set correctly
        },
        body: JSON.stringify(updatedMedication),
      });

      if (!response.ok) throw new Error('Erro ao atualizar registro');
      const data = await response.json();
      Alert.alert('Sucesso', 'Registro atualizado com sucesso');
      fetchMedications(); 
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  const handleDeleteMedication = async (id) => {
    try {
      const response = await fetchAuth(`http://localhost:3000/medication/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erro ao excluir registro');
      Alert.alert('Sucesso', 'Registro excluído com sucesso');
      fetchMedications(); 
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  useEffect(() => {
    fetchMedications(); 
  }, []);

  const renderMedication = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.doctorName}>{item.report}</Text>
      <Text style={styles.specialty}>{item.date}</Text>
      <View style={styles.buttonGroup}>
        <Button onPress={() => handleUpdateMedication(item.id)} style={styles.updateButton}>
          Atualizar
        </Button>
        <Button onPress={() => handleDeleteMedication(item.id)} style={styles.deleteButton}>
          Excluir
        </Button>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Registros Médicos</Text>
      <FlatList
        data={medications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMedication}
        ListEmptyComponent={() => (
          <Text style={styles.emptyMessage}>Nenhum registro encontrado.</Text>
        )}
      />
      <Button onPress={handleCreateMedication} style={styles.addButton}>
        + Adicionar Novo Registro
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
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  specialty: {
    fontSize: 16,
    color: '#666666',
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

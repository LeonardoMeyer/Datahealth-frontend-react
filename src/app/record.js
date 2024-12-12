import { FlatList, StyleSheet, View, Text, Alert, Image } from 'react-native';
import Button from '../Views/components/Button';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useRecordStore } from '../stores/useRecordStore';
import { fetchAuth } from '../utils/fetchAuth';

export default function Records() {
  const router = useRouter();
  const { records, setRecords, deleteRecord, updateRecord } = useRecordStore();

  const fetchRecords = async () => {
    try {
      const response = await fetchAuth('http://localhost:3000/record/list', {
        method: 'GET',
      });
      if (!response.ok) throw new Error('Erro ao buscar registros');
      const data = await response.json();
      setRecords(data.records);
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  const handleDeleteRecord = async (id) => {
    try {
      const response = await fetchAuth(`http://localhost:3000/record/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erro ao excluir registro');
      deleteRecord(id);
      Alert.alert('Sucesso', 'Registro excluído com sucesso');
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  const handleUpdateRecord = (id) => {
    router.push(`/EditRecord?id=${id}`);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const renderRecord = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.doctorName}>{item.report}</Text>
      <Text style={styles.specialty}>{item.date}</Text>
      {item.exam && (
        <Image source={{ uri: item.exam }} style={styles.examImage} />
      )}
      <View style={styles.buttonGroup}>
        <Button onPress={() => handleUpdateRecord(item.id)} style={styles.updateButton}>
          Atualizar
        </Button>
        <Button onPress={() => handleDeleteRecord(item.id)} style={styles.deleteButton}>
          Excluir
        </Button>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Registros Médicos</Text>
      <FlatList
        data={records}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRecord}
        ListEmptyComponent={() => (
          <Text style={styles.emptyMessage}>Nenhum registro encontrado.</Text>
        )}
      />
      <Button onPress={() => router.push('/create-record')} style={styles.addButton}>
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
  examImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginVertical: 10,
    resizeMode: 'contain',
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
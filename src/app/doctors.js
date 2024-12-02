import { FlatList, StyleSheet, View, Text, Alert } from 'react-native';
import Button from '../Views/components/Button';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

export default function Doctors() {
  const router = useRouter();
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:3000/doctor/list'); // Ajuste a URL
      if (!response.ok) throw new Error('Erro ao buscar médicos');
      const data = await response.json();
      setDoctors(data.doctors); // Atualiza o estado com a lista de médicos
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };
  

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Função para navegar para a página de atualização de médico
  const handleUpdate = (id) => {
    router.push(`/update-doctor/${id}`);
  };

  // Função para excluir um médico
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/doctor/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao excluir médico');
      Alert.alert('Sucesso', 'Médico excluído com sucesso');
      fetchDoctors(); // Atualiza a lista
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  // Função para adicionar um novo médico
  const handleAdd = () => {
    router.push('/add-doctor');
  };

  // Renderiza cada item da lista de médicos
  const renderDoctor = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.doctorName}>{item.name}</Text>
      <Text style={styles.specialty}>{item.specialization}</Text>
      <View style={styles.buttonGroup}>
        <Button onPress={() => handleUpdate(item.id)} style={styles.updateButton}>
          Atualizar
        </Button>
        <Button onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
          Excluir
        </Button>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Médicos</Text>
      <FlatList
        data={doctors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderDoctor}
        ListEmptyComponent={() => (
          <Text style={styles.emptyMessage}>Nenhum médico encontrado.</Text>
        )}
      />
      <Button onPress={handleAdd} style={styles.addButton}>
        + Adicionar Novo Médico
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

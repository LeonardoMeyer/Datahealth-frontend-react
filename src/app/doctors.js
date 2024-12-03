import { FlatList, StyleSheet, View, Text, Alert } from 'react-native';
import Button from '../Views/components/Button';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

export default function Doctors() {
  const router = useRouter();
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:3000/doctor/list');
      if (!response.ok) throw new Error('Erro ao buscar médicos');
      const data = await response.json();
      setDoctors(data.doctors);
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  const handleUpdate = async (id, updatedDoctor) => {
    try {
      const response = await fetch(`http://localhost:3000/doctor/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDoctor),
      });

      if (!response.ok) throw new Error('Erro ao atualizar médico');
      Alert.alert('Sucesso', 'Médico atualizado com sucesso');
      fetchDoctors();
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/doctor/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao excluir médico');
      Alert.alert('Sucesso', 'Médico excluído com sucesso');
      fetchDoctors();
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  const handleAdd = () => {
    router.push('/add-doctor');
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const renderDoctor = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.doctorName}>{item.name}</Text>
      <Text style={styles.specialty}>{item.specialization}</Text>
      <View style={styles.buttonGroup}>
        <Button onPress={() => handleUpdate(item.id, { name: item.name, specialization: item.specialization })} style={styles.updateButton}>
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

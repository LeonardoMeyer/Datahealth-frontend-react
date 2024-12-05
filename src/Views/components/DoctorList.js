import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import Button from '../views/components/Button';

export default function DoctorList({ navigation }) {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch doctors list
  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:3000/doctors');
      if (!response.ok) throw new Error('Erro ao carregar médicos.');
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      Alert.alert('Erro', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete doctor
  const handleDelete = async (id) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja deletar este médico?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(`http://localhost:3000/doctors/${id}`, {
                method: 'DELETE',
              });
              if (!response.ok) throw new Error('Erro ao deletar médico.');
              setDoctors(doctors.filter((doctor) => doctor.id !== id));
              Alert.alert('Sucesso', 'Médico deletado com sucesso.');
            } catch (error) {
              Alert.alert('Erro', error.message);
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const renderDoctor = ({ item }) => (
    <View style={styles.card}>
      {/* Nome do Médico */}
      <Text style={styles.name}>{item.name}</Text>

      {/* Dados adicionais */}
      <Text style={styles.details}>Email: {item.email}</Text>
      <Text style={styles.details}>Idade: {item.age}</Text>
      <Text style={styles.details}>Especialização: {item.specialization}</Text>

      {/* Ações: Editar e Deletar */}
      <View style={styles.actions}>
        <Button onPress={() => navigation.navigate('UpdateDoctor', { id: item.id })}>
          Editar
        </Button>
        <TouchableOpacity
          onPress={() => handleDelete(item.id)}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteText}>Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.navigate('CreateDoctor')} style={styles.addButton}>
        Cadastrar Médico
      </Button>
      {isLoading ? (
        <Text style={styles.loadingText}>Carregando...</Text>
      ) : (
        <FlatList
          data={doctors}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderDoctor}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>Nenhum médico encontrado.</Text>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  card: {
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  details: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  deleteButton: {
    padding: 10,
    backgroundColor: '#ff5555',
    borderRadius: 5,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addButton: {
    marginBottom: 20,
    backgroundColor: '#4caf50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
});

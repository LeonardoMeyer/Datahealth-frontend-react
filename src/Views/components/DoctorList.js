import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import Button from '../views/components/Button';

export default function DoctorList({ navigation }) {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:3000/doctors');
      if (!response.ok) throw new Error('Erro ao carregar médicos.');
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/doctors/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao deletar médico.');
      setDoctors(doctors.filter((doctor) => doctor.id !== id));
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const renderDoctor = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text>Email: {item.email}</Text>
      <Text>Idade: {item.age}</Text>
      <Text>Especialização: {item.specialization}</Text>
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
 <Button onPress={() => router.push('/CreateDoctor')} style={styles.signupButton}>
          Cadastre-se
        </Button>      {isLoading ? (
        <Text>Carregando...</Text>
      ) : (
        <FlatList
          data={doctors}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderDoctor}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  card: {
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
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
  },
});

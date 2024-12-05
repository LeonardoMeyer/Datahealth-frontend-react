import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Text, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Button from '../Views/components/Button';
import { useRouter } from 'expo-router';
import { useDoctorStore } from '../stores/useDoctorStore';

export default function Doctors() {
  const router = useRouter();
  const { doctors, setDoctors, deleteDoctor } = useDoctorStore();
  const [specialization, setSpecialization] = useState('');
  const [gender, setGender] = useState('');

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

  const handleUpdate = (id) => {
    router.push(`/update-doctor/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/doctor/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao excluir médico');
      Alert.alert('Sucesso', 'Médico excluído com sucesso');
      deleteDoctor(id); 
      fetchDoctors(); 
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  const handleAdd = () => {
    router.push('/create-doctor');
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const renderDoctor = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.doctorName}>{item.name}</Text>
      <Text style={styles.specialty}>Especialização: {item.specialization}</Text>
      <Text style={styles.specialty}>Gênero: {item.gender}</Text>
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

      {/* Filtros */}
      <Text style={styles.label}>Especialização:</Text>
      <Picker
        selectedValue={specialization}
        onValueChange={(value) => setSpecialization(value)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione" value="" />
        <Picker.Item label="Cardiologia" value="cardiologia" />
        {/* Adicione outras especializações aqui */}
      </Picker>

      <Text style={styles.label}>Gênero:</Text>
      <Picker
        selectedValue={gender}
        onValueChange={(value) => setGender(value)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione" value="" />
        <Picker.Item label="Mulher" value="mulher" />
        <Picker.Item label="Homem" value="homem" />
        {/* Adicione outras opções de gênero aqui */}
      </Picker>

      <FlatList
        data={doctors.filter(
          (doctor) =>
            (!specialization || doctor.specialization === specialization) &&
            (!gender || doctor.gender === gender)
        )}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderDoctor}
        ListEmptyComponent={() => (
          <Text style={styles.emptyMessage}>Nenhum médico encontrado.</Text>
        )}
      />
      <Button onPress={handleAdd} style={styles.addButton}>
        Criar Médico
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#444',
  },
  picker: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginBottom: 15,
    padding: 10,
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

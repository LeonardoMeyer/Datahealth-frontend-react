import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Text, Alert, TextInput, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Button from '../Views/components/Button';
import { useRouter } from 'expo-router';
import { useDoctorStore } from '../stores/useDoctorStore';
export default function Doctors() {
  const router = useRouter();
  const { doctors, setDoctors, deleteDoctor } = useDoctorStore();
  const [specialization, setSpecialization] = useState('');
  const [gender, setGender] = useState('');
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [doctorData, setDoctorData] = useState({
    name: '',
    specialization: '',
    gender: '',
    email: '',
    age: '',
    avatar: '', 
  });

  const specializationsList = [
    "Cardiologia",
    "Pediatria",
    "Dermatologia",
    "Neurologia",
    "Ortopedia",
    "Oftalmologia",
    "Psicologia",
    "Endocrinologia",
    "Ginecologia",
  ];

  const genderList = ["Mulher", "Homem", "Trans", "Não-binário", "Outro"];

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

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor.id);
    setDoctorData({
      name: doctor.name,
      specialization: doctor.specialization,
      gender: doctor.gender,
      email: doctor.email,
      age: doctor.age,
      avatar: doctor.avatar, 
    });
  };

  const handleUpdate = async () => {
    try {
      if (
        !doctorData.name.trim() ||
        !doctorData.specialization.trim() ||
        !doctorData.gender.trim() ||
        !doctorData.email.trim() ||
        !doctorData.age
      ) {
        Alert.alert('Erro', 'Todos os campos obrigatórios devem ser preenchidos');
        return;
      }

      const url = `http://localhost:3000/doctor/${editingDoctor}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctorData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Erro ao atualizar médico');
      }

      Alert.alert('Sucesso', 'Médico atualizado com sucesso');
      setEditingDoctor(null);
      setDoctorData({ name: '', specialization: '', gender: '', email: '', age: '', avatar: '' });
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
      deleteDoctor(id);
      fetchDoctors();
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const renderDoctor = ({ item }) => (
    <View style={styles.card}>
      {item.avatar && (
        <Image source={{ uri: item.avatar }} style={styles.doctorImage} />
      )}
      <Text style={styles.doctorName}>{item.name}</Text>
      <Text style={styles.specialty}>Especialização: {item.specialization}</Text>
      <Text style={styles.specialty}>Gênero: {item.gender}</Text>
      <Text style={styles.specialty}>Email: {item.email}</Text>

      <View style={styles.buttonGroup}>
        <Button onPress={() => handleEdit(item)} style={styles.updateButton}>
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

      <Text style={styles.label}>Especialização:</Text>
      <Picker
        selectedValue={specialization}
        onValueChange={(value) => setSpecialization(value)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione" value="" />
        {specializationsList.map((spec, index) => (
          <Picker.Item key={index} label={spec} value={spec.toLowerCase()} />
        ))}
      </Picker>

      <Text style={styles.label}>Gênero:</Text>
      <Picker
        selectedValue={gender}
        onValueChange={(value) => setGender(value)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione" value="" />
        {genderList.map((g, index) => (
          <Picker.Item key={index} label={g} value={g.toLowerCase()} />
        ))}
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

      {editingDoctor && (
        <View style={styles.editForm}>
          <Text style={styles.title}>Atualizar Médico</Text>
          <Text style={styles.label}>Nome:</Text>
          <TextInput
            value={doctorData.name}
            onChangeText={(text) => setDoctorData({ ...doctorData, name: text })}
            style={styles.input}
          />
          <Text style={styles.label}>Especialização:</Text>
          <Picker
            selectedValue={doctorData.specialization}
            onValueChange={(value) => setDoctorData({ ...doctorData, specialization: value })}
            style={styles.picker}
          >
            <Picker.Item label="Selecione" value="" />
            {specializationsList.map((spec, index) => (
              <Picker.Item key={index} label={spec} value={spec.toLowerCase()} />
            ))}
          </Picker>
          <Text style={styles.label}>Gênero:</Text>
          <Picker
            selectedValue={doctorData.gender}
            onValueChange={(value) => setDoctorData({ ...doctorData, gender: value })}
            style={styles.picker}
          >
            <Picker.Item label="Selecione" value="" />
            {genderList.map((g, index) => (
              <Picker.Item key={index} label={g} value={g.toLowerCase()} />
            ))}
          </Picker>
          <Text style={styles.label}>URL do Avatar:</Text>
          <TextInput
            value={doctorData.avatar}
            onChangeText={(text) => setDoctorData({ ...doctorData, avatar: text })}
            style={styles.input}
            placeholder="Digite a URL do avatar"
          />
          {doctorData.avatar && (
            <Image source={{ uri: doctorData.avatar }} style={styles.previewImage} />
          )}
          <Button onPress={handleUpdate} style={styles.updateButton}>
            Atualizar Médico
          </Button>
          <Button onPress={() => setEditingDoctor(null)} style={styles.cancelButton}>
            Cancelar
          </Button>
        </View>
      )}

      <Button onPress={() => router.push('/create-doctor')} style={styles.addButton}>
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
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
  editForm: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
    marginBottom: 20,
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 10,
  },
});

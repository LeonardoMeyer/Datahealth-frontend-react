import { ScrollView, StyleSheet, View, Text } from 'react-native';
import Button from '../Views/components/Button';
import { useRouter } from 'expo-router';
const router = useRouter();

export default function Doctors() {
  const handleUpdate = (id) => {
    // Lógica para atualizar o médico
    console.log(`Atualizar médico com ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Lógica para deletar o médico
    console.log(`Deletar médico com ID: ${id}`);
  };

  const handleAdd = () => {
    // Lógica para adicionar um novo médico
    console.log('Adicionar novo médico');
    router.push('/add-doctor');
  };

  const doctors = [
    { id: 1, name: 'Dr. João Silva', specialty: 'Cardiologista' },
    { id: 2, name: 'Dra. Maria Oliveira', specialty: 'Neurologista' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Lista de Médicos</Text>
      {doctors.map((doctor) => (
        <View key={doctor.id} style={styles.card}>
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <Text style={styles.specialty}>{doctor.specialty}</Text>
          <View style={styles.buttonGroup}>
            <Button onPress={() => handleUpdate(doctor.id)} style={styles.updateButton}>
              Atualizar
            </Button>
            <Button onPress={() => handleDelete(doctor.id)} style={styles.deleteButton}>
              Excluir
            </Button>
          </View>
        </View>
      ))}
      <Button onPress={handleAdd} style={styles.addButton}>
        + Adicionar Novo Médico
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F7",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#7B9ABB",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  specialty: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  updateButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#FF5722",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: "#7B9ABB",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 20,
  },
});

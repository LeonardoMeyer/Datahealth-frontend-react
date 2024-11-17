import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PatientRecords() {
  return (
    <View style={styles.card}>
      <Text style={styles.header}>Registros de Pacientes</Text>
      <Text>Informações sobre os pacientes serão listadas aqui...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
});

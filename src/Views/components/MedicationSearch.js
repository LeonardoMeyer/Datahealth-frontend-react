import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';

export default function MedicationSearch() {
  const [query, setQuery] = useState('');
  const [medications, setMedications] = useState([]);

  const fetchMedications = async (searchQuery) => {
    // Aqui você pode integrar a API da ANVISA
    // Exemplo básico para simular a busca:
    setMedications([
      { id: '1', name: 'Paracetamol' },
      { id: '2', name: 'Ibuprofeno' }
    ]);
  };

  useEffect(() => {
    if (query.length > 2) {
      fetchMedications(query);
    }
  }, [query]);

  return (
    <View style={styles.card}>
      <Text style={styles.header}>Pesquisa de Medicamentos</Text>
      <TextInput
        style={styles.input}
        placeholder="Buscar medicamentos..."
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={medications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.medicationItem}>
            <Text style={styles.medicationName}>{item.name}</Text>
          </View>
        )}
      />
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
  input: {
    padding: 10,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#F9F9F9',
    marginBottom: 10,
    fontSize: 16,
  },
  medicationItem: {
    padding: 10,
    borderBottomColor: '#EFEFEF',
    borderBottomWidth: 1,
  },
  medicationName: {
    fontSize: 16,
    color: '#333',
  },
});

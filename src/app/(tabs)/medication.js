import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, FlatList, Alert } from 'react-native';

const API_URL = 'https://api.fda.gov/drug/label.json?limit=100'; // URL da API OpenFDA

export default function MedicationList() {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMedications();
  }, []);

  const fetchMedications = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const medicationsList = data.results.map((item, index) => ({
          id: index + 1,
          nome: item.openfda.brand_name?.[0] || 'Nome Desconhecido',
          fabricante: item.openfda.manufacturer_name?.[0] || 'Fabricante Desconhecido',
        }));
        setMedications(medicationsList);
      } else {
        Alert.alert('Nenhum resultado', 'A API não retornou nenhum medicamento.');
      }
    } catch (error) {
      console.error('Erro ao buscar medicamentos:', error);
      Alert.alert('Erro', 'Não foi possível buscar os medicamentos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Lista de Medicamentos</Text>
      {loading ? (
        <Text style={styles.loadingText}>Carregando...</Text>
      ) : (
        <FlatList
          data={medications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.medicationName}>{item.nome}</Text>
              <Text style={styles.info}>Fabricante: {item.fabricante}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhum medicamento encontrado.</Text>}
        />
      )}
    </ScrollView>
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
  loadingText: {
    textAlign: 'center',
    color: '#666666',
    marginVertical: 10,
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
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,
    color: '#666666',
    marginTop: 5,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999999',
    marginTop: 20,
  },
});

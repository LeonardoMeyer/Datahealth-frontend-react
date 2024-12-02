import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, TextInput, Alert, FlatList } from 'react-native';
import Button from '../Views/components/Button';

const API_URL = 'https://api.fda.gov/drug/label.json';

export default function Medication() {
  const [searchTerm, setSearchTerm] = useState('');
  const [medications, setMedications] = useState([]);
  const [addedMedications, setAddedMedications] = useState([]); // Lista local de medicamentos adicionados
  const [loading, setLoading] = useState(false);

  const fetchMedications = async (query) => {
    if (query.length >= 1) {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}?search=${query}&limit=10`);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          setMedications(data.results.map((item, index) => ({
            id: index + 1,
            nome: item.openfda.brand_name?.[0] || 'Nome Desconhecido',
            fabricante: item.openfda.manufacturer_name?.[0] || 'Fabricante Desconhecido',
            substancia: item.openfda.substance_name?.[0] || 'Substância Desconhecida',
          })));
        } else {
          setMedications([]);
          Alert.alert('Nenhum resultado', 'Nenhum medicamento encontrado para a pesquisa.');
        }
      } catch (error) {
        console.error('Erro ao buscar medicamentos:', error);
        Alert.alert('Erro', 'Não foi possível buscar os medicamentos.');
      } finally {
        setLoading(false);
      }
    } else {
      setMedications([]);
    }
  };

  const handleSearchInput = (query) => {
    setSearchTerm(query);
    fetchMedications(query);
  };

  const handleAdd = (medication) => {
    if (addedMedications.find((item) => item.id === medication.id)) {
      Alert.alert('Aviso', 'Este medicamento já foi adicionado.');
    } else {
      setAddedMedications([...addedMedications, medication]);
      Alert.alert('Sucesso', 'Medicamento adicionado à lista.');
    }
  };

  const handleUpdate = (id) => {
    const updatedList = addedMedications.map((item) =>
      item.id === id ? { ...item, nome: `${item.nome} (Atualizado)` } : item
    );
    setAddedMedications(updatedList);
    Alert.alert('Sucesso', 'Medicamento atualizado.');
  };

  const handleDelete = (id) => {
    const updatedList = addedMedications.filter((item) => item.id !== id);
    setAddedMedications(updatedList);
    Alert.alert('Sucesso', 'Medicamento removido da lista.');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Busca de Medicamentos</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Digite o nome do medicamento"
          value={searchTerm}
          onChangeText={handleSearchInput}
        />
      </View>
      {loading ? (
        <Text style={styles.loadingText}>Carregando...</Text>
      ) : (
        <FlatList
          data={medications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.medicationName}>{item.nome}</Text>
                <Text style={styles.info}>Fabricante: {item.fabricante}</Text>
                <Text style={styles.info}>Substância: {item.substancia}</Text>
                <View style={styles.buttonGroup}>
                  <Button onPress={() => handleAdd(item)} style={styles.addButton}>
                    Adicionar
                  </Button>
                </View>
              </View>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhum medicamento encontrado.</Text>}
        />
      )}
      <Text style={styles.title}>Medicamentos Adicionados</Text>
      <FlatList
        data={addedMedications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.medicationName}>{item.nome}</Text>
              <Text style={styles.info}>Fabricante: {item.fabricante}</Text>
              <Text style={styles.info}>Substância: {item.substancia}</Text>
              <View style={styles.buttonGroup}>
                <Button onPress={() => handleUpdate(item.id)} style={styles.updateButton}>
                  Atualizar
                </Button>
                <Button onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                  Excluir
                </Button>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum medicamento foi adicionado ainda.</Text>
        }
      />
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
  searchContainer: {
    marginBottom: 20,
  },
  searchInput: {
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
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
  cardContent: {
    flex: 1,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  updateButton: {
    backgroundColor: '#FFC107',
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
  emptyText: {
    textAlign: 'center',
    color: '#999999',
    marginTop: 20,
  },
});

import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  FlatList,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const API_URL = 'https://api.fda.gov/drug/label.json?limit=100';

export default function MedicationList() {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lists, setLists] = useState({});
  const [newListName, setNewListName] = useState('');
  const [selectedList, setSelectedList] = useState(null);

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

  const createNewList = () => {
    if (!newListName.trim()) {
      Alert.alert('Erro', 'Por favor, insira um nome para a lista.');
      return;
    }
    if (lists[newListName]) {
      Alert.alert('Erro', 'Uma lista com este nome já existe.');
      return;
    }
    setLists((prevLists) => ({ ...prevLists, [newListName]: [] }));
    setNewListName('');
    Alert.alert('Lista criada', `A lista "${newListName}" foi criada com sucesso.`);
  };

  const addMedicationToList = (medication) => {
    const listNames = Object.keys(lists);
    if (listNames.length === 0) {
      Alert.alert('Erro', 'Nenhuma lista disponível. Crie uma lista primeiro.');
      return;
    }

    Alert.alert(
      'Selecionar Lista',
      'Escolha a lista para adicionar o medicamento:',
      listNames.map((listName) => ({
        text: listName,
        onPress: () => {
          setLists((prevLists) => ({
            ...prevLists,
            [listName]: [...prevLists[listName], medication],
          }));
          Alert.alert('Adicionado', `${medication.nome} foi adicionado à lista "${listName}".`);
        },
      }))
    );
  };

  const updateMedicationInList = (listName, medication) => {
    Alert.prompt(
      'Atualizar Medicamento',
      'Digite o novo nome do medicamento:',
      (newName) => {
        setLists((prevLists) => ({
          ...prevLists,
          [listName]: prevLists[listName].map((med) =>
            med.id === medication.id ? { ...med, nome: newName } : med
          ),
        }));
        Alert.alert('Atualizado', `O medicamento foi atualizado para "${newName}".`);
      }
    );
  };

  const deleteMedicationFromList = (listName, medication) => {
    setLists((prevLists) => ({
      ...prevLists,
      [listName]: prevLists[listName].filter((med) => med.id !== medication.id),
    }));
    Alert.alert('Excluído', `O medicamento "${medication.nome}" foi excluído da lista "${listName}".`);
  };

  const deleteList = (listName) => {
    const updatedLists = { ...lists };
    delete updatedLists[listName];
    setLists(updatedLists);
    if (selectedList === listName) setSelectedList(null);
    Alert.alert('Lista excluída', `A lista "${listName}" foi excluída.`);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Lista de Medicamentos</Text>

      <View style={styles.newListContainer}>
        <TextInput
          placeholder="Nome da nova lista"
          value={newListName}
          onChangeText={setNewListName}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={createNewList}>
          <Text style={styles.buttonText}>Criar Lista</Text>
        </TouchableOpacity>
      </View>

     
      {Object.keys(lists).length > 0 && (
        <View style={styles.listSelection}>
          <Text style={styles.subtitle}>Listas Criadas:</Text>
          {Object.keys(lists).map((listName) => (
            <TouchableOpacity
              key={listName}
              style={[
                styles.listButton,
                selectedList === listName && styles.selectedListButton,
              ]}
              onPress={() => setSelectedList(listName)}
            >
              <Text style={styles.listButtonText}>{listName}</Text>
              <TouchableOpacity onPress={() => deleteList(listName)}>
                <Text style={styles.deleteText}>Excluir Lista</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {loading ? (
        <Text style={styles.loadingText}>Carregando medicamentos...</Text>
      ) : (
        <FlatList
          data={medications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.medicationName}>{item.nome}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => addMedicationToList(item)}
              >
                <Text style={styles.buttonText}>Adicionar à Lista</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhum medicamento encontrado.</Text>}
        />
      )}

      {selectedList && lists[selectedList]?.length > 0 && (
        <View style={styles.listDetails}>
          <Text style={styles.subtitle}>Medicamentos em {selectedList}:</Text>
          <FlatList
            data={lists[selectedList]}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.medicationName}>{item.nome}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => updateMedicationInList(selectedList, item)}
                >
                  <Text style={styles.buttonText}>Atualizar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => deleteMedicationFromList(selectedList, item)}
                >
                  <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}

      {selectedList && lists[selectedList]?.length === 0 && (
        <Text style={styles.emptyText}>
          Nenhum medicamento na lista "{selectedList}".
        </Text>
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
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#7B9ABB',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  listButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#EEE',
    marginBottom: 5,
    borderRadius: 8,
  },
  selectedListButton: {
    backgroundColor: '#CCE5FF',
  },
  listButtonText: {
    fontSize: 16,
  },
  deleteText: {
    color: '#FF6B6B',
    fontSize: 14,
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
  emptyText: {
    textAlign: 'center',
    color: '#999999',
    marginTop: 20,
  },
  listDetails: {
    marginTop: 20,
  },
});

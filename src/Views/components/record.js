import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { fetchAuth } from '../../utils/fetchAuth';
import CardAccount2 from '../components/CardAccount2'; // Importe o componente CardAccount2

const RecordsScreen = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Função para buscar os registros
    const fetchRecords = async () => {
      try {
        const response = await fetchAuth('http://localhost:3000/record/list');
        if (!response.ok) {
          throw new Error('Erro ao buscar registros');
        }
        const data = await response.json();
        setRecords(data.records); // Acessando a propriedade 'records'
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View>
      <Text>Lista de Prontuarios:</Text>
      <FlatList
        data={records}
        keyExtractor={(item) => item.id.toString()} // Usando o 'id' como chave
        renderItem={({ item }) => (
          <CardAccount2 record={item} /> // Passando o 'item' (record) para o CardAccount2
        )}
      />
    </View>
  );
};

export default RecordsScreen;

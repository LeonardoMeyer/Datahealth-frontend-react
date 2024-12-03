import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { fetchAuth } from '../../utils/fetchAuth';
import CardAccount2 from '../components/CardAccount2';

const RecordsScreen = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchRecords = async () => {
      try {
        const response = await fetchAuth('http://localhost:3000/record/list');
        if (!response.ok) {
          throw new Error('Erro ao buscar registros');
        }
        const data = await response.json();
        setRecords(data.records); 
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
        keyExtractor={(item) => item.id.toString()} 
        renderItem={({ item }) => (
          <CardAccount2 record={item} />
        )}
      />
    </View>
  );
};

export default RecordsScreen;

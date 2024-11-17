import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CardAccount from './CardAccount';
import { useAccountStore } from '../../stores/useAccountStore';

export default function Content() {
  const { accounts, setAccounts } = useAccountStore();

  useEffect(() => {
    const getAccounts = async () => {
      const response = await fetch('http://localhost:3000/account/list');
      if (response.ok) {
        const data = await response.json();
        setAccounts(data.accounts);
      } else {
        console.log('Erro ao carregar accounts');
      }
    };
    getAccounts();
  }, []);

  return (
    <View style={styles.content}>
      {accounts.length === 0 && <Text>Loading...</Text>}
      {accounts.map((account) => (
        <CardAccount
          key={account.id}
          id={account.id}
          service={account.service}
          imgUrl={account.logo_image}
          userName={account.username}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 5,
    marginBottom: 20,
  },
});

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Header from './views/components/Header';
import Footer from './views/components/Footer';
import colors from './src/colors';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <View style={styles.container}>
      {/* Cabeçalho fixo */}
      <Header />

      {/* Conteúdo principal com navegação */}
      <View style={styles.content}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </View>

      {/* Rodapé fixo */}
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBackground,
  },
  content: {
    flex: 1,
  },
});

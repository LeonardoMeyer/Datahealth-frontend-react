import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './views/components/Header';
import Footer from './views/components/Footer';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { useLoginStore } from './stores/useLoginStore';

export default function App() {
  const loadUser = useLoginStore((state) => state.loadUser);

  useEffect(() => {
    loadUser(); 
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  content: {
    flex: 1,
  },
});

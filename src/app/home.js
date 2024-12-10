import { ScrollView, StyleSheet, View, Text } from 'react-native';
import Header from '../Views/components/Header.js';
import Footer from '../Views/components/Footer.js';
import Button from '../Views/components/Button.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userLogged');
      router.replace('/login'); // Redireciona para a tela de login
    } catch (error) {
      console.error('Erro ao sair da conta:', error);
      Alert.alert('Erro ao sair da conta.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <View style={styles.buttonContainer}>
          <Button onPress={() => router.push('/medication')} style={styles.button}>
            Medicação
          </Button>
          <Button onPress={() => router.push('/record')} style={styles.button}>
            Prontuários
          </Button>
          <Button onPress={() => router.push('/doctors')} style={styles.button}>
            Médicos
          </Button>
        </View>
        <Button onPress={handleLogout} style={styles.logoutButton}>
          Sair da Conta
        </Button>
      </View>
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  content: {
    marginVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonContainer: {
    margin: 20,
    width: '100%',
  },
  button: {
    marginVertical: 10,
    backgroundColor: '#7B9ABB',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#FF5722',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
});

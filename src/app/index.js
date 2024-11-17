import { ScrollView, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { useEffect } from 'react';
import Footer from '../Views/components/Footer';
import { useRouter } from 'expo-router';

export default function Init() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona para a tela de login após 3 segundos
    setTimeout(() => router.replace('/login'), 3000);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Datahealth</Text>
        <Text style={styles.subtitle}>Gerencie informações de pacientes e hospital com o Datahealth.</Text>
        <ActivityIndicator size="large" color="#007AFF" style={{ marginVertical: 30 }} />
        <Footer />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#007AFF', // Cor azul no estilo Apple
  },
  subtitle: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
    color: '#333', // Cor cinza para o texto descritivo
    paddingHorizontal: 20,
  },
});

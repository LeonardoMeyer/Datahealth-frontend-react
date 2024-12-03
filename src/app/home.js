import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../Views/components/Header.js';
import Footer from '../Views/components/Footer.js';
import Button from '../Views/components/Button.js';
import { useLoginStore } from '../stores/useLoginStore.js'; // Importando o store para acessar o usuário logado

export default function Home() {
  const router = useRouter();
  const { user } = useLoginStore(); // Acessando o usuário logado
  const [isMounted, setIsMounted] = useState(false); // Estado para controlar o montamento do componente

  // Verifica se o componente foi montado
  useEffect(() => {
    setIsMounted(true); // Marca que o componente foi montado
  }, []);

  // Redireciona para o login se o usuário não estiver logado e o componente estiver montado
  useEffect(() => {
    if (isMounted && !user) {
      router.push('/login'); // Se não estiver logado, redireciona para login
    }
  }, [user, isMounted]);

  return (
    <ScrollView style={styles.container}>
      <Header />
      <View style={styles.content}>
        {user ? (
          <View style={styles.profileContainer}>
            <Image 
              source={{ uri: user.profileImage }} 
              style={styles.profileImage} 
            />
            <Text style={styles.profileName}>{user.name}</Text>
          </View>
        ) : (
          <Text style={styles.guestMessage}>Você não está logado.</Text>
        )}

        <View style={styles.buttonContainer}>
          <Button onPress={() => router.push('/create-record')} style={styles.button}>
            Novo Registro
          </Button>
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
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  guestMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
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
});

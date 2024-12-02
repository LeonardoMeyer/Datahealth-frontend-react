import { ScrollView, StyleSheet, View } from 'react-native';
import Header from '../Views/components/Header.js';
import Footer from '../Views/components/Footer.js';
import Content from '../Views/components/record.js';
import Button from '../Views/components/Button.js';
import { useRouter } from 'expo-router';
const router = useRouter();

export default function Home() {
  return (
    <ScrollView style={styles.container}>
      <Header />
      <Content />
      <View style={styles.buttonContainer}>
        <Button onPress={() => router.push('/create-record')} style={styles.button}>
          Novo Registro
        </Button>
        <Button onPress={() => router.push('/medication')} style={styles.button}>
          Medicação
        </Button>
        <Button onPress={() => router.push('/prescriptions')} style={styles.button}>
          Receitas
        </Button>
        <Button onPress={() => router.push('/doctors')} style={styles.button}>
          Médicos
        </Button>
      </View>
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F7",
  },
  buttonContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  button: {
    marginVertical: 10,
    backgroundColor: "#7B9ABB",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: "center",
  },
  header: {
    backgroundColor: "#7B9ABB",
    padding: 20,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
  },
  subHeaderText: {
    color: "#E1E1E6",
    fontSize: 18,
    marginTop: 5,
  },
});

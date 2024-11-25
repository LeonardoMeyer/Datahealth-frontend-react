import { ScrollView, StyleSheet } from 'react-native'
import Header from '../Views/components/Header';
import Footer from '../Views/components/Footer'
import Content from '../Views/components/record'


export default function Home() {
  return (
      <ScrollView style={styles.container}>
        <Header />
        <Content />
        <Footer />
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F7", 
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

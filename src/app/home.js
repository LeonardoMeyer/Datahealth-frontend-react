import { ScrollView, StyleSheet } from 'react-native'
import Header from '../Views/components/Header';
import Footer from '../Views/components/Footer'
import Content from '../Views/components/Content'


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
  }
})
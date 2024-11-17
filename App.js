import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Header from './views/components/Header';
import PatientRecords from './views/components/PatientRecords';
import MedicationSearch from './views/components/MedicationSearch';
import Appointments from './views/components/Appointments';
import Billing from './views/components/Billing';
import Footer from './views/components/Footer';
import colors from './src/colors';

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <PatientRecords />
        <MedicationSearch />
        <Appointments />
        <Billing />
      </ScrollView>
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
    padding: 20,
    paddingBottom: 60,
  },
});
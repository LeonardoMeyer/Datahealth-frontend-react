import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../colors';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Datahealth</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
});

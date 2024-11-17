import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>© 2023 Datahealth</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  text: {
    fontSize: 14,
    color: '#666',
  },
});

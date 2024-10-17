// screens/FinanceiroScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet, Linking } from 'react-native';

const FinanceiroScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Financeiro</Text>
      <Button
        title="Acessar Sistema Financeiro"
        onPress={() => Linking.openURL('https://sistemafinanceiro.com')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default FinanceiroScreen;

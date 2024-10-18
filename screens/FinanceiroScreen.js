// screens/FinanceiroScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet, Linking } from 'react-native';

const FinanceiroScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>Financeiro</Text>
        <Text style={styles.description}>
          Acesse o sistema financeiro para visualizar suas informações e fazer pagamentos.
        </Text>
        <Button
          title="Acessar Sistema Financeiro"
          onPress={() => Linking.openURL('https://sistemafinanceiro.com')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2', // Fundo claro
  },
  card: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white', // Cor do card
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center', // Centraliza o conteúdo do card
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'purple', // Cor do título
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333', // Cor do texto
  },
});

export default FinanceiroScreen;

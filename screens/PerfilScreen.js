// screens/PerfilScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const PerfilScreen = () => {
  // Exemplo de dados do usuário
  const usuario = {
    matricula: '123456',
    nome: 'João da Silva',
    email: 'joao.silva@email.com',
    foto: 'https://via.placeholder.com/150', // Substitua pela URL da foto do aluno
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: usuario.foto }} style={styles.foto} />
      <Text style={styles.header}>Perfil do Usuário</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Matrícula:</Text>
        <Text style={styles.text}>{usuario.matricula}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.text}>{usuario.nome}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.text}>{usuario.email}</Text>
      </View>
    </View>
  );
};

// Estilos para PerfilScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Centraliza os itens horizontalmente
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  foto: {
    width: 150,
    height: 150,
    borderRadius: 75, // Torna a imagem redonda
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ddd', // Adiciona uma borda suave
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
  },
  text: {
    fontSize: 18,
    color: '#777',
  },
});

export default PerfilScreen;

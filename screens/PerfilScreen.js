// screens/PerfilScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';

const PerfilScreen = ({ onLogout }) => {
  // Exemplo de dados do usuário
  const usuario = {
    matricula: '40404040',
    nome: 'João Campos',
    email: 'joao.@email.com',
    foto: 'https://media.discordapp.net/attachments/1219800390887804995/1296627078233460798/Joao-Campos-e1707765953255.png?ex=6712f991&is=6711a811&hm=d5bec49215213af2f8e7fb57e4d04067adba7aeac9f4b22ea461365057c36a61&=&format=webp&quality=lossless&width=1232&height=670',
  };

  const handleLogout = () => {
    // Aqui você pode implementar a lógica de logout (por exemplo, limpar o estado de autenticação)
    Alert.alert("Logout", "Você foi deslogado com sucesso!", [{ text: "OK", onPress: onLogout }]);
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

      {/* Botão de Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Deslogar</Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilos para PerfilScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  foto: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ddd',
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
  logoutButton: {
    backgroundColor: 'purple',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PerfilScreen;

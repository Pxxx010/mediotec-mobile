import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PerfilScreen = ({ onLogout }) => {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('Estudante');
  const [userEmail, setUserEmail] = useState('');
  const [userToken, setUserToken] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      try {
        const name = await AsyncStorage.getItem('@user_name');
        const email = await AsyncStorage.getItem('@user_email');
        const token = await AsyncStorage.getItem('@access_token');
        const cargo = await AsyncStorage.getItem('@user_role');

        if (name) setUserName(name);
        if (email) setUserEmail(email);
        if (token) setUserToken(token);
        if (cargo) setUserRole(cargo);
      } catch (e) {
        console.error('Erro ao obter os dados de autenticação', e);
      }
    };

    getUserData();
  }, []);

  const handleLogout = async () => {
    try {
      const name = await AsyncStorage.getItem('@user_name');
      const email = await AsyncStorage.getItem('@user_email');
  
      // Log de Logout
      console.log('-------------------')
      console.log(`Usuário deslogado:`);
      console.log(`Usuário: ${name}`);
      console.log(`Email: ${email}`);
      console.log('-------------------')

  
      // Remove todos os dados do usuario logado
      await AsyncStorage.multiRemove(['@user_name', '@user_email', '@access_token']);
  
      // Mensagem de logout
      Alert.alert("Logout", "Você foi deslogado com sucesso!", [{ text: "OK", onPress: onLogout }]);
    } catch (e) {
      console.error('Erro ao limpar os dados de autenticação', e);
      Alert.alert("Erro", "Não foi possível realizar o logout. Tente novamente.");
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('../img/avatar.png')}
        style={styles.foto}
      />
      <Text style={styles.header}>Perfil do Usuário</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.text}>{userName}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Cargo:</Text>
        <Text style={styles.text}>{userRole}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.text}>{userEmail}</Text>
      </View>
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

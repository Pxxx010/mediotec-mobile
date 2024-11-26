import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PerfilScreen = ({ onLogout }) => {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('Estudante');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      try {
        const name = await AsyncStorage.getItem('@user_name');
        const email = await AsyncStorage.getItem('@user_email');
        const cargo = await AsyncStorage.getItem('@user_role');

        if (name) setUserName(name);
        if (email) setUserEmail(email);
        if (cargo) setUserRole(cargo);
      } catch (e) {
        console.error('Erro ao obter os dados de autenticação', e);
      }
    };

    getUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(['@user_name', '@user_email', '@access_token']);
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
      <Text style={styles.header}>Perfil</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Fundo branco
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  foto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#004B8D',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  infoContainer: {
    width: '90%',
    marginBottom: 15,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  logoutButton: {
    backgroundColor: '#004B8D',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PerfilScreen;

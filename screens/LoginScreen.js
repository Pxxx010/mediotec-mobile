// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importe os ícones do Ionicons

const LoginScreen = ({ onLogin }) => {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    onLogin(matricula, senha); // Chama a função de login passada como prop
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MedioTec</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={24} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Matrícula"
          value={matricula}
          onChangeText={setMatricula}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={24} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7', // Adicione um fundo suave
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'purple',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20, // Cantos arredondados
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff', // Fundo branco para os inputs
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
  },
  icon: {
    marginRight: 10,
    color: 'gray',
  },
  button: {
    backgroundColor: 'purple',
    borderRadius: 20,
    paddingVertical: 10,
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LoginScreen;

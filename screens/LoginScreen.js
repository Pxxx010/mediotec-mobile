import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  StatusBar, // Import StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ onLogin }) => {
  const [matricula, setMatricula] = useState('adecarlo@gmail.com');
  const [senha, setSenha] = useState('20Mm292,&*m23210AMS2im1083ASNms01@');
  const [modalVisible, setModalVisible] = useState(false);
  const [welcomeModalVisible, setWelcomeModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const storeUserData = async (name, email, token) => {
    try {
      const payloadBase64 = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));
      const userId = decodedPayload.sub;
      const userRole = decodedPayload.userType;

      await AsyncStorage.setItem('@user_name', name);
      await AsyncStorage.setItem('@user_email', email);
      await AsyncStorage.setItem('@access_token', token);
      await AsyncStorage.setItem('@user_role', userRole);
      await AsyncStorage.setItem('@user_id', String(userId));
    } catch (e) {
      console.error('Erro ao salvar os dados de autenticação', e);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'https://backend-medio-tech-senac.onrender.com/auth/sign-in',
        {
          email: matricula,
          password: senha,
        }
      );

      const data = response.data;
      await storeUserData(data.user.name, data.user.email, data.accessToken);
      console.log(data.accessToken);
      onLogin(data.user.name, data.user.email);
      setWelcomeModalVisible(true);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Matrícula ou senha incorretas!');
      } else {
        setErrorMessage('Ocorreu um erro. Tente novamente.');
      }
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* Configura os ícones da status bar como pretos */}
      <StatusBar barStyle="dark-content" backgroundColor="#f7f7f7" />
      
      <Image
        source={require('../img/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={24} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          placeholderTextColor="#bbb"
          value={matricula}
          onChangeText={setMatricula}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={24} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#bbb"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      {/* Modais de erro e boas-vindas continuam */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  logo: {
    width: '80%',
    height: 100,
    alignSelf: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 45,
    paddingLeft: 10,
    color: '#333',
  },
  icon: {
    color: '#004B8D',
  },
  button: {
    backgroundColor: '#004B8D',
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default LoginScreen;

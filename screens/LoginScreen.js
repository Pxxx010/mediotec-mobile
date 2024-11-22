import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ onLogin }) => {
  const [matricula, setMatricula] = useState('root@gmail.com');
  const [senha, setSenha] = useState('20Mm292,&*m23210AMS2im1083ASNms01@');
  const [modalVisible, setModalVisible] = useState(false);
  const [welcomeModalVisible, setWelcomeModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const storeUserData = async (name, email, token) => {
    try {
      await AsyncStorage.setItem('@user_name', name);
      await AsyncStorage.setItem('@user_email', email);
      await AsyncStorage.setItem('@access_token', token);
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
      {/* Logomarca */}
      <Image
        source={require('../img/logo.png')} // Substitua pela URL da sua logomarca
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

      {/* Modal para exibir mensagem de erro */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{errorMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de boas-vindas */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={welcomeModalVisible}
        onRequestClose={() => {
          setWelcomeModalVisible(false);
          setMatricula('');
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Bem-vindo, {matricula}!</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setWelcomeModalVisible(false);
                setMatricula('');
              }}
            >
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  modalButton: {
    backgroundColor: '#6c63ff',
    borderRadius: 10,
    paddingVertical: 10,
    width: '100%',
  },
});

export default LoginScreen;

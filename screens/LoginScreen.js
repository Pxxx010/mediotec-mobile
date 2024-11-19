import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native';
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
      const response = await axios.post('https://backend-medio-tech-senac.onrender.com/auth/sign-in', {
        email: matricula,
        password: senha,
      });

      const data = response.data;
      await storeUserData(data.user.name, data.user.email, data.accessToken); // Salva nome, email e token no AsyncStorage
      onLogin(data.user.name, data.user.email); // Chama o callback com nome e token
      setWelcomeModalVisible(true); // Abre o modal de boas-vindas
      await getUserData();
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
      <Text style={styles.title}>MedioTec</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={24} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Matrícula"
          value={matricula}
          onChangeText={setMatricula}
          keyboardType="email-address"
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

      {/* Modal para exibir mensagem de erro */}
      <Modal
        animationType="slide"
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
        animationType="slide"
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
    borderRadius: 20,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: 'purple',
    borderRadius: 10,
    paddingVertical: 10,
    width: '100%',
  },
});

export default LoginScreen;

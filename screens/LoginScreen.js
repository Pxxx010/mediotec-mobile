import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios'; // Importando axios

const LoginScreen = ({ onLogin }) => {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [welcomeModalVisible, setWelcomeModalVisible] = useState(false); // Estado para modal de boas-vindas
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://backend-medio-tech-senac.onrender.com/auth/sign-in', {
        email: matricula, // Usando email como matrícula
        password: senha,
      });

      // Se a requisição for bem-sucedida
      const data = response.data;
      console.log(data); // Verifique os dados retornados
      onLogin(data.user.name, data.accessToken); // Chama o callback com o nome e token
      setWelcomeModalVisible(true); // Abre o modal de boas-vindas
    } catch (error) {
      // Se a requisição falhar
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
          keyboardType="email-address" // Usando email como matrícula
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
          setMatricula(''); // Limpa a matrícula após o modal ser fechado
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Bem-vindo, {matricula}!</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setWelcomeModalVisible(false);
                setMatricula(''); // Limpa a matrícula após o modal ser fechado
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
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

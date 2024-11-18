import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Modal, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native'; // Importando o Lottie

const ComunicadosScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [comunicadoSelecionado, setComunicadoSelecionado] = useState(null);
  const [comunicados, setComunicados] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAnnouncements = async () => {
    try {
      const token = await AsyncStorage.getItem('@access_token');
      const response = await fetch('https://backend-medio-tech-senac.onrender.com/announcements/read', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setComunicados(data.data);
    } catch (error) {
      console.error("Erro ao buscar comunicados:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        setComunicadoSelecionado(item);
        setModalVisible(true);
      }}
    >
      <Image source={require('../img/not.png')} style={styles.image}/>
      <View style={styles.cardContent}>
        <Text style={styles.titulo}>{item.title}</Text>
        <Text style={styles.descricao}>{item.content}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Comunicados</Text>
      {loading ? (
        <LottieView
          source={require('../assets/loader.json')} // Loader
          autoPlay
          loop
          style={styles.loader} // Loader Styles
        />
      ) : (
        <FlatList
          data={comunicados}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}

      {/* Modal para exibir o comunicado completo */}
      {comunicadoSelecionado && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image source={require('../img/not.png')} style={styles.modalImage} />
              <Text style={styles.modalTitulo}>{comunicadoSelecionado.title}</Text>
              <Text style={styles.modalDescricao}>{comunicadoSelecionado.content}</Text>
              <Button title="Fechar" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f2f2f2', // Fundo mais suave
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 25, // Torna a imagem circular
  },
  cardContent: {
    flex: 1,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Cor do texto mais escura
  },
  descricao: {
    fontSize: 14,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fundo escurecido para o modal
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // Torna a imagem circular
    marginBottom: 20,
  },
  modalTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalDescricao: {
    fontSize: 18,
    marginBottom: 20,
    color: '#666',
  },
  loader: {
    width: 250, // Tamanho maior
    height: 250, // Tamanho maior
    alignSelf: 'center', // Centraliza horizontalmente
    justifyContent: 'center', // Garante que ele esteja no centro verticalmente
    position: 'absolute', // Garante que ele esteja sobre o conteúdo
    top: '50%', // Centraliza verticalmente
    left: '50%', // Centraliza horizontalmente
    marginTop: -125, // Ajuste de posicionamento para o centro exato
    marginLeft: -125, // Ajuste de posicionamento para o centro exato
  },
});

export default ComunicadosScreen;

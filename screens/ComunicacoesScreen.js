import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';

const ComunicadosScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [comunicadoSelecionado, setComunicadoSelecionado] = useState(null);
  const [comunicados, setComunicados] = useState([]);
  const [filteredComunicados, setFilteredComunicados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchAnnouncements = async () => {
    try {
      const token = await AsyncStorage.getItem('@access_token');
      const response = await fetch(
        'https://backend-medio-tech-senac.onrender.com/announcements/read',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setComunicados(data.data);
      setFilteredComunicados(data.data);
    } catch (error) {
      console.error('Erro ao buscar comunicados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = comunicados.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredComunicados(filtered);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          setComunicadoSelecionado(item);
          setModalVisible(true);
        }}
      >
        <Image source={require('../img/not.png')} style={styles.image} />
        <View style={styles.cardContent}>
          <Text style={styles.titulo}>{item.title}</Text>
          <Text style={styles.descricao} numberOfLines={2}>
            {item.content}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Comunicados</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar comunicados..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      {loading ? (
        <LottieView
          source={require('../assets/loader.json')}
          autoPlay
          loop
          style={styles.loader}
        />
      ) : filteredComunicados.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>Comunicado não encontrado</Text>
        </View>
      ) : (
        <FlatList
          data={filteredComunicados}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer} // Estilo aplicado na lista
        />
      )}

      {/* Modal para exibir o comunicado completo */}
      {comunicadoSelecionado && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image source={require('../img/not.png')} style={styles.modalImage} />
              <Text style={styles.modalTitulo}>{comunicadoSelecionado.title}</Text>
              <Text style={styles.modalDescricao}>{comunicadoSelecionado.content}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
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
    backgroundColor: '#f2f2f2',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004B8D',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  searchContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
    borderColor: '#004B8D',
    borderWidth: 1,
    height: 40,
    width: '95%',
  },
  listContainer: {
    alignItems: 'center', // Centraliza os itens na tela
  },
  cardContainer: {
    width: '95%', // Define a largura de cada cartão
    alignItems: 'center', // Centraliza o cartão horizontalmente
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    borderColor: '#004B8D',
    borderWidth: 1,
    width: '100%',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 25,
  },
  cardContent: {
    flex: 1,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004B8D',
  },
  descricao: {
    fontSize: 14,
    color: '#666',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 18,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  modalTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004B8D',
    marginBottom: 10,
  },
  modalDescricao: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#004B8D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  loader: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
});

export default ComunicadosScreen;

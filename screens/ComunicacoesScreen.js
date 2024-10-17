import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Modal, Button } from 'react-native';

const comunicadosFake = [
  { id: '1', titulo: 'Reunião de Pais', descricao: 'Haverá uma reunião de pais na próxima sexta-feira.', imagem: 'https://via.placeholder.com/50' },
  { id: '2', titulo: 'Feira de Ciências', descricao: 'Participe da feira de ciências da escola.', imagem: 'https://via.placeholder.com/50' },
  { id: '3', titulo: 'Aula Cancelada', descricao: 'A aula de matemática foi cancelada.', imagem: 'https://via.placeholder.com/50' },
];

const ComunicadosScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [comunicadoSelecionado, setComunicadoSelecionado] = useState(null);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        setComunicadoSelecionado(item);
        setModalVisible(true);
      }}
    >
      <Image source={{ uri: item.imagem }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.titulo}>{item.titulo}</Text>
        <Text>{item.descricao}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={comunicadosFake}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      {/* Modal para exibir o comunicado completo */}
      {comunicadoSelecionado && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <Image source={{ uri: comunicadoSelecionado.imagem }} style={styles.modalImage} />
            <Text style={styles.modalTitulo}>{comunicadoSelecionado.titulo}</Text>
            <Text style={styles.modalDescricao}>{comunicadoSelecionado.descricao}</Text>
            <Button title="Fechar" onPress={() => setModalVisible(false)} />
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
  },
  card: {
    flexDirection: 'row',
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 1,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  modalTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescricao: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default ComunicadosScreen;

import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Modal, Button } from 'react-native';

const comunicadosFake = [
  { id: '1', titulo: 'Reunião de Pais', descricao: 'Haverá uma reunião de pais na próxima sexta-feira.', imagem: 'https://media.discordapp.net/attachments/1219800390887804995/1296603964585934889/bell-icons-16616.png?ex=6712e40a&is=6711928a&hm=35de563fbe0d9abfb723623b1357c0b2e786f1e0eeee6cfa23cb1285e165c231&=&format=webp&quality=lossless&width=437&height=437' },
  { id: '2', titulo: 'Feira de Ciências', descricao: 'Participe da feira de ciências da escola.', imagem: 'https://media.discordapp.net/attachments/1219800390887804995/1296603964585934889/bell-icons-16616.png?ex=6712e40a&is=6711928a&hm=35de563fbe0d9abfb723623b1357c0b2e786f1e0eeee6cfa23cb1285e165c231&=&format=webp&quality=lossless&width=437&height=437' },
  { id: '3', titulo: 'Aula Cancelada', descricao: 'A aula de matemática foi cancelada.', imagem: 'https://media.discordapp.net/attachments/1219800390887804995/1296603964585934889/bell-icons-16616.png?ex=6712e40a&is=6711928a&hm=35de563fbe0d9abfb723623b1357c0b2e786f1e0eeee6cfa23cb1285e165c231&=&format=webp&quality=lossless&width=437&height=437' },
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
        <Text style={styles.descricao}>{item.descricao}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Comunicados</Text>
      <FlatList
        data={comunicadosFake}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      {/* Modal para exibir o comunicado completo */}
      {comunicadoSelecionado && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image source={{ uri: comunicadoSelecionado.imagem }} style={styles.modalImage} />
              <Text style={styles.modalTitulo}>{comunicadoSelecionado.titulo}</Text>
              <Text style={styles.modalDescricao}>{comunicadoSelecionado.descricao}</Text>
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
});

export default ComunicadosScreen;

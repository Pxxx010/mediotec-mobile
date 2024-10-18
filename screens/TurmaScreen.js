import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const disciplinasFake = [
  { id: '1', nome: 'Matemática', professor: 'Prof. João', horario: 'Segunda 08:00 - 10:00', icone: 'calculator-outline' },
  { id: '2', nome: 'Português', professor: 'Prof. Ana', horario: 'Terça 10:00 - 12:00', icone: 'book-outline' },
  { id: '3', nome: 'História', professor: 'Prof. Carlos', horario: 'Quarta 14:00 - 16:00', icone: 'hourglass-outline' },
  { id: '4', nome: 'Geografia', professor: 'Prof. Fernanda', horario: 'Quinta 09:00 - 11:00', icone: 'earth-outline' },
  { id: '5', nome: 'Ciências', professor: 'Prof. Marcos', horario: 'Sexta 13:00 - 15:00', icone: 'flask-outline' },
  { id: '6', nome: 'Educação Física', professor: 'Prof. Laura', horario: 'Sexta 16:00 - 17:30', icone: 'football-outline' },
];

const TurmasScreen = () => {
  const navigation = useNavigation();
  const [disciplinas, setDisciplinas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState(null);

  useEffect(() => {
    setDisciplinas(disciplinasFake);
  }, []);

  const openModal = (disciplina) => {
    setDisciplinaSelecionada(disciplina);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openModal(item)} style={styles.card}>
      <View style={styles.iconButton}>
        <Ionicons name={item.icone} size={32} color="white" />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.nome}</Text>
        <Text style={styles.details}>{`Professor: ${item.professor}`}</Text>
        <Text style={styles.details}>{`Horário: ${item.horario}`}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Disciplinas</Text>
      <FlatList
        data={disciplinas}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      {disciplinaSelecionada && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{disciplinaSelecionada.nome}</Text>
              <Text style={styles.modalText}>{`Professor: ${disciplinaSelecionada.professor}`}</Text>
              <Text style={styles.modalText}>{`Horário: ${disciplinaSelecionada.horario}`}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
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
    paddingHorizontal: 10,
    backgroundColor: '#f2f2f2',
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
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  iconButton: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 10,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  details: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: 'purple',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TurmasScreen;

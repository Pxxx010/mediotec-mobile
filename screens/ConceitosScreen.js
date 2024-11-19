import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

const conceitosFake = [
  { id: '1', disciplina: 'Matematica', turmaId: '1', unidade1: 'A', unidade2: 'B+', notaFinal: 'C', icone: 'calculator-outline' },
  { id: '2', disciplina: 'Português', turmaId: '2', unidade1: 'B+', unidade2: 'A-', notaFinal: 'B+', icone: 'book-outline' },
  { id: '3', disciplina: 'História', turmaId: '1', unidade1: 'C', unidade2: 'B', notaFinal: 'B-', icone: 'school-outline' },
  { id: '4', disciplina: 'Geografia', turmaId: '2', unidade1: 'A-', unidade2: 'A', notaFinal: 'A-', icone: 'earth-outline' },
  { id: '5', disciplina: 'Química', turmaId: '1', unidade1: 'B', unidade2: 'B+', notaFinal: 'B', icone: 'flask-outline' },
  { id: '6', disciplina: 'Biologia', turmaId: '2', unidade1: 'A', unidade2: 'B', notaFinal: 'B+', icone: 'leaf-outline' },
  { id: '7', disciplina: 'Física', turmaId: '1', unidade1: 'B+', unidade2: 'A-', notaFinal: 'A', icone: 'rocket-outline' },
  { id: '8', disciplina: 'Educação Física', turmaId: '2', unidade1: 'A', unidade2: 'A', notaFinal: 'A', icone: 'body-outline' },
  { id: '9', disciplina: 'Inglês', turmaId: '1', unidade1: 'B-', unidade2: 'C', notaFinal: 'C+', icone: 'language-outline' },
  { id: '10', disciplina: 'Artes', turmaId: '2', unidade1: 'A', unidade2: 'A-', notaFinal: 'A-', icone: 'color-palette-outline' },
];

const ConceitosScreen = () => {
  const route = useRoute();
  const { turmaId } = route.params;
  const [conceitos, setConceitos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [horarioModalVisible, setHorarioModalVisible] = useState(false); // Modal para horário
  const [selectedConceito, setSelectedConceito] = useState(null);

  useEffect(() => {
    const conceitosFiltrados = conceitosFake.filter(c => c.turmaId === turmaId);
    setConceitos(conceitosFiltrados);
  }, [turmaId]);

  const openModal = (item) => {
    setSelectedConceito(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedConceito(null);
    setModalVisible(false);
  };

  const openHorarioModal = () => {
    setHorarioModalVisible(true);
  };

  const closeHorarioModal = () => {
    setHorarioModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => openModal(item)}>
      <View style={styles.row}>
        <Ionicons name={item.icone} size={24} color="purple" style={styles.icon} />
        <Text style={styles.title}>{item.disciplina}</Text>
        <Ionicons
          name={['A', 'B+', 'B', 'A-', 'B-'].includes(item.notaFinal) ? 'checkmark-circle-outline' : 'close-circle-outline'}
          size={24}
          color={['A', 'B+', 'B', 'A-', 'B-'].includes(item.notaFinal) ? 'green' : 'red'}
          style={styles.statusIcon}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{`Conceitos da Turma ${turmaId}`}</Text>
      <FlatList
        data={conceitos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      {/* Modal de Detalhes */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Detalhes do Conceito</Text>
            {selectedConceito && (
              <>
                <Text style={styles.modalText}>{`Disciplina: ${selectedConceito.disciplina}`}</Text>
                <Text style={styles.modalText}>{`Unidade 1: ${selectedConceito.unidade1}`}</Text>
                <Text style={styles.modalText}>{`Unidade 2: ${selectedConceito.unidade2}`}</Text>
                <Text style={styles.modalFinalGrade}>{`Nota Final: ${selectedConceito.notaFinal}`}</Text>
              </>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para exibir o horário */}
      <Modal
        visible={horarioModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeHorarioModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.horarioContainer}>
            <Image
              source={require('../img/horario.png')}
              style={styles.horarioImage}
              resizeMode="contain"
            />
            <TouchableOpacity style={styles.closeButton} onPress={closeHorarioModal}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={openHorarioModal}>
        <Ionicons name="time-outline" size={28} color="white" />
      </TouchableOpacity>
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
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'purple',
    flex: 1,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  statusIcon: {
    marginLeft: 'auto',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  horarioContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  horarioImage: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'purple',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
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

export default ConceitosScreen;

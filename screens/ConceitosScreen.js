import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importação dos ícones

// Dados fake com ícones específicos para cada disciplina
const conceitosFake = [
  { id: '1', disciplina: 'Matemática', unidade1: 'A', unidade2: 'B+', notaFinal: 'C', icone: 'calculator-outline' },
  { id: '2', disciplina: 'Português', unidade1: 'B+', unidade2: 'A-', notaFinal: 'B+', icone: 'book-outline' },
  { id: '3', disciplina: 'História', unidade1: 'A-', unidade2: 'A', notaFinal: 'C', icone: 'hourglass-outline' },
  { id: '4', disciplina: 'Geografia', unidade1: 'B-', unidade2: 'B', notaFinal: 'C', icone: 'earth-outline' },
  { id: '5', disciplina: 'Ciências', unidade1: 'B-', unidade2: 'B', notaFinal: 'A', icone: 'flask-outline' },
  { id: '6', disciplina: 'Educação Física', unidade1: 'B-', unidade2: 'B', notaFinal: 'C', icone: 'football-outline' }
];

const ConceitosScreen = () => {
  const [conceitos, setConceitos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedConceito, setSelectedConceito] = useState(null);

  useEffect(() => {
    // Simulação de fetch com dados fake
    setConceitos(conceitosFake);
  }, []);

  const openModal = (conceito) => {
    setSelectedConceito(conceito); // Define o conceito selecionado
    setModalVisible(true); // Abre o modal
  };

  const closeModal = () => {
    setModalVisible(false); // Fecha o modal
    setSelectedConceito(null); // Limpa o conceito selecionado
  };

  // Função para determinar se foi aprovado ou reprovado
  const isApproved = (notaFinal) => {
    const notasAprovacao = ['A', 'A-', 'B+', 'B', 'B-']; // Notas válidas para aprovação
    return notasAprovacao.includes(notaFinal); // Retorna true se aprovado
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => openModal(item)}>
      <View style={styles.row}>
        <Ionicons name={item.icone} size={24} color="purple" style={styles.icon} />
        <Text style={styles.title}>{item.disciplina}</Text>
        {/* Ícone de aprovado ou reprovado alinhado à direita */}
        <Ionicons
          name={isApproved(item.notaFinal) ? 'checkmark-circle-outline' : 'close-circle-outline'}
          size={24}
          color={isApproved(item.notaFinal) ? 'green' : 'red'}
          style={styles.statusIcon}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Conceitos de Turma</Text>
      <FlatList
        data={conceitos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      {/* Modal para exibir os detalhes do conceito */}
      {selectedConceito && (
        <Modal
          visible={modalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={closeModal}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>{selectedConceito.disciplina}</Text>
              <Text style={styles.modalText}>{`Unidade 1: ${selectedConceito.unidade1}`}</Text>
              <Text style={styles.modalText}>{`Unidade 2: ${selectedConceito.unidade2}`}</Text>
              <Text
                style={[
                  styles.modalFinalGrade,
                  { color: isApproved(selectedConceito.notaFinal) ? 'green' : 'red' } // Muda a cor com base na aprovação
                ]}
              >
                {`Nota Final: ${selectedConceito.notaFinal}`}
              </Text>
              <Button title="Fechar" onPress={closeModal} color="purple" />
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
    flexDirection: 'row', // Alinha o ícone e o texto na horizontal
    alignItems: 'center', // Alinha os itens verticalmente ao centro
    justifyContent: 'space-between', // Distribui os itens ao longo do eixo, com o ícone de aprovação no final
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'purple',
    flex: 1, // Garante que o título ocupe o espaço restante
    marginLeft: 10, // Adiciona um espaço entre o ícone e o texto
  },
  icon: {
    marginRight: 10, // Espaçamento para o ícone da disciplina
  },
  statusIcon: {
    marginLeft: 'auto', // Alinha o ícone de status à direita
  },
  // Estilos do Modal
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
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'purple',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    marginVertical: 5,
    color: '#333',
  },
  modalFinalGrade: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginVertical: 10,
  },
});

export default ConceitosScreen;

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
  Image,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConceitosScreen = () => {
  const route = useRoute();
  const { turmaId } = route.params;
  const [conceitos, setConceitos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [scheduleModalVisible, setScheduleModalVisible] = useState(false);

  useEffect(() => {
    const fetchConcepts = async () => {
      try {
        const token = await AsyncStorage.getItem('@access_token');
        if (!token) {
          Alert.alert('Erro', 'Usuário não autenticado. Por favor, faça login novamente.');
          return;
        }

        const response = await fetch(
          'https://backend-medio-tech-senac.onrender.com/classes?page=1&limit=0&noPagination=true',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Erro na API: ${response.status}`);
        }

        const result = await response.json();

        if (!Array.isArray(result.data)) {
          throw new Error('Resposta inesperada da API');
        }

        const selectedClass = result.data.find((c) => c.id.toString() === turmaId);

        if (!selectedClass) {
          throw new Error('Turma não encontrada');
        }

        const concepts = selectedClass.TeachingAssignment.map((ta) => ({
          id: ta.id.toString(),
          disciplina: ta.subject.name,
          unidade1: 'Nota não disponível',
          unidade2: 'Nota não disponível',
          notaFinal: 'Nota não disponível',
          icone: 'book-outline',
        }));

        setConceitos(concepts);
      } catch (error) {
        console.error('Erro ao buscar conceitos:', error);
        Alert.alert('Erro', 'Não foi possível carregar os conceitos. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchConcepts();
  }, [turmaId]);

  const openModal = (item) => {
    setSelectedConcept(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedConcept(null);
  };

  const openScheduleModal = () => {
    setScheduleModalVisible(true);
  };

  const closeScheduleModal = () => {
    setScheduleModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => openModal(item)}>
      <View style={styles.row}>
        <Ionicons name={item.icone} size={24} color="#004B8D" style={styles.icon} />
        <Text style={styles.title}>{item.disciplina}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Conceitos</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#004B8D" />
      ) : (
        <FlatList
          data={conceitos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}

      {/* Modal para exibir detalhes das notas */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedConcept?.disciplina}</Text>
            <View style={styles.modalBody}>
              <View style={styles.modalRow}>
                <Ionicons name="clipboard-outline" size={24} color="#004B8D" />
                <Text style={styles.modalLabel}>Unidade 1:</Text>
                <Text style={styles.modalValue}>{selectedConcept?.unidade1}</Text>
              </View>
              <View style={styles.modalRow}>
                <Ionicons name="clipboard-outline" size={24} color="#004B8D" />
                <Text style={styles.modalLabel}>Unidade 2:</Text>
                <Text style={styles.modalValue}>{selectedConcept?.unidade2}</Text>
              </View>
              <View style={[styles.modalRow, styles.finalGradeRow]}>
                <Ionicons name="ribbon-outline" size={24} color="#004B8D" />
                <Text style={[styles.modalLabel, styles.finalGradeLabel]}>Nota Final:</Text>
                <Text style={[styles.modalValue, styles.finalGradeValue]}>
                  {selectedConcept?.notaFinal}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal do FAB para exibir quadro de horários */}
      <Modal
        visible={scheduleModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeScheduleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Quadro de Horários</Text>
            <Image source={require('../img/horario.png')} style={styles.scheduleImage} />
            <TouchableOpacity style={styles.closeButton} onPress={closeScheduleModal}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Botão FAB */}
      <TouchableOpacity style={styles.fab} onPress={openScheduleModal}>
        <Ionicons name="calendar-outline" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#004B8D',
  },
  card: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    borderColor: '#004B8D',
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginLeft: 10,
    color: '#004B8D',
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 10,
    color: '#004B8D',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004B8D',
    marginBottom: 20,
  },
  modalBody: {
    width: '100%',
  },
  modalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalLabel: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
  modalValue: {
    fontSize: 16,
    color: '#004B8D',
    fontWeight: 'bold',
  },
  finalGradeRow: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  finalGradeLabel: {
    fontWeight: 'bold',
  },
  finalGradeValue: {
    fontSize: 18,
    color: '#004B8D',
  },
  scheduleImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#004B8D',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#004B8D',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default ConceitosScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const turmasFake = [
  { id: '1', nome: 'Turma 031', periodo: 'Noite', horario: 'Segunda 18:00 - 20:00', professor: 'Prof. João', icone: 'book-outline' },
  { id: '2', nome: 'Turma 032', periodo: 'Manhã', horario: 'Terça 10:00 - 12:00', professor: 'Prof. Ana', icone: 'book-outline' },
];

const TurmasScreen = () => {
  const navigation = useNavigation();
  const [disciplinas, setDisciplinas] = useState([]);

  useEffect(() => {
    setDisciplinas(turmasFake);
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ConceitosScreen', { turmaId: item.id })}
      style={styles.card}
    >
      <View style={styles.iconButton}>
        <Ionicons name={item.icone} size={32} color="white" />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{`${item.nome} (${item.periodo})`}</Text>
        <Text style={styles.details}>{`Professor: ${item.professor}`}</Text>
        <Text style={styles.details}>{`Horário: ${item.horario}`}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Turmas</Text>
      <FlatList
        data={disciplinas}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
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

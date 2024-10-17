import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const disciplinasFake = [
  { id: '1', nome: 'Matemática', professor: 'Prof. João', horario: 'Segunda 08:00 - 10:00' },
  { id: '2', nome: 'Português', professor: 'Prof. Ana', horario: 'Terça 10:00 - 12:00' },
  { id: '3', nome: 'História', professor: 'Prof. Carlos', horario: 'Quarta 14:00 - 16:00' },
];

const TurmasScreen = () => {
  const navigation = useNavigation(); // Hook para navegação

  const [disciplinas, setDisciplinas] = useState([]);

  useEffect(() => {
    // Simulação de fetch com dados fake
    setDisciplinas(disciplinasFake);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.nome}</Text>
      <Text>{`Professor: ${item.professor}`}</Text>
      <Text>{`Horário: ${item.horario}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Disciplinas</Text>
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
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default TurmasScreen;

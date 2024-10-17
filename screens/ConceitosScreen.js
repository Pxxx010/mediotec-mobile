// screens/ConceitosScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const conceitosFake = [
  { id: '1', disciplina: 'Matemática', conceito: 'A' },
  { id: '2', disciplina: 'Português', conceito: 'B+' },
  { id: '3', disciplina: 'História', conceito: 'A-' },
  { id: '4', disciplina: 'Geografia', conceito: 'B-' }
];

const ConceitosScreen = () => {
  const [conceitos, setConceitos] = useState([]);

  useEffect(() => {
    // Simulação de fetch com dados fake
    setConceitos(conceitosFake);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.disciplina}</Text>
      <Text>{`Conceito: ${item.conceito}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Conceitos</Text>
      <FlatList
        data={conceitos}
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
});

export default ConceitosScreen;

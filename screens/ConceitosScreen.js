// screens/ConceitosScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const conceitosFake = [
  { id: '1', disciplina: 'Matemática', unidade1: 'A', unidade2: 'B+', notaFinal: 'B' },
  { id: '2', disciplina: 'Português', unidade1: 'B+', unidade2: 'A-', notaFinal: 'B+' },
  { id: '3', disciplina: 'História', unidade1: 'A-', unidade2: 'A', notaFinal: 'A' },
  { id: '4', disciplina: 'Geografia', unidade1: 'B-', unidade2: 'B', notaFinal: 'B-' },
];

const ConceitosScreen = () => {
  const [conceitos, setConceitos] = useState([]);

  useEffect(() => {
    // Simulação de fetch com dados fake
    setConceitos(conceitosFake);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.disciplina}</Text>
      <View style={styles.gradesContainer}>
        <Text style={styles.gradeText}>{`Unidade 1: ${item.unidade1}`}</Text>
        <Text style={styles.gradeText}>{`Unidade 2: ${item.unidade2}`}</Text>
        <Text style={styles.finalGradeText}>{`Nota Final: ${item.notaFinal}`}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Conceitos de Turma</Text>
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
    backgroundColor: '#f2f2f2', // Fundo claro
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'purple', // Cor do título
  },
  gradesContainer: {
    marginTop: 10,
  },
  gradeText: {
    fontSize: 16,
    marginVertical: 2,
    color: '#333', // Cor do texto
  },
  finalGradeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green', // Cor para a nota final
  },
});

export default ConceitosScreen;

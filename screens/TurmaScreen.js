import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TurmasScreen = () => {
  const navigation = useNavigation();
  const [disciplinas, setDisciplinas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = await AsyncStorage.getItem('@access_token');
        if (!token) {
          Alert.alert('Erro', 'Usuário não autenticado. Por favor, faça login novamente.');
          return;
        }

        const response = await fetch('https://backend-medio-tech-senac.onrender.com/classes?page=1&limit=0&noPagination=true', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Erro na API: ${response.status}`);
        }

        const result = await response.json();

        if (!Array.isArray(result.data)) {
          throw new Error('Resposta inesperada da API');
        }

        const classes = result.data.map(item => ({
          id: item.id.toString(),
          nome: item.name,
          periodo: `${item.year}º Ano - Semestre ${item.semester}`,
          horario: 'Horário não disponível', // Substitua com horários reais se disponíveis
          professor: item.TeachingAssignment.length > 0
            ? `Prof. ${item.TeachingAssignment[0].teacher.firstName} ${item.TeachingAssignment[0].teacher.lastName}`
            : 'Professor não atribuído',
          icone: 'book-outline',
        }));

        setDisciplinas(classes);
      } catch (error) {
        console.error('Erro ao buscar turmas:', error);
        Alert.alert('Erro', 'Não foi possível carregar as turmas. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
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
      {loading ? (
        <ActivityIndicator size="large" color="#004B8D"/>
      ) : (
        <FlatList
          data={disciplinas}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff', // Azul claro para o fundo
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30,
    textAlign: 'center',
    color: '#004B8D', // Azul principal
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Branco para contraste
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderColor: '#004B8D', // Borda azul suave
    borderWidth: 1,
  },
  iconButton: {
    backgroundColor: '#004B8D', // Azul principal
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
    color: '#004B8D', // Azul principal
  },
  details: {
    fontSize: 14,
    color: '#333', // Texto secundário mais visível
    marginTop: 5,
  },
});


export default TurmasScreen;

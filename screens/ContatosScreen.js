import React from 'react';
import { View, Text, FlatList, Linking, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importando Ionicons

const contatosFake = [
  { id: '1', nome: 'Secretaria', telefone: '+5581999999999' },
  { id: '2', nome: 'Coordenador', telefone: '+5581888888888' },
];

const ContatosScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.nome}</Text>
      <View style={styles.contactInfo}>
        <Ionicons name="call" size={24} color="purple" />
        <Text onPress={() => Linking.openURL(`tel:${item.telefone}`)} style={styles.link}>
          {item.telefone}
        </Text>
      </View>
      <View style={styles.contactInfo}>
        <Ionicons name="logo-whatsapp" size={24} color="green" />
        <Text onPress={() => Linking.openURL(`https://wa.me/${item.telefone.replace('+', '')}`)} style={styles.link}>
          Enviar WhatsApp
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contatos</Text>
      <FlatList
        data={contatosFake}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      {/* Card adicional para o setor financeiro */}
      <TouchableOpacity style={styles.item} onPress={() => Linking.openURL('https://sitefinanceiro.com')}>
        <View style={styles.financeCard}>
          <Ionicons name="cash-outline" size={24} color='purple' />
          <Text style={styles.financeText}>Setor Financeiro</Text>
        </View>
        <Text style={styles.financeLink}>Acessar o portal financeiro</Text>
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
  item: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'purple',
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  link: {
    color: 'black',
    marginLeft: 10,
    textDecorationLine: 'underline',
  },
  // Estilos para o card financeiro
  financeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  financeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'purple',
    marginLeft: 10,
  },
  financeLink: {
    color: 'black',
    textDecorationLine: 'underline',
    marginTop: 5,
  },
});

export default ContatosScreen;

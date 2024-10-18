// screens/ContatosScreen.js
import React from 'react';
import { View, Text, FlatList, Linking, StyleSheet } from 'react-native';
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#f2f2f2', // Fundo claro para contraste
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  item: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#fff', // Cor de fundo dos cards
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'purple', // Cor do nome
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  link: {
    color: 'purple', // Cor dos links
    marginLeft: 10,
    textDecorationLine: 'underline',
  },
});

export default ContatosScreen;

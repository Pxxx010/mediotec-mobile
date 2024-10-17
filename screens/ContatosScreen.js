// screens/ContatosScreen.js
import React from 'react';
import { View, Text, FlatList, Linking, StyleSheet } from 'react-native';

const contatosFake = [
  { id: '1', nome: 'Secretaria', telefone: '+5581999999999' },
  { id: '2', nome: 'Coordenador', telefone: '+5581888888888' },
];

const ContatosScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.nome}</Text>
      <Text onPress={() => Linking.openURL(`tel:${item.telefone}`)} style={styles.link}>
        {item.telefone}
      </Text>
      <Text onPress={() => Linking.openURL(`https://wa.me/${item.telefone.replace('+', '')}`)} style={styles.link}>
        Enviar WhatsApp
      </Text>
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
  link: {
    color: 'blue',
    marginTop: 5,
  },
});

export default ContatosScreen;

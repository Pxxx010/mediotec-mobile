import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ContatosScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const contacts = {
    secretaria: {
      telefone: '+5581999999999',
      email: 'secretaria@email.com',
    },
    coordenador: {
      telefone: '+5581888888888',
      email: 'coordenador@email.com',
    },
  };

  const openModal = (contactType) => {
    setSelectedContact(contacts[contactType]);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedContact(null);
  };

  const handleAction = (action) => {
    if (action === 'telefone') {
      Linking.openURL(`tel:${selectedContact.telefone}`);
    } else if (action === 'email') {
      Linking.openURL(`mailto:${selectedContact.email}`);
    }
    closeModal();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contatos</Text>
      <View style={styles.grid}>
        <TouchableOpacity style={styles.card} onPress={() => openModal('secretaria')}>
          <Ionicons name="call-outline" size={40} color="#004B8D" />
          <Text style={styles.cardText}>Secretaria</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => openModal('coordenador')}>
          <Ionicons name="person-outline" size={40} color="#004B8D" />
          <Text style={styles.cardText}>Coordenador</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => Linking.openURL('https://www.pe.senac.br/contato')}
        >
          <Ionicons name="cash-outline" size={40} color="#004B8D" />
          <Text style={styles.cardText}>Financeiro</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      {selectedContact && (
        <Modal
          visible={modalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Escolha uma opção</Text>
              <Text style={styles.modalSubtitle}>
                Entre em contato com {selectedContact.email.includes('secretaria') ? 'a Secretaria' : 'o Coordenador'} via:
              </Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => handleAction('telefone')}
              >
                <Ionicons name="call-outline" size={24} color="#fff" />
                <Text style={styles.modalButtonText}>Telefone</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => handleAction('email')}
              >
                <Ionicons name="mail-outline" size={24} color="#fff" />
                <Text style={styles.modalButtonText}>E-mail</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
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
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004B8D',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 30
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#F9F9F9',
    borderRadius: 15,
    width: '48%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 15,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#004B8D',
    marginTop: 10,
    textAlign: 'center',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004B8D',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#004B8D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    justifyContent: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ContatosScreen;

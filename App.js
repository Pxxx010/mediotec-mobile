// App.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';
import TurmasScreen from './screens/TurmaScreen';
import ConceitosScreen from './screens/ConceitosScreen';
import ComunicacoesScreen from './screens/ComunicacoesScreen';
import ContatosScreen from './screens/ContatosScreen';
import PerfilScreen from './screens/PerfilScreen';
import LoginScreen from './screens/LoginScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Navigator para Turmas e Conceitos
function TurmasStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TurmasScreen"
        component={TurmasScreen}
        options={{ title: 'Turma', headerShown: false }}
      />
      <Stack.Screen
        name="ConceitosScreen"
        component={ConceitosScreen}
        options={({ route }) => ({
          title: `Conceitos de ${route.params?.disciplinaNome || ''}`,
        })}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogin = (name, accessToken) => {
    console.log('Usuário logado:', name);
    console.log('Token de acesso:', accessToken);
    setIsLoggedIn(true);
    setModalVisible(false);
  };

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              switch (route.name) {
                case 'Turmas':
                  iconName = focused ? 'school' : 'school-outline';
                  break;
                case 'Conceitos':
                  iconName = focused ? 'book' : 'book-outline';
                  break;
                case 'Comunicados':
                  iconName = focused ? 'notifications' : 'notifications-outline';
                  break;
                case 'Contatos':
                  iconName = focused ? 'call' : 'call-outline';
                  break;
                case 'Perfil':
                  iconName = focused ? 'person' : 'person-outline';
                  break;
                default:
                  iconName = 'help-circle-outline';
                  break;
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'purple',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Turmas" component={TurmasStack} options={{ headerShown: false }} />
          <Tab.Screen name="Comunicados" component={ComunicacoesScreen} options={{ title: 'Comunicados', headerShown: false }} />
          <Tab.Screen name="Contatos" component={ContatosScreen} options={{ title: 'Contatos', headerShown: false }} />
          <Tab.Screen name="Perfil">
            {() => <PerfilScreen onLogout={() => setIsLoggedIn(false)} />}
          </Tab.Screen>
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" options={{ title: 'Login', headerShown: false }}>
            {() => <LoginScreen onLogin={handleLogin} />}
          </Stack.Screen>
        </Stack.Navigator>
      )}

      {/* Modal de Erro */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Matrícula ou Senha inválidos!</Text>
          <Button title="Fechar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
});

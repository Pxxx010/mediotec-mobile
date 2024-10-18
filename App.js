import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import TurmasScreen from './screens/TurmaScreen';
import ConceitosScreen from './screens/ConceitosScreen';
import ComunicacoesScreen from './screens/ComunicacoesScreen';
import ContatosScreen from './screens/ContatosScreen';
import PerfilScreen from './screens/PerfilScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
        <Tab.Screen name="Turmas" component={TurmasScreen} />
        <Tab.Screen name="Conceitos" component={ConceitosScreen} />
        <Tab.Screen name="Comunicados" component={ComunicacoesScreen} />
        <Tab.Screen name="Contatos" component={ContatosScreen} />
        <Tab.Screen name="Perfil" component={PerfilScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

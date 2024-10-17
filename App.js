import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import TurmasScreen from './screens/TurmaScreen';
import ConceitosScreen from './screens/ConceitosScreen';
import ComunicacoesScreen from './screens/ComunicacoesScreen';
import ContatosScreen from './screens/ContatosScreen';
import FinanceiroScreen from './screens/FinanceiroScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Turmas') {
              iconName = focused ? 'school' : 'school-outline';
            } else if (route.name === 'Conceitos') {
              iconName = focused ? 'book' : 'book-outline';
            } else if (route.name === 'Comunicados') {
              iconName = focused ? 'notifications' : 'notifications-outline';
            } else if (route.name === 'Contatos') {
              iconName = focused ? 'call' : 'call-outline';
            } else if (route.name === 'Financeiro') {
              iconName = focused ? 'wallet' : 'wallet-outline';
            }

            // Retorna o ícone correto
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Turmas" component={TurmasScreen} />
        <Tab.Screen name="Conceitos" component={ConceitosScreen} />
        <Tab.Screen name="Comunicados" component={ComunicacoesScreen} />
        <Tab.Screen name="Contatos" component={ContatosScreen} />
        <Tab.Screen name="Financeiro" component={FinanceiroScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

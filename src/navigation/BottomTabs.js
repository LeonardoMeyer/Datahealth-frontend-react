import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from '../app/home';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = 'settings-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF', // Azul estilo Apple
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      {/* Tela Home */}
      <Tab.Screen name="Home" component={Home} />
      
      {/* Outra tela de exemplo */}
      <Tab.Screen name="Settings" component={Home} />
    </Tab.Navigator>
  );
}

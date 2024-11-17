import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../app/login';
import CreateAccount from '../app/create-account';
import BottomTabs from './BottomTabs';

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator>
      {/* Tela de Login */}
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{ headerShown: false }} 
      />
      
      {/* Tela de Criar Conta */}
      <Stack.Screen 
        name="CreateAccount" 
        component={CreateAccount} 
        options={{ title: "Criar Conta" }} 
      />
      
      {/* Telas com Navegação Principal */}
      <Stack.Screen 
        name="Main" 
        component={BottomTabs} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}
// src/components/Header.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'; 
import { useRouter } from 'expo-router'; 
import { useLoginStore } from '../../stores/useLoginStore'; 

export default function Header() {
  const router = useRouter(); 
  const { user } = useLoginStore(); // Obtém o usuário logado

  const handleLogoPress = () => {
    router.push('/'); 
  };

  return (
    <View style={styles.header}>
      {/* Logo que ao ser pressionada redireciona para a Home */}
      <TouchableOpacity onPress={handleLogoPress}>
        <Image 
          source={require('../../../logo/logo.svg')} 
          style={styles.logo}
        />
      </TouchableOpacity>

      {/* Título "Datahealth" */}
      <Text style={styles.title}>Datahealth</Text>

      {/* Exibindo o nome do usuário ou botão de login */}
      {user ? (
        <View style={styles.profileContainer}>
          <Image 
            source={{ uri: user.avatar }} 
            style={styles.profileImage} 
          />
          <Text style={styles.profileText}>{user.name}</Text>
        </View>
      ) : (
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: '#ffffff', 
    flexDirection: 'row', // Alinha os itens horizontalmente
    justifyContent: 'space-between', // Alinha logo, título e usuário na mesma linha
    alignItems: 'center', // Alinha verticalmente os itens
  },
  logo: {
    width: 40, 
    height: 40, 
    marginRight: 10, // Espaço entre logo e o título
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6c8ebf', 
    flex: 1, // Isso garante que o título ocupe o espaço restante
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,  // Espaço entre a imagem do perfil e o nome do usuário
  },
  profileText: {
    fontSize: 16,
    color: '#6c8ebf',
  },
  loginText: {
    fontSize: 16,
    color: '#007AFF',
  },
});

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

  const handleProfilePress = () => {
    router.push('/profile'); // Sempre vai para o perfil se o usuário estiver logado
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

      {/* Se o usuário estiver logado, exibe o nome e imagem de perfil */}
      {user && (
        <TouchableOpacity onPress={handleProfilePress} style={styles.profileButton}>
          <Image 
            source={{ uri: user.profileImage }}  // Acessa a imagem do perfil
            style={styles.profileImage}
          />
          <Text style={styles.profileText}>{user.name}</Text>  {/* Exibe o nome do usuário */}
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
    justifyContent: 'flex-start', // Deixa a logo e o título à esquerda
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
  profileButton: {
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
});

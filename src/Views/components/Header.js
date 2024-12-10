import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'; 
import { useLoginStore } from '../../stores/useLoginStore'; 

export default function Header() {
  const { name, avatar } = useLoginStore();

  const handleLogoPress = () => {
    window.location.href = '/'; 
  };

  const handleProfilePress = () => {
    if (name) {
      window.location.href = '/update'; // Redireciona para a página de atualização de perfil
    } else {
      window.location.href = '/login'; // Redireciona para a página de login
    }
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

      {/* Botão de perfil ou login */}
      <TouchableOpacity style={styles.profileContainer} onPress={handleProfilePress}>
        {name ? (
          <>
            <Image 
              style={styles.avatar}
              source={avatar} 
            />
            <Text style={styles.name}>{name}</Text>
          </>
        ) : (
          <Text style={styles.loginText}>Entrar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: '#ffffff', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
  },
  logo: {
    width: 40, 
    height: 40, 
    marginRight: 10, 
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6c8ebf', 
    flex: 1, 
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F5F5F7', 
    borderRadius: 20, 
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,  
  },
  name: {
    fontSize: 16,
    color: '#6c8ebf',
  },
  loginText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6c8ebf',
  },
});

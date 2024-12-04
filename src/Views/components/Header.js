import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'; 
import { useLoginStore } from '../../stores/useLoginStore'; 
export default function Header() {
  const { name, avatar } = useLoginStore();

 
  const handleLogoPress = () => {
    window.location.href = '/'; 
  };

  const handleCreateAccountPress = () => {
    window.location.href = '/create-account';
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

      {/* Informações do usuário e ícone de menu */}
      <View style={styles.profileContainer}>
        <Image 
          style={styles.avatar}
          source={avatar} 
        />
        <Text style={styles.name}>{name}</Text>

       
      </View>
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
  menu: {
    marginLeft: 20, 
  },
});

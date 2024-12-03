import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'; 
import { useRouter } from 'expo-router'; 
import { useLoginStore } from '../../stores/useLoginStore'; 

export default function Header() {
  const router = useRouter(); 
  const { user, logout } = useLoginStore(); 

  const handleLogoPress = () => {
    router.push('/'); 
  };

  const handleProfilePress = () => {
    router.push('/profile'); 
  };

  const handleLoginPress = () => {
    router.push('/login'); 
  };

  const handleLogoutPress = () => {
    logout(); 
    router.push('/'); 
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleLogoPress}>
        <Image 
          source={require('../../../logo/logo.svg')} 
          style={styles.logo}
        />
      </TouchableOpacity>

      <Text style={styles.title}>Datahealth</Text>

      {user ? (
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={handleProfilePress} style={styles.profileButton}>
            <Text style={styles.profileText}>{user?.name}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogoutPress} style={styles.logoutButton}>
            <Text style={styles.profileText}>Sair</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={handleLoginPress} style={styles.loginButton}>
          <Text style={styles.profileText}>Entrar</Text>
        </TouchableOpacity>
      )}
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
  },
  profileContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  profileButton: {
    padding: 10,
    backgroundColor: '#6c8ebf', 
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  logoutButton: {
    padding: 10,
    backgroundColor: '#ff3b30', 
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  loginButton: {
    padding: 10,
    backgroundColor: '#6c8ebf', 
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    fontSize: 16,
    color: '#fff',
  },
});

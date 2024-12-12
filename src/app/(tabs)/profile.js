import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../Views/components/Button';
import { useRouter } from 'expo-router';

export default function Profile() {
  const router = useRouter();

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: '', 
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const storedProfile = await AsyncStorage.getItem('@profile');
        if (storedProfile) {
          setProfileData(JSON.parse(storedProfile));
        }
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
      }
    };

    loadProfile();
  }, []);

  const handleSave = async () => {
    const { name, email, password, avatar } = profileData;

    if (!name || !email || !password || !avatar) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      await AsyncStorage.setItem('@profile', JSON.stringify(profileData));
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      Alert.alert('Erro', 'Não foi possível salvar o perfil.');
    }
  };

  const handleDelete = async () => {
    try {
      await AsyncStorage.removeItem('@profile');
      setProfileData({ name: '', email: '', password: '', avatar: '' });
      Alert.alert('Sucesso', 'Perfil excluído com sucesso!');
      router.replace('/login');
    } catch (error) {
      console.error('Erro ao excluir perfil:', error);
      Alert.alert('Erro', 'Não foi possível excluir o perfil.');
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userLogged');
      router.replace('/login');
    } catch (error) {
      console.error('Erro ao sair da conta:', error);
      Alert.alert('Erro ao sair da conta.');
    }
  };

  const handleChange = (field, value) => {
    setProfileData((prevData) => ({ ...prevData, [field]: value }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Perfil</Text>

      {/* Exibição da Foto */}
      {profileData.avatar ? (
        <Image source={{ uri: profileData.avatar }} style={styles.avatar} />
      ) : (
        <Text style={styles.placeholder}>Sem foto</Text>
      )}

      <Text style={styles.label}>URL da Foto:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a URL da foto"
        value={profileData.avatar}
        onChangeText={(value) => handleChange('avatar', value)}
      />

      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={profileData.name}
        onChangeText={(value) => handleChange('name', value)}
      />

      <Text style={styles.label}>E-mail:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
        value={profileData.email}
        onChangeText={(value) => handleChange('email', value)}
      />

      <Text style={styles.label}>Senha:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua nova senha"
        secureTextEntry
        value={profileData.password}
        onChangeText={(value) => handleChange('password', value)}
      />

      <View style={styles.buttonGroup}>
        <Button onPress={handleSave} style={styles.saveButton}>
          Salvar Alterações
        </Button>
        <Button onPress={handleDelete} style={styles.deleteButton}>
          Excluir Perfil
        </Button>
        <Button onPress={handleLogout} style={styles.logoutButton}>
          Sair da Conta
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7B9ABB',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#444',
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  logoutButton: {
    backgroundColor: '#7B9ABB',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 20,
  },
  placeholder: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#AAA',
    textAlign: 'center',
    marginBottom: 20,
  },
});

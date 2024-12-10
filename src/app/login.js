import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, TextInput, Alert, Image } from 'react-native';
import Button from '../../src/Views/components/Button';
import { useRouter } from 'expo-router';
import { useLoginStore } from '../stores/useLoginStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const router = useRouter();
  const { login: loginStore } = useLoginStore();
  
  const [txtEmail, setTxtEmail] = useState('');
  const [txtPass, setTxtPass] = useState('');

  useEffect(() => {
    const checkLoggedUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('userLogged');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          loginStore(parsedUser);
          router.push('/home');
        }
      } catch (error) {
        console.error('Erro ao recuperar usuário logado:', error);
      }
    };

    checkLoggedUser();
  }, []);

  const handleLogin = async () => {
    const login = {
      email: txtEmail,
      pass: txtPass,
    };

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(login),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const user = { accessToken: data?.accessToken, ...data.user };

        loginStore(user);
        await AsyncStorage.setItem('userLogged', JSON.stringify(user));

        Alert.alert('Login realizado com sucesso!');
        router.push('/home');
      } else {
        const errorData = await response.json();
        Alert.alert('Erro ao logar', errorData?.error || 'Tente novamente.');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      Alert.alert('Erro ao conectar com o servidor.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../logo/logo.svg')} style={styles.logo} />
        <Text style={styles.logoTitle}>Datahealth</Text>
      </View>

      <View style={{ flex: 1, marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Email:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTxtEmail}
          value={txtEmail}
        />
        <Text>Senha:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTxtPass}
          value={txtPass}
          secureTextEntry={true}
        />
        <Button onPress={handleLogin}>Entrar</Button>

        <View style={styles.divisor} />

        <Button onPress={() => router.push('/signup')}>Cadastre-se</Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  logoTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#6c8ebf',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#444444',
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginVertical: 5,
    borderRadius: 5,
  },
  divisor: {
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    width: '90%',
    marginVertical: 50,
  },
});

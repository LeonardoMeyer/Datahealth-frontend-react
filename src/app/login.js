import { ScrollView, StyleSheet, View, Text, TextInput, Alert } from 'react-native';
import Button from '../Views/components/Button.js';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useLoginStore } from '../stores/useLoginStore';
import { storeObjectData } from '../utils/asyncStorage';

export default function Login() {
  const router = useRouter();
  const { login: loginStore } = useLoginStore();

  const [txtEmail, setTxtEmail] = useState('');
  const [txtPass, setTxtPass] = useState('');

  const handleLogin = async () => {
    const login = {
      email: txtEmail,
      pass: txtPass,
    };

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
      loginStore({ accessToken: data?.accessToken, ...data.user });
      await storeObjectData('userLogged', { accessToken: data?.accessToken, ...data.user });
      router.push('/home');
    } else {
      const data = await response.json();
      Alert.alert('Erro ao logar');
      console.log(data?.error);
    }
    return;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Bem-vindo</Text>
        <Text style={styles.subtitle}>Faça login para continuar</Text>

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTxtEmail}
          value={txtEmail}
          placeholder="Digite seu email"
          placeholderTextColor="#A0A0A0"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Senha:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTxtPass}
          value={txtPass}
          secureTextEntry={true}
          placeholder="Digite sua senha"
          placeholderTextColor="#A0A0A0"
        />

        <Button onPress={handleLogin} style={styles.loginButton}>
          Entrar
        </Button>

        <View style={styles.divisor} />

        <Button onPress={() => router.push('/signup')} style={styles.signupButton}>
          Cadastre-se
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7', 
  },
  formContainer: {
    flex: 1,
    marginTop: 100,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1C1C1E', 
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6C6C70',
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    color: '#1C1C1E',
    alignSelf: 'flex-start',
    marginLeft: 5,
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#A0A0A0', 
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginVertical: 10,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  signupButton: {
    backgroundColor: '#6C6C70', 
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  divisor: {
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    width: '90%',
    marginVertical: 20,
  },
});

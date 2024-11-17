import { ScrollView, StyleSheet, View, Text, TextInput, Alert } from 'react-native';
import Button from '../Views/components/Button';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useLoginStore } from '../stores/useLoginStore';

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

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(login),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login bem-sucedido:', data);

        // Armazena o token e os dados do usuário
        loginStore({ accessToken: data.accessToken, ...data.user });

        // Redireciona para a tela inicial após o login
        router.push('/home');
      } else {
        const data = await response.json();
        Alert.alert('Erro ao logar', data?.error || 'Verifique suas credenciais');
        console.log('Erro ao logar:', data?.error);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      Alert.alert('Erro de conexão', 'Não foi possível conectar ao servidor.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>Email:</Text>
        <TextInput 
          style={styles.input}
          onChangeText={setTxtEmail}
          value={txtEmail}
          placeholder='Digite seu email'
          placeholderTextColor='#DDDDDD'
          keyboardType='email-address'
        />

        <Text style={styles.label}>Senha:</Text>
        <TextInput 
          style={styles.input}
          onChangeText={setTxtPass}
          value={txtPass}
          secureTextEntry
          placeholder='Digite sua senha'
          placeholderTextColor='#DDDDDD'
        />

        <Button onPress={handleLogin} title="Entrar">Entrar</Button>
        
        <View style={styles.divisor} />

        <Button onPress={() => router.push('/signup')} title="Cadastre-se">Cadastre-se</Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#444444',
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginVertical: 5,
    borderRadius: 5,
    color: '#333333',
  },
  divisor: {
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    width: '90%',
    marginVertical: 50,
  },
});

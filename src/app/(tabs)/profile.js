import { View, StyleSheet, Text, Alert } from 'react-native';
import { Image } from 'expo-image';
import Button from '../../Views/components/Button';
import { useLoginStore } from '../../stores/useLoginStore';
import { useRouter } from 'expo-router';
import { deleteObjectData } from '../../utils/asyncStorage';

export default function Profile() {
  const { avatar, name } = useLoginStore();
  const { logout: logoutStore, accessToken } = useLoginStore();
  const router = useRouter();

  const handleLogout = async () => {
    const logout = { accessToken };

    try {
      const response = await fetch('http://localhost:3000/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logout),
      });

      if (response.ok) {
        logoutStore();
        await deleteObjectData('userLogged');
        router.replace('/login');
      } else {
        const data = await response.json();
        Alert.alert('Erro', data?.error || 'Erro ao realizar logout.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <Text style={styles.name}>{name || 'Usuário'}</Text>
      <Button onPress={handleLogout} title="Logout" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F7',
    padding: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#587796',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#466684',
    marginBottom: 30,
  },
});

import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { getObjectData } from '../utils/asyncStorage'; 

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      try {
   
        const user = await getObjectData('userLogged');
        if (user && user.accessToken) {
          router.replace('/login'); 
        } else {
          router.replace('/login'); 
        }
      } catch (error) {
        console.error('Erro ao verificar login:', error);
        router.replace('/login'); 
      }
    };

    checkLogin();
  }, []);

  return null;
}

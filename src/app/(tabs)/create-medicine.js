import { View, StyleSheet, Text, TextInput } from 'react-native';
import { useState } from "react";
import Button from '../../Views/components/Button';
import { useRouter } from 'expo-router';
import { useMedicineStore } from '../../stores/useMedicineStore';
import { useLoginStore } from '../../stores/useLoginStore'; 
import { fetchAuth } from '../../utils/fetchAuth';

export default function CreateMedicine() {

    const { addMedicine } = useMedicineStore();
    const { id: userId } = useLoginStore(); 
    const router = useRouter();

    const [txtName, setTxtName] = useState('');
    const [txtDescription, setTxtDescription] = useState('');
    const [txtPeriod, setTxtPeriod] = useState('');
    const [txtImgUrl, setTxtImgUrl] = useState('');

    const handleCreateMedicine = async () => {
        if (!userId) {
            console.log('Erro: Usuário não encontrado');
            return;
        }

        const medicine = {
            medicine: txtName,
            description: txtDescription,
            period: txtPeriod,
            image_url: txtImgUrl,
            user_id: userId  
        };

        const response = await fetchAuth('http://localhost:3000/medication', {
            method: 'POST',
            body: JSON.stringify(medicine)
        });

        if (response.ok) {
            const data = await response.json();
            addMedicine(data.medicine); 
            router.replace('/home');     
        }

        console.log('Erro ao carregar medicamentos');
        return;
    };

    return (
        <View style={styles.container}>
            <Text>Nome do Medicamento:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setTxtName}
                value={txtName}
                placeholder='Digite o nome do medicamento...'
                placeholderTextColor='#DDDDDD'
            />
            <Text>Descrição:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setTxtDescription}
                value={txtDescription}
                placeholder='Digite a descrição do medicamento...'
                placeholderTextColor='#DDDDDD'
            />
            <Text>Período de Uso (em dias):</Text>
            <TextInput
                style={styles.input}
                onChangeText={setTxtPeriod}
                value={txtPeriod}
                placeholder='Digite o período de uso (dias)...'
                keyboardType='numeric'
                placeholderTextColor='#DDDDDD'
            />
            <Text>URL da Imagem:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setTxtImgUrl}
                value={txtImgUrl}
                placeholder='Digite a URL da imagem do medicamento...'
                keyboardType='url'
                placeholderTextColor='#DDDDDD'
            />
            <Button onPress={handleCreateMedicine}>Cadastrar</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
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
});

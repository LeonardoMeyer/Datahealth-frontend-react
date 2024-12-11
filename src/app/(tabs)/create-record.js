import { View, StyleSheet, Text, TextInput } from 'react-native';
import { useState } from "react";
import Button from '../../Views/components/Button';
import { useRouter } from 'expo-router';
import { useRecordStore } from '../../stores/useRecordStore';
import { useLoginStore } from '../../stores/useLoginStore'; 
import { fetchAuth } from '../../utils/fetchAuth';

export default function CreateRecord() {
    const { addRecord } = useRecordStore();
    const { id: userId } = useLoginStore(); 
    const router = useRouter();

    const [txtReport, setTxtReport] = useState('');
    const [txtRecipe, setTxtRecipe] = useState('');
    const [txtDate, setTxtDate] = useState('');
    const [txtImgUrl, setTxtImgUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleDateInput = (value) => {
        let cleanedValue = value.replace(/\D/g, '');

        if (cleanedValue.length > 2 && cleanedValue.length <= 4) {
            cleanedValue = `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2)}`;
        } else if (cleanedValue.length > 4) {
            cleanedValue = `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2, 4)}/${cleanedValue.slice(4, 8)}`;
        }

        setTxtDate(cleanedValue);
    };

    const handleCreateRecord = async () => {
        if (!userId) {
            console.log('Erro: Usuário não encontrado');
            return;
        }

        if (!txtReport || !txtImgUrl || !txtDate) {
            setErrorMessage("Todos os campos obrigatórios devem ser preenchidos.");
            console.log("Campos obrigatórios não preenchidos corretamente.");
            return;
        }

        const dateParts = txtDate.split('/');
        if (dateParts.length !== 3 || dateParts[0].length !== 2 || dateParts[1].length !== 2 || dateParts[2].length !== 4) {
            setErrorMessage("Data inválida! Use o formato dd/mm/yyyy.");
            console.log('Data inválida:', txtDate);
            return;
        }

        const formattedDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`).toISOString();

        const record = {
            report: txtReport,
            recipe: txtRecipe,
            exam: txtImgUrl,
            user_id: userId,
            date: formattedDate,
        };

        console.log("Dados sendo enviados para o servidor:", record);

        try {
            const response = await fetchAuth('http://localhost:3000/record', {
                method: 'POST',
                body: JSON.stringify(record),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Erro ao criar o registro');
                console.log('Erro no envio:', errorData.message);
                return;
            }

            const data = await response.json();
            addRecord(data.record);
            router.replace('/home'); 

        } catch (error) {
            console.error('Erro ao criar o prontuário:', error);
            setErrorMessage('Erro ao criar o registro');
        }
    };

    return (
        <View style={styles.container}>
            <Text>Relatório:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setTxtReport}
                value={txtReport}
                placeholder='Digite o relatório...'
                placeholderTextColor='#DDDDDD'
            />
            <Text>Receita:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setTxtRecipe}
                value={txtRecipe}
                placeholder='Digite a receita...'
                placeholderTextColor='#DDDDDD'
            />
            <Text>Data:</Text>
            <TextInput
                style={styles.input}
                onChangeText={handleDateInput}
                value={txtDate}
                placeholder='Digite a data (dd/mm/yyyy)...'
                keyboardType='numeric'
                placeholderTextColor='#DDDDDD'
                maxLength={10}
            />
            <Text>URL do Exame:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setTxtImgUrl}
                value={txtImgUrl}
                placeholder='Digite a URL do exame...'
                keyboardType='url'
                placeholderTextColor='#DDDDDD'
            />
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
            <Button onPress={handleCreateRecord}>Cadastrar</Button>
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
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});

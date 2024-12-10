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

    const handleCreateRecord = async () => {
        if (!userId) {
            console.log('Erro: Usuário não encontrado');
            return;
        }

        // Validação de dados de entrada
        if (!txtReport || !txtImgUrl || !txtDate) {
            setErrorMessage("Todos os campos obrigatórios devem ser preenchidos.");
            console.log("Campos obrigatórios não preenchidos corretamente.");
            return;
        }

        let formattedDate = null;
        const dateInput = new Date(txtDate);

        // Verificando se a data é válida
        if (!isNaN(dateInput)) {
            formattedDate = dateInput.toISOString();
        } else {
            setErrorMessage("Data inválida!");
            console.log('Data inválida:', txtDate);
            return;
        }

        // Verificando o que está sendo enviado
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

            // Se a resposta não for bem-sucedida, retorna a mensagem de erro
            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Erro ao criar o registro');
                console.log('Erro no envio:', errorData.message);
                return;
            }

            const data = await response.json();
            addRecord(data.record);
            router.replace('/home');  // Redirecionar para a página inicial

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
                onChangeText={setTxtDate}
                value={txtDate}
                placeholder='Digite a data (yyyy-mm-dd)...'
                keyboardType='default'
                placeholderTextColor='#DDDDDD'
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

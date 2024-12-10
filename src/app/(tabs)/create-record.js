import { View, StyleSheet, Text, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import Button from '../../Views/components/Button';
import { useRouter } from 'expo-router';
import { useRecordStore } from '../../stores/useRecordStore';
import { useLoginStore } from '../../stores/useLoginStore'; 
import { fetchAuth } from '../../utils/fetchAuth';

export default function CreateRecord() {
    const { addRecord } = useRecordStore();
    const { id: userId } = useLoginStore(); 
    const router = useRouter();

    const [formData, setFormData] = useState({
        report: '',
        recipe: '',
        date: '',
        imageUrl: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrorMessage(''); // Clear error messages when editing
    };

    const validateForm = () => {
        const { report, date, imageUrl } = formData;

        if (!report || !date || !imageUrl) {
            setErrorMessage("Todos os campos obrigatórios devem ser preenchidos.");
            return false;
        }

        const parsedDate = new Date(date);
        if (isNaN(parsedDate)) {
            setErrorMessage("Data inválida! Use o formato yyyy-mm-dd.");
            return false;
        }

        if (!imageUrl.startsWith('http') || !imageUrl.includes('.')) {
            setErrorMessage("URL inválida. Certifique-se de que começa com 'http' e contém um formato válido.");
            return false;
        }

        return true;
    };

    const handleCreateRecord = async () => {
        if (!userId) {
            console.error('Erro: Usuário não encontrado');
            return;
        }

        if (!validateForm()) {
            return;
        }

        const { report, recipe, date, imageUrl } = formData;
        const formattedDate = new Date(date).toISOString();

        const record = {
            report,
            recipe,
            exam: imageUrl,
            user_id: userId,
            date: formattedDate,
        };

        try {
            console.log("Enviando dados para o servidor:", record);
            const response = await fetchAuth('http://localhost:3000/record', {
                method: 'POST',
                body: JSON.stringify(record),
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Erro no servidor:', errorData);
                setErrorMessage(errorData.message || 'Erro ao criar o registro');
                return;
            }

            const data = await response.json();
            addRecord(data.record);
            Alert.alert('Sucesso', 'Registro criado com sucesso!');
            router.replace('/home');
        } catch (error) {
            console.error('Erro na requisição:', error);
            setErrorMessage('Erro ao criar o registro');
        }
        console.log("Dados enviados ao servidor:", record);

    };

    return (
        <View style={styles.container}>
            <Text>Relatório:</Text>
            <TextInput
                style={styles.input}
                onChangeText={(value) => handleInputChange('report', value)}
                value={formData.report}
                placeholder='Digite o relatório...'
                placeholderTextColor='#DDDDDD'
            />
            <Text>Receita:</Text>
            <TextInput
                style={styles.input}
                onChangeText={(value) => handleInputChange('recipe', value)}
                value={formData.recipe}
                placeholder='Digite a receita...'
                placeholderTextColor='#DDDDDD'
            />
            <Text>Data:</Text>
            <TextInput
                style={styles.input}
                onChangeText={(value) => handleInputChange('date', value)}
                value={formData.date}
                placeholder='Digite a data (yyyy-mm-dd)...'
                placeholderTextColor='#DDDDDD'
            />
            <Text>URL do Exame:</Text>
            <TextInput
                style={styles.input}
                onChangeText={(value) => handleInputChange('imageUrl', value)}
                value={formData.imageUrl}
                placeholder='Digite a URL do exame...'
                placeholderTextColor='#DDDDDD'
                keyboardType='url'
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

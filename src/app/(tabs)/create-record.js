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

<<<<<<< HEAD
    // Função para formatar a data no padrão brasileiro
    const handleDateInput = (value) => {
        // Remove qualquer caractere não numérico
        let cleanedValue = value.replace(/\D/g, '');

        // Adiciona as divisões "/" automaticamente
        if (cleanedValue.length > 2 && cleanedValue.length <= 4) {
            cleanedValue = `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2)}`;
        } else if (cleanedValue.length > 4) {
            cleanedValue = `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2, 4)}/${cleanedValue.slice(4, 8)}`;
        }

        setTxtDate(cleanedValue);
=======
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
>>>>>>> 41896254d55491714f7336b2c203d9e9d41bad74
    };

    const handleCreateRecord = async () => {
        if (!userId) {
            console.error('Erro: Usuário não encontrado');
            return;
        }

<<<<<<< HEAD
        if (!txtReport || !txtImgUrl || !txtDate) {
            setErrorMessage("Todos os campos obrigatórios devem ser preenchidos.");
            console.log("Campos obrigatórios não preenchidos corretamente.");
            return;
        }

        // Verifica se a data está no formato correto (dd/mm/yyyy) e converte para ISO
        const dateParts = txtDate.split('/');
        if (dateParts.length !== 3 || dateParts[0].length !== 2 || dateParts[1].length !== 2 || dateParts[2].length !== 4) {
            setErrorMessage("Data inválida! Use o formato dd/mm/yyyy.");
            console.log('Data inválida:', txtDate);
            return;
        }

        const formattedDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`).toISOString();
=======
        if (!validateForm()) {
            return;
        }

        const { report, recipe, date, imageUrl } = formData;
        const formattedDate = new Date(date).toISOString();
>>>>>>> 41896254d55491714f7336b2c203d9e9d41bad74

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
>>>>>>> 41896254d55491714f7336b2c203d9e9d41bad74
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
<<<<<<< HEAD
                onChangeText={handleDateInput}
                value={txtDate}
                placeholder='Digite a data (dd/mm/yyyy)...'
                keyboardType='numeric'
=======
                onChangeText={(value) => handleInputChange('date', value)}
                value={formData.date}
                placeholder='Digite a data (yyyy-mm-dd)...'
>>>>>>> 41896254d55491714f7336b2c203d9e9d41bad74
                placeholderTextColor='#DDDDDD'
                maxLength={10}
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

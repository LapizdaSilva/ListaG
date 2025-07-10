import React, { useState } from 'react';
import { Alert, TouchableOpacity, TextInput, ScrollView, Text, StyleSheet } from 'react-native';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const CriarTarefa = ({ navigation }) => {
    const [criarTarefa, setCriarTarefa] = useState('');
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState(new Date());
    const [status, setStatus] = useState('Pendente');
    const [description, setDescription] = useState('');
    const [id, setId] = useState();

    React.useEffect(() => {
      const generateId = () => {
        return Math.random().toString(15).substr(2, 9) + Date.now();
      };
      setId(generateId());
    }, []);

    const handleCriarTarefa = async () => {
        if (!criarTarefa) {
            Alert.alert('Atenção', 'Por favor, preencha o campo de tarefa');
            return;
        }

    setLoading(true);
    try {
      const id = Math.random().toString(36).substr(2,9) + Date.now()

      const operationData = {
        date: date,
        tarefa: criarTarefa,
        status: status,
        idTarefa: id,
        descricao: description,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'operations'), operationData);

      Alert.alert('Sucesso', 'Tarefa salva com sucesso!', [
        { text: 'OK', onPress: () => {
          setDate('');
          setCriarTarefa('');
          setStatus('Pendente');
          navigation.navigate('Ver Tarefas');
        }}
      ]);
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
      Alert.alert('Erro', 'Erro ao salvar tarefa. Tente novamente.');
    } finally { 
      setLoading(false);
    }
  };

    return (
      <ScrollView style={styles.container}>

        <Text style={styles.titulo}>Criar Tarefa</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite o nome da tarefa.."
          value={criarTarefa}
          onChangeText={setCriarTarefa}
          editable={!loading}
        />

        <TextInput
          style={styles.input}
          placeholder="Digite a Descrição da tarefa"
          value={description}
          onChangeText={setDescription}
          editable={!loading}
        />

        <TextInput
          style={styles.input}
          placeholder="Data esperada até conclusão (dd-mm-yyyy)"
          value={date}
          onChangeText={setDate}
          editable={!loading}
        />

        <TouchableOpacity
          style={[styles.tarefa]}
          onPress={handleCriarTarefa}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Salvando...' : 'Criar Tarefa'}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tarefa]}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Cancelando.': 'Cancelar'}</Text>
        </TouchableOpacity>
      </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 20,
        paddingTop: 20,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: 'black',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        textAlign: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
    },
    tarefa: {
        backgroundColor: '#2196F3',
        height: 45,
        borderRadius: 6,
        alignItems: 'center',
        ustifyContent: 'center',
        borderWidth: 1,
        marginBottom: 15,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        padding: 30,
        paddingTop: 50,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
  });

export default CriarTarefa;

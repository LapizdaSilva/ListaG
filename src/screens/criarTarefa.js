import React, { useState } from 'react';
import { Alert, TouchableOpacity, TextInput, ScrollView, Text } from 'react-native';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import styleSheet from '../stylesSheetSheet';

//**  Desenvolva uma aplicação de Gerenciamento de Projetos. A aplicação deve permitir criar, istar, editar e excluir projetos e suas 
// tarefas, com filtros e validações. Implemente uma solução robusta, seguindo boas práticas de código e arquitetura.
// Inclua testes ou validações e documente o processo no ReadMe*/

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

      await addDoc(collection(db, 'tasks'), operationData);

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
      <ScrollView style={styleSheet.container}>

        <Text style={styleSheet.titulo}>Criar Tarefa</Text>

        <TextInput
          style={styleSheet.input}
          placeholder="Digite o nome da tarefa.."
          value={criarTarefa}
          onChangeText={setCriarTarefa}
          editable={!loading}
        />

        <TextInput
          style={styleSheet.input}
          placeholder="Digite a Descrição da tarefa"
          value={description}
          onChangeText={setDescription}
          editable={!loading}
        />

        <TextInput
          style={styleSheet.input}
          placeholder="Data esperada até conclusão (dd-mm-yyyy)"
          value={date}
          onChangeText={setDate}
          editable={!loading}
        />

        <TouchableOpacity
          style={[styleSheet.tarefa]}
          onPress={handleCriarTarefa}
          disabled={loading}
        >
          <Text style={styleSheet.buttonText}>{loading ? 'Salvando...' : 'Criar Tarefa'}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styleSheet.tarefa]}
          disabled={loading}
        >
          <Text style={styleSheet.buttonText}>{loading ? 'Cancelando.': 'Cancelar'}</Text>
        </TouchableOpacity>
      </ScrollView>
    );
};

export default CriarTarefa;
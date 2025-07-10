import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, Text, View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const TransactionItem = ({ item }) => (
  <View style={styles.task}>
    <Text style={styles.taskText}>{item.tarefa}</Text>
    <Text style={styles.taskDescription}>{item.descricao || 'Sem descrição'}</Text>
    <Text style={styles.taskStatus}>Status: {item.status || 'Pendente'}</Text>
  </View>
);

const VerTarefa = ({ navigation }) => {
  const [tarefas, setTarefas] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'operations'));
        const tarefasOrganizadas = {};

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          let dataFormatada = 'Sem data';
          if (data.date) {
            if (data.date.toDate) {
              const dateObj = data.date.toDate();
              dataFormatada = `${dateObj.getDate().toString().padStart(2, '0')}-${(
                dateObj.getMonth() + 1
              ).toString().padStart(2, '0')}-${dateObj.getFullYear()}`;
            } else {
              dataFormatada = data.date; 
            }
          }

          if (!tarefasOrganizadas[dataFormatada]) {
            tarefasOrganizadas[dataFormatada] = [];
          }

          tarefasOrganizadas[dataFormatada].push({
            id: doc.id,
            tarefa: data.tarefa || 'Tarefa sem nome',
            descricao: data.descricao || '',
            status: data.status || 'Pendente',
          });
        });

        setTarefas(tarefasOrganizadas);
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        setError('Erro ao carregar tarefas. Verifique sua conexão ou tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchTarefas();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Carregando Tarefas...</Text>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Erro</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (Object.keys(tarefas).length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Tarefas</Text>
        <Text style={styles.noTasksText}>Nenhuma tarefa encontrada.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Tarefas</Text>
      {Object.keys(tarefas)
        .sort() 
        .map((date) => (
          <View key={date}>
            <Text style={styles.sectionTitle}>{date}</Text>
            <FlatList
              data={tarefas[date]}
              renderItem={({ item }) => <TransactionItem item={item} />}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  task: {
    backgroundColor: '#2196F3',
    borderRadius: 6,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1976D2',
    marginBottom: 15,
    padding: 10,
  },
  taskText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  taskDescription: {
    color: '#FFF',
    fontSize: 14,
    textAlign: 'center',
  },
  taskStatus: {
    color: '#FFF',
    fontSize: 14,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  noTasksText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default VerTarefa;

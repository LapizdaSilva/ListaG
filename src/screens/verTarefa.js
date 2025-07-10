import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import styleSheet from '../styles';

const TransactionItem = ({ item }) => (
    <View style={styleSheet.tarefa}>
        <Text style={styleSheet.buttonText}>{item.tarefa}</Text>
    </View>
);

const VerTarefa = ({ navigation }) => {
    const [tarefas, setTarefas] = useState({});

    useEffect(() => {
        const fetchTarefas = async () => {
            const querySnapshot = await getDocs(collection(db, 'tarefas'));
            const tarefasOrganizadas = {};

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const dataFormatada = data.date || 'Sem data';

                if (!tarefasOrganizadas[dataFormatada]) {
                    tarefasOrganizadas[dataFormatada] = [];
                }

                tarefasOrganizadas[dataFormatada].push({
                    id: doc.id,
                    tarefa: data.tarefa,
                    descricao: data.descricao,
                    status: data.status,
                });
            });

            setTarefas(tarefasOrganizadas);
        };

        fetchTarefas();
    }, []);

    return (
        <ScrollView style={styleSheet.container}>
            <Text style={styleSheet.title}>Tarefas</Text>
            {Object.keys(tarefas).map(date => (
                <View key={date}>
                    <Text style={styleSheet.sectionTitle}>{date}</Text>
                    <FlatList
                        data={tarefas[date]}
                        renderItem={({ item }) => <TransactionItem item={item} />}
                        keyExtractor={item => item.id}
                        scrollEnabled={false}
                    />
                </View>
            ))}
        </ScrollView>
    );
};

export default VerTarefa;

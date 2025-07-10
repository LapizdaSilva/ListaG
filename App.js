import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import criarTarefa from './src/screens/criarTarefa';
import verTarefa from './src/screens/verTarefa';
import './src/firebase.js';

const tab = createBottomTabNavigator();
const stack = createNativeStackNavigator();

function HomeTabs() {
    return (
        <tab.Navigator 
            initialRouteName="Ver Tarefas"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Criar Tarefas') {
                        iconName = focused ? 'checkbox-marked-outline' : 'checkbox-blank-outline';
                    }
                    else if (route.name === 'Ver Tarefas'){
                        iconName = focused ? 'check-all' : 'check';
                    }
                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#6A0DAD',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}
        >
            <tab.Screen name="Criar Tarefas" component={criarTarefa} />
            <tab.Screen name="Ver Tarefas" component={verTarefa} />
        </tab.Navigator>
        );
    }

export default function App() {
    return (
        <NavigationContainer>
            <stack.Navigator initialRouteName="Ver Tarefas">
                <stack.Screen name="Ver Tarefas" component={HomeTabs} options={{ headerShown: false }} />
            </stack.Navigator>
        </NavigationContainer>
    );
}
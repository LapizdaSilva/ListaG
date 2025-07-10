import { StyleSheet  } from 'react-native'

const styleSheet = () => {
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
};

export default styleSheet;
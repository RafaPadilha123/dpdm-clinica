import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  Platform,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const PacientesScreen = ({ navigation }) => {
  const [pacientes, setPacientes] = useState([]);
  const [user, setUser] = useState(null);

  const carregarPacientes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'pacientes'));
      const lista = [];
      querySnapshot.forEach((docSnap) => {
        lista.push({ id: docSnap.id, ...docSnap.data() });
      });
      setPacientes(lista);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os pacientes.');
    }
  };

  const handleDelete = (id) => {
    if (Platform.OS === 'web') {
      if (window.confirm('Excluir paciente?')) {
        executeDelete(id);
      }
    } else {
      Alert.alert('Confirmar', 'Excluir paciente?', [
        { text: 'Cancelar' },
        { text: 'Excluir', onPress: () => executeDelete(id) },
      ]);
    }
  };

  const executeDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'pacientes', id));
      setPacientes((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  useEffect(() => {
    carregarPacientes();

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (usuario) => {
      if (usuario) {
        setUser(usuario);
      } else {
        navigation.replace('Login');
      }
    });

    return unsubscribe;
  }, []);

  if (!user) return null;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#2abf7f" barStyle="light-content" />
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="people" size={24} color="white" style={{ marginRight: 10 }} />
          <Text style={styles.clinicName}>ESPAÇO MORADA PSICOLOGIA</Text>
        </View>
        <View style={styles.userActions}>
          <Text style={styles.userEmail}>{user.email}</Text>
          <Pressable
            style={styles.sairButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.sairText}>SAIR</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>PACIENTES</Text>
        <ScrollView
          style={styles.pacientesList}
          contentContainerStyle={styles.scrollContent}
        >
          {pacientes.length === 0 ? (
            <Text style={styles.emptyMessage}>Nenhum paciente cadastrado</Text>
          ) : (
            pacientes.map((paciente) => (
              <View key={paciente.id} style={styles.pacienteCard}>
                <View style={styles.pacienteInfo}>
                  <Text style={styles.pacienteNome}>{paciente.nome}</Text>
                  <Text style={styles.pacienteDetalhes}>Idade: {paciente.idade} anos</Text>
                  <Text style={styles.pacienteDetalhes}>Tel: {paciente.telefone}</Text>
                </View>
                <View style={styles.buttonsColumn}>
                  <Pressable
                    style={({ pressed }) => [
                      styles.actionButton,
                      styles.firstButton,
                      { opacity: pressed ? 0.6 : 1 },
                    ]}
                    onPress={() =>
                      navigation.navigate('Atendimentos', { paciente })
                    }
                  >
                    <Text style={styles.buttonText}>Atendimentos</Text>
                  </Pressable>
                  <Pressable
                    style={({ pressed }) => [
                      styles.actionButton,
                      styles.middleButton,
                      { opacity: pressed ? 0.6 : 1 },
                    ]}
                    onPress={() =>
                      navigation.navigate('EditarPaciente', {
                        paciente,
                        onSave: async (updatedPaciente) => {
                          await updateDoc(doc(db, 'pacientes', updatedPaciente.id), {
                            nome: updatedPaciente.nome,
                            idade: updatedPaciente.idade,
                            telefone: updatedPaciente.telefone,
                          });
                          setPacientes((pacientes) =>
                            pacientes.map((p) =>
                              p.id === updatedPaciente.id ? updatedPaciente : p
                            )
                          );
                        },
                      })
                    }
                  >
                    <Text style={styles.buttonText}>Editar</Text>
                  </Pressable>
                  <Pressable
                    style={({ pressed }) => [
                      styles.actionButton,
                      styles.deleteButton,
                      { opacity: pressed ? 0.6 : 1 },
                    ]}
                    onPress={() => handleDelete(paciente.id)}
                  >
                    <Text style={styles.buttonText}>Excluir</Text>
                  </Pressable>
                </View>
              </View>
            ))
          )}
        </ScrollView>

        <Pressable
          style={styles.cadastrarButton}
          onPress={() =>
            navigation.navigate('Cadastro', {
              addPaciente: (novoPaciente) =>
                setPacientes([...pacientes, novoPaciente]),
            })
          }
        >
          <Text style={styles.cadastrarText}>+ CADASTRAR</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    backgroundColor: '#2abf7f',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: (StatusBar.currentHeight || 0) + 12,
    paddingBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  clinicName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  userActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userEmail: {
    fontSize: 12,
    color: 'white',
    marginRight: 12,
  },
  sairButton: {
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  sairText: {
    color: '#2abf7f',
    fontWeight: 'bold',
  },
  content: { flex: 1, paddingHorizontal: 16 },
  sectionTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  pacientesList: { flex: 1, marginBottom: 10 },
  scrollContent: { paddingBottom: 10 },
  emptyMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  pacienteCard: {
    backgroundColor: '#cfe6dc',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: 900,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  pacienteInfo: { flex: 1, marginRight: 10 },
  pacienteNome: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  pacienteDetalhes: { fontSize: 14, color: '#666', marginBottom: 2 },
  buttonsColumn: { justifyContent: 'space-between', height: 110 },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    width: 100,
    alignItems: 'center',
  },
  firstButton: { backgroundColor: '#3498db' },
  middleButton: { backgroundColor: '#2abf7f' },
  deleteButton: { backgroundColor: '#e74c3c' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 12 },
  cadastrarButton: {
    backgroundColor: '#2abf7f',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignSelf: 'center',
    marginBottom: 15,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  cadastrarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PacientesScreen;


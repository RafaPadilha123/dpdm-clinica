import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, StatusBar, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Atendimentos = ({ route, navigation }) => {
  const { paciente } = route.params;
  const [atendimentos, setAtendimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserEmail(user.email);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const carregarAtendimentos = async () => {
      try {
        const q = query(
          collection(db, 'atendimentos'),
          where('pacienteId', '==', paciente.id)
        );

        const snapshot = await getDocs(q);
        const lista = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setAtendimentos(lista);
      } catch (error) {
        console.error('Erro ao carregar atendimentos:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarAtendimentos();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#2abf7f" barStyle="light-content" />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
          <Text style={styles.clinicName}>ESPAÇO MORADA PSICOLOGIA</Text>
        </View>

        <View style={styles.userActions}>
          <Text style={styles.userEmail}>{userEmail || 'Usuário'}</Text>
          <Pressable
            style={styles.sairButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.sairText}>SAIR</Text>
          </Pressable>
        </View>
      </View>

      <Text style={styles.title}>Atendimentos</Text>
      <Text style={styles.paciente}>Paciente: {paciente.nome}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#2abf7f" />
      ) : (
        <View style={styles.cardContainer}>
          {atendimentos.length === 0 ? (
            <>
              <Text style={styles.empty}>Nenhum atendimento encontrado.</Text>
              <TouchableOpacity
                style={[styles.button, { alignSelf: 'center', marginTop: 30 }]}
                onPress={() => navigation.navigate('CadastroAtendimento', { paciente })}
              >
                <Text style={styles.buttonText}>Novo Atendimento</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <FlatList
                data={atendimentos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.card}>
                    <Text style={styles.date}>
                      Data: {(item.data?.toDate?.() ?? new Date()).toLocaleDateString('pt-BR')}
                    </Text>
                    <Text style={styles.desc}>{item.descricao}</Text>
                  </View>
                )}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('CadastroAtendimento', { paciente })}
              >
                <Text style={styles.buttonText}>Novo Atendimento</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: (StatusBar.currentHeight || 0),
    backgroundColor: '#f5f5f5'
  },
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
    flex: 1
  },
  backButton: {
    marginRight: 10
  },
  clinicName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'left',
  },
  userActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userEmail: {
    color: 'white',
    fontSize: 14,
    marginRight: 10,
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    color: '#2abf7f',
    textAlign: 'center'
  },
  paciente: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555'
  },
  empty: {
    textAlign: 'center',
    marginTop: 30,
    color: '#777'
  },
  cardContainer: {
    backgroundColor: '#cfe6dc',
    padding: 50,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    width: '90%',
    maxWidth: 800,
    alignSelf: 'center'
  },
  card: {
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 300,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    minHeight: 70,
    width: '100%'
  },
  date: {
    fontWeight: '600',
    fontSize: 13,
    color: '#2abf7f'
  },
  desc: {
    color: '#444',
    fontSize: 12,
    marginTop: 2
  },
  button: {
    backgroundColor: '#2abf7f',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignSelf: 'center',
    marginTop: 20
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14
  }
});

export default Atendimentos;


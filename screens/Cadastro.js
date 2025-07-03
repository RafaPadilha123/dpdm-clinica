import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Platform, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Cadastro = ({ navigation, route }) => {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [telefone, setTelefone] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      }
    });

    return unsubscribe;
  }, []);

  const handleCadastro = async () => {
    const nomeValido = nome.trim();
    const idadeValida = idade.trim() !== '' && !isNaN(idade);
    const telefoneValido = telefone.trim();

    if (!nomeValido || !idadeValida || !telefoneValido) {
      alert('Por favor, preencha os dados corretamente!');
      return;
    }

    try {
      const novoPaciente = {
        nome: nomeValido,
        idade: parseInt(idade),
        telefone: telefoneValido,
      };

      const docRef = await addDoc(collection(db, 'pacientes'), novoPaciente);

      if (route.params?.addPaciente) {
        route.params.addPaciente({
          ...novoPaciente,
          id: docRef.id,
        });
      }

      alert('Paciente cadastrado com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao cadastrar paciente:', error);
      alert('Erro ao cadastrar paciente.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#2abf7f" barStyle="light-content" />
      
      <View style={styles.header}>
        <View style={styles.leftHeader}>
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

      <View style={styles.content}>
        <View style={styles.form}>
          <Text style={styles.label}>Nome Completo*</Text>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            autoCapitalize="words"
          />

          <Text style={styles.label}>Idade*</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={idade}
            onChangeText={setIdade}
            maxLength={3}
          />

          <Text style={styles.label}>Telefone*</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            value={telefone}
            onChangeText={setTelefone}
          />

          <TouchableOpacity 
            style={styles.button} 
            onPress={handleCadastro}
          >
            <Text style={styles.buttonText}>SALVAR CADASTRO</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
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

  content: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: 'center', // centraliza o form horizontalmente
  },
  form: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginTop: 50,
    width: '90%',
    maxWidth: 750,  
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#2abf7f',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Cadastro;


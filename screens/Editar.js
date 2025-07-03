import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, StatusBar, Alert } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';

const EditarPacienteScreen = ({ route, navigation }) => {
  const { paciente, onSave } = route.params;
  const [nome, setNome] = useState(paciente.nome);
  const [idade, setIdade] = useState(paciente.idade.toString());
  const [telefone, setTelefone] = useState(paciente.telefone);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserEmail(user.email);
    });
    return unsubscribe;
  }, []);

  const handleSalvar = () => {
    if (!nome || !idade || !telefone) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const pacienteAtualizado = {
      ...paciente,
      nome,
      idade: parseInt(idade),
      telefone
    };

    onSave(pacienteAtualizado);
    navigation.goBack();
  };

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

      <Text style={styles.title}>Editar Paciente</Text>

      <View style={styles.cardContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Idade"
          keyboardType="numeric"
          value={idade}
          onChangeText={setIdade}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          keyboardType="phone-pad"
          value={telefone}
          onChangeText={setTelefone}
        />
        
        <Pressable style={styles.saveButton} onPress={handleSalvar}>
          <Text style={styles.saveButtonText}>Salvar Alterações</Text>
        </Pressable>
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: 10,
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
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    color: '#2abf7f',
  },
  cardContainer: {
    backgroundColor: '#cfe6dc',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxWidth: 800,
    alignSelf: 'center',
    marginTop: 20,
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#2abf7f',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default EditarPacienteScreen;


import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Pressable } from 'react-native';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';

const CadastroAtendimento = ({ navigation, route }) => {
  const [descricao, setDescricao] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [paciente, setPaciente] = useState(null);
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
    if (!route.params?.paciente?.id) {
      window.alert('Paciente inválido');
      navigation.goBack();
      return;
    }
    setPaciente(route.params.paciente);
    setLoading(false);
  }, [route.params]);

  const handleCadastro = async () => {
    try {
      if (!descricao.trim()) {
        window.alert('Preencha a descrição');
        return;
      }

      if (!paciente?.id) {
        window.alert('Paciente não identificado');
        return;
      }

      const atendimentoData = {
        pacienteId: paciente.id,
        pacienteNome: paciente.nome || 'Sem nome',
        descricao: descricao.trim(),
        data: date.toISOString().split('T')[0],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await addDoc(collection(db, 'atendimentos'), atendimentoData);

      window.alert('Atendimento salvo!');
      navigation.navigate('Pacientes');
    } catch (error) {
      window.alert(`Erro: ${error.message}`);
      console.error(error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

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

      <Text style={styles.title}>Novo Atendimento</Text>

      <View style={styles.cardContainer}>
        <Text style={styles.paciente}>Paciente: {paciente.nome}</Text>

        <Text style={styles.label}>Data</Text>
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>{date.toLocaleDateString('pt-BR')}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(_, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )}

        <Text style={styles.label}>Descrição*</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          value={descricao}
          onChangeText={setDescricao}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity
          style={[styles.button, !descricao.trim() && styles.buttonDisabled]}
          onPress={handleCadastro}
          disabled={!descricao.trim()}
        >
          <Text style={styles.buttonText}>SALVAR</Text>
        </TouchableOpacity>
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
    marginTop: 20,
    alignSelf: 'center',
  },
  paciente: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555',
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
    backgroundColor: '#fff',
    width: '100%',
  },
  multilineInput: {
    height: 120,
    textAlignVertical: 'top',
    paddingTop: 15,
  },
  dateInput: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#2abf7f',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CadastroAtendimento;


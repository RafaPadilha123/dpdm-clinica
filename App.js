import 'react-native-gesture-handler';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import PacientesScreen from './screens/Pacientes';
import Cadastro from './screens/Cadastro';
import EditarPacienteScreen from './screens/Editar';
import Atendimentos from './screens/Atendimentos';
import CadastroAtendimento from './screens/CadastroAtendimento';

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
  if (!email || !password) {
    alert('Por favor, preencha email e senha');
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigation.navigate('Pacientes', { userEmail: email });
  } catch (error) {
    alert('Login ou senha incorretos');
  }
};
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>ESPAÇO MORADA PSICOLOGIA</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          <View style={styles.rememberContainer}>
            <Checkbox
              status={rememberMe ? 'checked' : 'unchecked'}
              onPress={() => setRememberMe(!rememberMe)}
              color="#6200ee"
            />
            <Text style={styles.rememberText}>Lembrar-me</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Pacientes" 
          component={PacientesScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Cadastro" 
          component={Cadastro}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="EditarPaciente" 
          component={EditarPacienteScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="Atendimentos" 
        component={Atendimentos}
        options={{ headerShown: false }}
         />
       <Stack.Screen
        name="CadastroAtendimento" 
        component={CadastroAtendimento} 
        options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#2abf7f',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  rememberText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#555',
  },
  button: {
    backgroundColor: '#2abf7f',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;

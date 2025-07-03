import React from 'react';
import { View, Text, Pressable, StyleSheet, StatusBar } from 'react-native';
import { getAuth } from 'firebase/auth';

const Header = ({ title, navigation, showBackButton = false }) => {
  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <View style={styles.header}>
      <StatusBar backgroundColor="#2abf7f" barStyle="light-content" />
      
      {showBackButton && (
        <Pressable 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </Pressable>
      )}
      
      <Text style={styles.clinicName}>{title || 'ESPAÇO MORADA PSICOLOGIA'}</Text>
      
      <View style={styles.userActions}>
        {user && <Text style={styles.userEmail}>{user.email}</Text>}
        <Pressable
          style={styles.sairButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.sairText}>SAIR</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#2abf7f',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: StatusBar.currentHeight + 12,
  },
  clinicName: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: 'white',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  userActions: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  userEmail: { 
    fontSize: 12, 
    color: 'white', 
    marginRight: 12 
  },
  sairButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  sairText: { 
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 12 
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Header;

// app/(tabs)/index.tsx

import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../context/AuthContext'; // Ajusta la ruta si es necesario

const HomeScreen = () => {
  const { user, signOut } = useAuth(); // Usamos el hook para obtener datos y la función signOut

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido de vuelta!</Text>
      <Text style={styles.email}>{user?.email}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Cerrar Sesión" onPress={signOut} color="#FF3B30" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    color: '#555',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '60%',
  }
});

export default HomeScreen;
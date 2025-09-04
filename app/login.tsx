// app/login.tsx

import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Button,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput
} from 'react-native';
import { useAuth } from '../context/AuthContext'; // Asegúrate que la ruta sea correcta

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth(); // Usamos el hook para acceder a la función signIn

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Campos requeridos', 'Por favor, ingresa tu email y contraseña.');
            return;
        }

        setLoading(true);
        try {
            await signIn(email, password);
            // La navegación a la pantalla principal se manejará automáticamente en _layout.tsx
        } catch (error: any) {
            Alert.alert('Error de inicio de sesión', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <Text style={styles.title}>Iniciar Sesión</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#888"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#888"
            />
            {loading ? (
                <ActivityIndicator size="large" color="#007BFF" />
            ) : (
                <Button title="Ingresar" onPress={handleLogin} />
            )}
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: '#fff',
        fontSize: 16,
    },
});

export default LoginScreen;
// app/_layout.tsx

import { Stack, useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import 'react-native-reanimated';
import { AuthProvider, useAuth } from '../context/AuthContext';

const RootLayoutNav = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;

    // --- CAMBIO CLAVE AQUÍ ---
    // Ahora consideramos que el usuario está en la zona segura si está en '(tabs)' O en 'survey'
    const inAuthGroup = segments[0] === '(tabs)' || segments[0] === 'survey';

    if (user && !inAuthGroup) {
      // Si el usuario está logueado pero fuera de la zona segura, lo llevamos a las pestañas.
      router.replace('/(tabs)');
    } else if (!user && segments[0] !== 'login') {
      // Si no está logueado y no está en el login, lo llevamos al login.
      router.replace('/login');
    }
  }, [user, loading, segments]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="survey/[id]" options={{ presentation: 'modal' }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
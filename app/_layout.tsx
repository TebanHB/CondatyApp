// app/_layout.tsx

import { Stack, useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import 'react-native-reanimated';
import { AuthProvider, useAuth } from '../context/AuthContext'; // Revisa la ruta

const RootLayoutNav = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return; // Si está cargando, no hagas nada aún

    const inAuthGroup = segments[0] === '(tabs)';

    if (user && !inAuthGroup) {
      // Si hay usuario pero no está en la sección principal, llévalo allí
      router.replace('/(tabs)');
    } else if (!user && inAuthGroup) {
      // Si no hay usuario pero intenta acceder a la sección principal, llévalo al login
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
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};

export default function RootLayout() {
  // Envolvemos toda la app con el proveedor para que todos tengan acceso al contexto
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
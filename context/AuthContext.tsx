import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react';
import { IAuthContext, User } from '../models/User';
const API_URL = process.env.EXPO_PUBLIC_API_URL;

// La "forma" de nuestro contexto


const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { readonly children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Este useEffect ahora verifica el token contra el backend
    useEffect(() => {
        const verifyStoredToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('userToken');
                if (storedToken) {
                    // Si tenemos token, lo verificamos en el backend
                    const response = await fetch(`${API_URL}/api/auth/verify`, {
                        headers: {
                            // Así es como se envían los tokens JWT en apps móviles
                            'Authorization': `Bearer ${storedToken}`
                        }
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        setUser(userData);
                    } else {
                        // El token no es válido, lo limpiamos
                        await AsyncStorage.removeItem('userToken');
                        setUser(null);
                    }
                }
            } catch (e) {
                console.error("Failed to verify token", e);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        verifyStoredToken();
    }, []);

    // Usamos useCallback para que la función no se recree en cada render
    const signIn = useCallback(async (email: string, password: string) => {
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al iniciar sesión');
            }

            await AsyncStorage.setItem('userToken', data.token);
            setUser({ email: data.email, role: data.role });
            // No hacemos router.push, _layout.tsx se encarga de eso

        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }, []);

    const signOut = useCallback(async () => {
        try {
            // Llamada opcional al backend para invalidar el token si es necesario
            const token = await AsyncStorage.getItem('userToken');
            if (token) {
                await fetch(`${API_URL}/api/auth/logout`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
            }
        } catch (e) {
            console.error("API logout error", e);
        } finally {
            // Limpiamos el estado y el almacenamiento local
            await AsyncStorage.multiRemove(['userToken', 'userEmail']);
            setUser(null);
            // No hacemos router.push, _layout.tsx se encarga de eso
        }
    }, []);

    // useMemo asegura que el objeto de contexto solo cambie si sus dependencias cambian
    const value = useMemo(() => ({
        user,
        loading,
        signIn,
        signOut,
    }), [user, loading, signIn, signOut]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
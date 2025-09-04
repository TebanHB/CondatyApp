// app/(tabs)/dashboard.tsx

import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import SurveyCard from '../../components/SurveyCard';
import { Survey } from '../../models/Survey';
import { getSurveys } from '../../services/surveyApi';

export default function DashboardScreen() {
    const router = useRouter();
    const [surveys, setSurveys] = useState<Survey[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSurveys = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getSurveys();
            setSurveys(data);
        } catch (err) {
            setError('No se pudieron cargar las encuestas. Inténtalo de nuevo.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSurveys();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" style={styles.centered} />;
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>{error}</Text>
                <Button title="Reintentar" onPress={fetchSurveys} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Encuestas Disponibles</Text>
            </View>
            <FlatList
                data={surveys}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <SurveyCard
                        survey={item}
                        onRespond={() => router.push(`/survey/${item.id}`)}
                    />
                )}
                contentContainerStyle={styles.list}
                onRefresh={fetchSurveys}
                refreshing={loading}
                ListEmptyComponent={() => (
                    <View style={styles.centered}>
                        <Text>No hay encuestas disponibles por el momento.</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    list: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        marginBottom: 10,
        color: 'red',
        textAlign: 'center',
    }
});
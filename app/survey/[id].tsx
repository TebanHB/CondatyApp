// app/survey/[id].tsx

import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import QuestionMultiChoice from '../../components/questions/QuestionMultiChoice';
import QuestionSingleChoice from '../../components/questions/QuestionSingleChoice';
import QuestionText from '../../components/questions/QuestionText';
import { Survey } from '../../models/Survey';
import { getSurveyById, submitSurveyResponse } from '../../services/surveyApi';

type AnswersState = {
    [questionId: string]: string | string[];
};

export default function SurveyDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const [survey, setSurvey] = useState<Survey | null>(null);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState<AnswersState>({});

    useEffect(() => {
        const fetchSurvey = async () => {
            if (!id) return;
            try {
                const data = await getSurveyById(id);
                setSurvey(data);
                const initialAnswers: AnswersState = {};
                data.questions.forEach(q => {
                    initialAnswers[q.id] = q.type === 'multiple_choice' ? [] : '';
                });
                setAnswers(initialAnswers);
            } catch (error) {
                Alert.alert("Error", "No se pudo cargar la encuesta.");
            } finally {
                setLoading(false);
            }
        };
        fetchSurvey();
    }, [id]);

    const handleAnswer = (questionId: string, value: string) => {
        setAnswers(prev => {
            const questionType = survey?.questions.find(q => q.id === questionId)?.type;
            // --- CORRECCIÓN AQUÍ ---
            if (questionType === 'multiple_choice') {
                const currentValues = (prev[questionId] as string[]) || [];
                const newValues = currentValues.includes(value)
                    ? currentValues.filter(v => v !== value)
                    : [...currentValues, value];
                return { ...prev, [questionId]: newValues };
            }
            return { ...prev, [questionId]: value };
        });
    };

    const handleSubmit = async () => {
        if (!id) return;
        setLoading(true);
        try {
            const formattedAnswers = Object.entries(answers).map(([questionId, value]) => ({
                questionId,
                value,
            }));
            await submitSurveyResponse(id, formattedAnswers);
            Alert.alert("Éxito", "Tu respuesta ha sido enviada. ¡Gracias!", [
                { text: "OK", onPress: () => router.back() }
            ]);
        } catch (error) {
            Alert.alert("Error", "No se pudo enviar tu respuesta.");
        } finally {
            setLoading(false);
        }
    };

    // ... (el resto del componente y los estilos no cambian)
    if (loading && !survey) {
        return <ActivityIndicator size="large" style={styles.centered} />;
    }

    if (!survey) {
        return <Text style={styles.centered}>Encuesta no encontrada.</Text>;
    }

    return (
        <FlatList
            data={survey.questions}
            keyExtractor={item => item.id}
            ListHeaderComponent={() => (
                <View style={styles.header}>
                    <Stack.Screen options={{ title: survey.title }} />
                    <Text style={styles.title}>{survey.title}</Text>
                    <Text style={styles.description}>{survey.description}</Text>
                </View>
            )}
            renderItem={({ item }) => {
                switch (item.type) {
                    case 'single_choice':
                        return <QuestionSingleChoice
                            questionText={item.text}
                            options={item.options}
                            selectedValue={answers[item.id] as string}
                            onSelect={(value) => handleAnswer(item.id, value)}
                        />;
                    case 'multiple_choice':
                        return <QuestionMultiChoice
                            questionText={item.text}
                            options={item.options}
                            selectedValues={answers[item.id] as string[]}
                            onSelect={(value) => handleAnswer(item.id, value)}
                        />;
                    case 'open_text':
                        return <QuestionText
                            questionText={item.text}
                            value={answers[item.id] as string}
                            onChange={(text) => handleAnswer(item.id, text)}
                        />;
                    default:
                        return <Text style={{ marginVertical: 12 }}>Pregunta de tipo no soportado: {item.type}</Text>;
                }
            }}
            ListFooterComponent={() => (
                <View style={styles.footer}>
                    <Button title={loading ? "Enviando..." : "Enviar Respuestas"} onPress={handleSubmit} disabled={loading} />
                </View>
            )}
            contentContainerStyle={styles.container}
        />
    );
}

const styles = StyleSheet.create({
    container: { padding: 16, backgroundColor: '#f5f5f5' },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: { marginBottom: 16 },
    title: { fontSize: 24, fontWeight: 'bold' },
    description: { fontSize: 16, color: '#666', marginTop: 8 },
    footer: { marginTop: 24, marginBottom: 48 },
});
// services/surveyApi.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Survey, SurveyResponse } from '../models/Survey';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

type AnswerPayload = {
    questionId: string;
    value: string | string[];
};

const getAuthHeaders = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) throw new Error('No se encontró el token de autenticación');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
};

export const getSurveys = async (): Promise<Survey[]> => {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_URL}/api/surveys`, { headers });
    if (!response.ok) throw new Error('Error al obtener las encuestas');
    return response.json();
};

// --- NUEVA FUNCIÓN ---
export const getSurveyById = async (id: string): Promise<Survey> => {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_URL}/api/surveys/${id}`, { headers });
    if (!response.ok) throw new Error('Error al obtener los detalles de la encuesta');
    return response.json();
};

// --- NUEVA FUNCIÓN ---
export const submitSurveyResponse = async (surveyId: string, answers: AnswerPayload[]): Promise<SurveyResponse> => {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_URL}/api/surveys/${surveyId}/responses`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ answers }),
    });
    if (!response.ok) throw new Error('Error al enviar la respuesta');
    return response.json();
};
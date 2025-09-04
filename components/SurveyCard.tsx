// components/SurveyCard.tsx

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Survey } from '../models/Survey'; // Ajusta la ruta si es necesario

type SurveyCardProps = {
    survey: Survey;
    onRespond: () => void;
};

const getStatusColor = (status: Survey['status']) => {
    switch (status) {
        case 'active': return '#28a745'; // Verde
        case 'closed': return '#dc3545'; // Rojo
        case 'draft': return '#6c757d';  // Gris
        default: return '#6c757d';
    }
};

const SurveyCard = ({ survey, onRespond }: SurveyCardProps) => {
    const statusColor = getStatusColor(survey.status);

    return (
        <View style={[styles.card, { borderLeftColor: statusColor }]}>
            <View style={styles.header}>
                <Text style={styles.title} numberOfLines={1}>{survey.title}</Text>
                <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
                    <Text style={styles.statusText}>{survey.status.toUpperCase()}</Text>
                </View>
            </View>
            <Text style={styles.description}>{survey.description}</Text>
            <View style={styles.actions}>
                {survey.status === 'active' && (
                    <Pressable style={styles.respondButton} onPress={onRespond}>
                        <Text style={styles.respondButtonText}>Ver y Responder</Text>
                    </Pressable>
                )}
                {survey.status === 'closed' && (
                    <Text style={styles.closedText}>Esta encuesta está cerrada.</Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        marginVertical: 8,
        borderLeftWidth: 5,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginLeft: 8,
    },
    statusText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
    actions: {
        marginTop: 16,
    },
    respondButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    respondButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    closedText: {
        fontStyle: 'italic',
        color: '#666',
    }
});

export default SurveyCard;
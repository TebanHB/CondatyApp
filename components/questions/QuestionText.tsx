// components/questions/QuestionText.tsx
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

type Props = {
    questionText: string;
    value: string;
    onChange: (text: string) => void;
};

export default function QuestionText({ questionText, value, onChange }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.questionText}>{questionText}</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChange}
                placeholder="Escribe tu respuesta aquí..."
                multiline
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: { marginVertical: 12 },
    questionText: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        minHeight: 100,
        textAlignVertical: 'top',
    },
});
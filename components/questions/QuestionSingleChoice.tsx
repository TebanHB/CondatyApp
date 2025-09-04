// components/questions/QuestionSingleChoice.tsx
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
    questionText: string;
    options: string[];
    selectedValue: string;
    onSelect: (value: string) => void;
};

export default function QuestionSingleChoice({ questionText, options, selectedValue, onSelect }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.questionText}>{questionText}</Text>
            {options.map((option) => (
                <Pressable
                    key={option}
                    style={[styles.option, selectedValue === option && styles.selectedOption]}
                    onPress={() => onSelect(option)}
                >
                    <Text style={selectedValue === option && styles.selectedText}>{option}</Text>
                </Pressable>
            ))}
        </View>
    );
}
// ... (los estilos van aquí abajo)
const styles = StyleSheet.create({
    container: { marginVertical: 12 },
    questionText: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
    option: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 8,
    },
    selectedOption: {
        backgroundColor: '#007BFF',
        borderColor: '#007BFF',
    },
    selectedText: {
        color: 'white',
    }
});
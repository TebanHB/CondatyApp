// components/questions/QuestionMultiChoice.tsx
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
    questionText: string;
    options: string[];
    selectedValues: string[];
    onSelect: (value: string) => void;
};

export default function QuestionMultiChoice({ questionText, options, selectedValues, onSelect }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.questionText}>{questionText}</Text>
            {options.map((option) => {
                const isSelected = selectedValues.includes(option);
                return (
                    <Pressable
                        key={option}
                        style={[styles.option, isSelected && styles.selectedOption]}
                        onPress={() => onSelect(option)}
                    >
                        <Text style={isSelected && styles.selectedText}>{option}</Text>
                    </Pressable>
                );
            })}
        </View>
    );
}
// ... (usa los mismos estilos que QuestionSingleChoice.tsx)
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
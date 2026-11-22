// screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Keyboard, ScrollView } from 'react-native';
import type { Palette } from '../theme/palette';

type LoginScreenProps = {
    colors: Palette;
    onContinue: (email: string) => void;
};

export default function LoginScreen({ colors, onContinue }: LoginScreenProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    function handleContinue() {
        const normalizedEmail = email.trim();
        const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

        if (!emailLooksValid) {
            setError('Введіть email у форматі name@example.com.');
            return;
        }

        if (password.length === 0) {
            setError('Введіть навчальний пароль.');
            return;
        }

        setError(null);
        Keyboard.dismiss();
        setPassword('');
        onContinue(normalizedEmail);
    }

    return (
        <ScrollView
            style={[styles.container, { backgroundColor: colors.background }]}
            keyboardShouldPersistTaps="handled"
        >
            <Text style={[styles.headerText, { color: colors.text }]}>Авторизація</Text>
            <Text style={[styles.regularText, { color: colors.text }]}>
                Увійдіть до свого облікового запису Little Lemon
            </Text>

            <TextInput
                style={[
                    styles.input,
                    {
                        color: colors.text,
                        backgroundColor: colors.surface,
                        borderColor: colors.border,
                    },
                ]}
                placeholder="Електронна пошта"
                placeholderTextColor={colors.muted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={[
                    styles.input,
                    {
                        color: colors.text,
                        backgroundColor: colors.surface,
                        borderColor: colors.border,
                    },
                ]}
                placeholder="Пароль"
                placeholderTextColor={colors.muted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />

            {error !== null && (
                <Text style={[styles.message, { color: colors.error }]}>
                    {error}
                </Text>
            )}

            <Pressable
                accessibilityRole="button"
                onPress={handleContinue}
                style={({ pressed }) => [
                    styles.button,
                    { backgroundColor: colors.accent },
                    pressed && styles.buttonPressed,
                ]}
            >
                <Text style={[styles.buttonText, { color: colors.onAccent }]}>
                    Увійти (демо)
                </Text>
            </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
    },
    regularText: {
        fontSize: 18,
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
        fontSize: 16,
    },
    message: {
        fontSize: 16,
        lineHeight: 24,
        marginVertical: 12,
        textAlign: 'center',
    },
    button: {
        minHeight: 48,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
    },
    buttonPressed: {
        opacity: 0.75,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
});
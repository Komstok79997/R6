// screens/WelcomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, useWindowDimensions, ScrollView } from 'react-native';
import type { Palette } from '../theme/palette';

type WelcomeScreenProps = {
    colors: Palette;
    email: string;
    onExit: () => void;
};

export default function WelcomeScreen({ colors, email, onExit }: WelcomeScreenProps) {
    const { width } = useWindowDimensions();
    const wide = width >= 600;

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.contentWrapper, { flexDirection: wide ? 'row' : 'column' }]}>
                <Image
                    source={require('../assets/images/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                    accessible={true}
                    accessibilityLabel="Логотип Little Lemon"
                />

                <View style={styles.textWrapper}>
                    <Text style={[styles.headerText, { color: colors.text }]}>
                        Ласкаво просимо!
                    </Text>
                    <Text style={[styles.regularText, { color: colors.text }]}>
                        Little Lemon — це чарівний ресторанчик у районі, де подають прості страви та класичні коктейлі в жвавій і водночас невимушеній атмосфері.
                    </Text>
                    <Text style={[styles.demoText, { color: colors.muted }]}>
                        Навчальний екран привітання для {email}.
                    </Text>
                </View>
            </View>

            <Pressable
                accessibilityRole="button"
                onPress={onExit}
                style={({ pressed }) => [
                    styles.button,
                    { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 },
                    pressed && styles.buttonPressed,
                ]}
            >
                <Text style={[styles.buttonText, { color: colors.text }]}>
                    Повернутися до форми
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
    contentWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 120,
        height: 140,
        alignSelf: 'center',
        marginBottom: 16,
    },
    textWrapper: {
        flex: 1,
        paddingHorizontal: 8,
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    regularText: {
        fontSize: 18,
        lineHeight: 26,
        textAlign: 'center',
        marginBottom: 20,
    },
    demoText: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 32,
        fontStyle: 'italic',
    },
    button: {
        minHeight: 48,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
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
// screens/WelcomeScreen.tsx
import React, { useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    useWindowDimensions,
    ScrollView,
} from 'react-native';
import type { Palette } from '../theme/palette';

type WelcomeScreenProps = {
    colors: Palette;
    email: string;
    onExit: () => void;
    onOpenPreferences?: () => void;
};

export default function WelcomeScreen({
                                          colors,
                                          email,
                                          onExit,
                                          onOpenPreferences,
                                      }: WelcomeScreenProps) {
    const { width } = useWindowDimensions();
    const wide = width >= 600;
    const dynamicStyles = useMemo(() => createStyles(colors), [colors]);

    return (
        <ScrollView style={dynamicStyles.container}>
            <View
                style={[
                    styles.contentWrapper,
                    wide ? styles.contentWrapperRow : styles.contentWrapperColumn,
                ]}
            >
                <Image
                    source={require('../assets/images/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                    accessible={true}
                    accessibilityLabel="Логотип Little Lemon"
                />

                <View style={styles.textWrapper}>
                    <Text style={dynamicStyles.headerText}>
                        Ласкаво просимо!
                    </Text>
                    <Text style={dynamicStyles.regularText}>
                        Little Lemon — це чарівний ресторанчик у районі, де подають прості страви та класичні коктейлі в жвавій і водночас невимушеній атмосфері.
                    </Text>
                    <Text style={dynamicStyles.demoText}>
                        Навчальний екран привітання для {email}.
                    </Text>
                </View>
            </View>

            <View style={styles.actionsGroup}>
                {onOpenPreferences !== undefined && (
                    <Pressable
                        accessibilityRole="button"
                        onPress={onOpenPreferences}
                        style={({ pressed }) => [
                            dynamicStyles.buttonAccent,
                            pressed && styles.buttonPressed,
                        ]}
                    >
                        <Text style={dynamicStyles.buttonAccentText}>
                            Налаштування застосунку
                        </Text>
                    </Pressable>
                )}

                <Pressable
                    accessibilityRole="button"
                    onPress={onExit}
                    style={({ pressed }) => [
                        dynamicStyles.buttonSecondary,
                        pressed && styles.buttonPressed,
                    ]}
                >
                    <Text style={dynamicStyles.buttonSecondaryText}>
                        Повернутися до форми
                    </Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    contentWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentWrapperRow: {
        flexDirection: 'row',
    },
    contentWrapperColumn: {
        flexDirection: 'column',
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
    actionsGroup: {
        marginTop: 24,
        gap: 12,
    },
    buttonPressed: {
        opacity: 0.75,
    },
});

const createStyles = (colors: Palette) =>
    StyleSheet.create({
        container: {
            flex: 1,
            padding: 24,
            backgroundColor: colors.background,
        },
        headerText: {
            fontSize: 28,
            fontWeight: 'bold',
            marginBottom: 16,
            textAlign: 'center',
            color: colors.text,
        },
        regularText: {
            fontSize: 18,
            lineHeight: 26,
            textAlign: 'center',
            marginBottom: 20,
            color: colors.text,
        },
        demoText: {
            fontSize: 14,
            textAlign: 'center',
            marginBottom: 32,
            fontStyle: 'italic',
            color: colors.muted,
        },
        buttonAccent: {
            minHeight: 48,
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.accent,
        },
        buttonAccentText: {
            fontSize: 18,
            fontWeight: '600',
            textAlign: 'center',
            color: colors.onAccent,
        },
        buttonSecondary: {
            minHeight: 48,
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderWidth: 1,
        },
        buttonSecondaryText: {
            fontSize: 18,
            fontWeight: '600',
            textAlign: 'center',
            color: colors.text,
        },
    });
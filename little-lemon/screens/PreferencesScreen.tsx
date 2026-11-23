// screens/PreferencesScreen.tsx
import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
    View,
    Text,
    Switch,
    StyleSheet,
    ScrollView,
    Pressable,
    ActivityIndicator,
} from 'react-native';
import { useAppColors } from '../theme/useAppColors';
import type { Palette } from '../theme/palette';
import {
    Preferences,
    defaults,
    readPreferences,
    writePreferences,
    removePreferences,
} from '../storage/preferences';

const labels: Record<keyof Preferences, string> = {
    pushNotifications: 'Push-сповіщення',
    emailMarketing: 'Маркетингові листи',
    latestNews: 'Новини ресторану',
    showMenuHints: 'Показувати підказки меню',
};

const keys: (keyof Preferences)[] = [
    'pushNotifications',
    'emailMarketing',
    'latestNews',
    'showMenuHints',
];

export default function PreferencesScreen() {
    const colors = useAppColors();
    const dynamicStyles = useMemo(() => createStyles(colors), [colors]);

    const [ready, setReady] = useState<boolean>(false);
    const [draft, setDraft] = useState<Preferences>(defaults);
    const [busy, setBusy] = useState<boolean>(false);
    const [notice, setNotice] = useState<string>('');
    const [attempt, setAttempt] = useState<number>(0);
    const mounted = useRef<boolean>(true);

    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);

    useEffect(() => {
        let active = true;
        setReady(false);
        setNotice('');

        readPreferences()
            .then((data) => {
                if (active) {
                    setDraft(data);
                    setReady(true);
                }
            })
            .catch((err) => {
                if (active) {
                    setNotice(err instanceof Error ? err.message : String(err));
                }
            });

        return () => {
            active = false;
        };
    }, [attempt]);

    const handleSave = async () => {
        if (!mounted.current || busy || !ready) {
            return;
        }
        setBusy(true);
        setNotice('');
        try {
            await writePreferences(draft);
            if (mounted.current) {
                setNotice('Збережено успішно.');
            }
        } catch (err) {
            if (mounted.current) {
                setNotice('Помилка запису: ' + (err instanceof Error ? err.message : String(err)));
            }
        } finally {
            if (mounted.current) {
                setBusy(false);
            }
        }
    };

    const handleReset = async () => {
        if (!mounted.current || busy) {
            return;
        }
        setBusy(true);
        setNotice('');
        try {
            await removePreferences();
            if (mounted.current) {
                setDraft({ ...defaults });
                setReady(true);
                setNotice('Налаштування скинуто до стандартних.');
            }
        } catch (err) {
            if (mounted.current) {
                setNotice('Помилка скидання: ' + (err instanceof Error ? err.message : String(err)));
            }
        } finally {
            if (mounted.current) {
                setBusy(false);
            }
        }
    };

    const activeCount = keys.filter((k) => draft[k]).length;
    const summaryText = `Увімкнено опцій: ${activeCount} з ${keys.length}`;

    return (
        <ScrollView
            style={dynamicStyles.container}
            contentContainerStyle={dynamicStyles.content}
        >
            <Text style={dynamicStyles.title}>
                Налаштування Little Lemon
            </Text>

            {notice !== '' && (
                <View style={dynamicStyles.noticeBox}>
                    <Text style={dynamicStyles.noticeText}>{notice}</Text>
                </View>
            )}

            {!ready && notice !== '' && (
                <Pressable
                    accessibilityRole="button"
                    style={({ pressed }) => [
                        dynamicStyles.buttonAccent,
                        pressed && dynamicStyles.buttonPressed,
                    ]}
                    onPress={() => setAttempt((prev) => prev + 1)}
                    disabled={busy}
                >
                    <Text style={dynamicStyles.buttonAccentText}>Повторити читання</Text>
                </Pressable>
            )}

            {!ready && notice === '' && (
                <View style={dynamicStyles.loaderContainer}>
                    <ActivityIndicator size="large" color={colors.accent} />
                    <Text style={dynamicStyles.loadingText}>Завантаження...</Text>
                </View>
            )}

            {ready && (
                <View style={dynamicStyles.form}>
                    {keys.map((key) => (
                        <View key={key} style={dynamicStyles.row}>
                            <Text style={dynamicStyles.label}>{labels[key]}</Text>
                            <Switch
                                value={draft[key]}
                                onValueChange={(val) => setDraft({ ...draft, [key]: val })}
                                trackColor={{ false: colors.border, true: colors.accent }}
                                thumbColor={colors.surface}
                            />
                        </View>
                    ))}

                    <View style={dynamicStyles.summaryBox}>
                        <Text style={dynamicStyles.summaryText}>
                            Резюме: {summaryText}
                        </Text>
                    </View>

                    <View style={dynamicStyles.actions}>
                        <Pressable
                            accessibilityRole="button"
                            style={({ pressed }) => [
                                busy ? dynamicStyles.buttonDisabled : dynamicStyles.buttonAccent,
                                pressed && !busy && dynamicStyles.buttonPressed,
                            ]}
                            onPress={handleSave}
                            disabled={busy}
                        >
                            <Text style={dynamicStyles.buttonAccentText}>
                                {busy ? 'Збереження...' : 'Зберегти'}
                            </Text>
                        </Pressable>

                        <Pressable
                            accessibilityRole="button"
                            style={({ pressed }) => [
                                dynamicStyles.buttonOutline,
                                pressed && dynamicStyles.buttonOutlinePressed,
                            ]}
                            onPress={handleReset}
                            disabled={busy}
                        >
                            <Text style={dynamicStyles.buttonOutlineText}>
                                Скинути
                            </Text>
                        </Pressable>
                    </View>
                </View>
            )}
        </ScrollView>
    );
}

const createStyles = (colors: Palette) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        padding: 20,
        paddingBottom: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: colors.text,
    },
    form: {
        marginTop: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.border,
    },
    label: {
        fontSize: 16,
        flexShrink: 1,
        marginRight: 10,
        color: colors.text,
    },
    summaryBox: {
        marginTop: 25,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: colors.surface,
    },
    summaryText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
    },
    actions: {
        marginTop: 35,
        gap: 15,
    },
    buttonAccent: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: colors.accent,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    buttonDisabled: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: colors.border,
    },
    buttonAccentText: {
        color: colors.onAccent,
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonPressed: {
        opacity: 0.8,
    },
    buttonOutline: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.accent,
    },
    buttonOutlineText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.accent,
    },
    buttonOutlinePressed: {
        opacity: 0.5,
    },
    noticeBox: {
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        marginBottom: 20,
        backgroundColor: colors.surface,
        borderColor: colors.border,
    },
    noticeText: {
        fontSize: 14,
        textAlign: 'center',
        color: colors.text,
    },
    loaderContainer: {
        marginTop: 60,
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: colors.text,
    },
});
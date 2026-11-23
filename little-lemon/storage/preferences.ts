import AsyncStorage from '@react-native-async-storage/async-storage';

export type Preferences = {
    pushNotifications: boolean;
    emailMarketing: boolean;
    latestNews: boolean;
    showMenuHints: boolean;
};

export const defaults: Preferences = {
    pushNotifications: false,
    emailMarketing: false,
    latestNews: false,
    showMenuHints: true,
};

export const KEY = '@little-lemon/preferences/v1';

export function parsePreferences(raw: string | null): Preferences {
    if (raw === null) {
        return { ...defaults };
    }

    const value: unknown = JSON.parse(raw);

    if (
        typeof value !== 'object' ||
        value === null ||
        !('version' in value) ||
        (value as Record<string, unknown>).version !== 1 ||
        !('data' in value)
    ) {
        throw new Error('Невідомий формат налаштувань. Сховище може бути пошкоджено.');
    }

    const p = (value as Record<string, unknown>).data;

    if (
        typeof p !== 'object' ||
        p === null ||
        !('pushNotifications' in p) ||
        typeof (p as Record<string, unknown>).pushNotifications !== 'boolean' ||
        !('emailMarketing' in p) ||
        typeof (p as Record<string, unknown>).emailMarketing !== 'boolean' ||
        !('latestNews' in p) ||
        typeof (p as Record<string, unknown>).latestNews !== 'boolean'
    ) {
        throw new Error('Пошкоджені налаштування: некоректні типи базових полів.');
    }

    // Обробка раніше збереженого формату (коли showMenuHints ще не існувало).
    // Це гарантує зворотну сумісність при розширенні моделі даних (Завдання 7.1).
    const hasMenuHints =
        'showMenuHints' in p &&
        typeof (p as Record<string, unknown>).showMenuHints === 'boolean';

    return {
        pushNotifications: (p as Record<string, unknown>).pushNotifications as boolean,
        emailMarketing: (p as Record<string, unknown>).emailMarketing as boolean,
        latestNews: (p as Record<string, unknown>).latestNews as boolean,
        showMenuHints: hasMenuHints
            ? ((p as Record<string, unknown>).showMenuHints as boolean)
            : defaults.showMenuHints,
    };
}

export async function readPreferences(): Promise<Preferences> {
    const rawData = await AsyncStorage.getItem(KEY);
    return parsePreferences(rawData);
}

export async function writePreferences(data: Preferences): Promise<void> {
    const payload = JSON.stringify({ version: 1, data });
    await AsyncStorage.setItem(KEY, payload);
}

export async function removePreferences(): Promise<void> {
    await AsyncStorage.removeItem(KEY);
}
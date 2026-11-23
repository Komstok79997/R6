import React, { useState, useMemo } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
    TextInput,
} from 'react-native';
import { MENU_URL } from '../api/remoteMenu';
import { useRemoteMenu } from '../hooks/useRemoteMenu';
import { useAppColors } from '../theme/useAppColors';

export default function RemoteMenuScreen() {
    const colors = useAppColors();
    const { state, reload } = useRemoteMenu(MENU_URL);
    const [searchQuery, setSearchQuery] = useState('');

    const loading = state.status === 'loading';

    // Обчислення відфільтрованого масиву без виклику нового HTTP-запиту
    const filteredData = useMemo(() => {
        if (state.status !== 'success') return [];
        const query = searchQuery.trim().toLowerCase();
        if (!query) return state.data;
        return state.data.filter(item => item.title.toLowerCase().includes(query));
    }, [state, searchQuery]);

    const itemCount = filteredData.length;

    return (
        <View style={[styles.screen, { backgroundColor: colors.background }]}>
            <Text style={[styles.heading, { color: colors.text }]}>Меню з мережі</Text>

            <Pressable
                accessibilityRole="button"
                disabled={loading}
                onPress={reload}
                style={({ pressed }) => [
                    styles.button,
                    { backgroundColor: colors.accent },
                    (pressed || loading) && styles.dimmed,
                ]}
            >
                <Text style={[styles.buttonText, { color: colors.onAccent }]}>
                    {loading ? 'Завантаження…' : state.status === 'error' ? 'Повторити' : 'Оновити'}
                </Text>
            </Pressable>

            {state.status === 'success' && (
                <View style={styles.searchContainer}>
                    <TextInput
                        style={[
                            styles.searchInput,
                            { color: colors.text, borderColor: colors.border, backgroundColor: colors.surface }
                        ]}
                        placeholder="Пошук за назвою..."
                        placeholderTextColor={colors.muted}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <Text style={[styles.countText, { color: colors.muted }]}>
                        Знайдено позицій: {itemCount}
                    </Text>
                </View>
            )}

            {state.status === 'loading' && (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color={colors.accent} />
                    <Text style={{ color: colors.text }}>Отримуємо меню…</Text>
                </View>
            )}

            {state.status === 'error' && (
                <View style={styles.center}>
                    <Text accessibilityRole="alert" style={{ color: colors.error, textAlign: 'center' }}>
                        {state.message}
                    </Text>
                    <Text style={{ color: colors.muted, textAlign: 'center', marginTop: 8 }}>
                        Перевірте з’єднання та натисніть «Повторити».
                    </Text>
                </View>
            )}

            {state.status === 'success' && (
                <FlatList
                    style={styles.list}
                    data={filteredData}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.content}
                    ListEmptyComponent={
                        <Text style={{ color: colors.text, textAlign: 'center' }}>
                            {state.data.length === 0
                                ? 'У меню поки немає позицій.' // Порожнє меню з сервера
                                : 'За цим запитом нічого не знайдено.' // Порожній результат локального пошуку
                            }
                        </Text>
                    }
                    renderItem={({ item }) => (
                        <View
                            style={[
                                styles.card,
                                { backgroundColor: colors.surface, borderColor: colors.border },
                            ]}
                        >
                            <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
                            <Text style={{ color: colors.muted }}>{item.category}</Text>
                            <Text style={{ color: colors.text }}>{item.price.toFixed(2)} ум. од.</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, paddingHorizontal: 16, paddingTop: 12 },
    heading: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
    button: { padding: 12, borderRadius: 6, alignItems: 'center', marginBottom: 12 },
    buttonText: { fontSize: 16, fontWeight: '600' },
    dimmed: { opacity: 0.6 },
    center: { flex: 1, gap: 12, alignItems: 'center', justifyContent: 'center' },
    searchContainer: { marginBottom: 12 },
    searchInput: { height: 48, borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, fontSize: 16, marginBottom: 8 },
    countText: { fontSize: 14 },
    list: { flex: 1 },
    content: { paddingVertical: 8, paddingBottom: 24 },
    card: { padding: 14, borderWidth: 1, borderRadius: 6, marginBottom: 12, gap: 6 },
    title: { fontSize: 18, fontWeight: '600' },
});
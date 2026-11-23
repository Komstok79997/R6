import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    FlatList,
    Pressable,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { useAppColors } from '../theme/useAppColors';
import type { Palette } from '../theme/palette';
import {
    addCustomer,
    deleteCustomer,
    listCustomers,
    renameCustomer,
    type Customer,
} from '../storage/customers';

export default function CustomersScreen() {
    const colors = useAppColors();
    const dynamicStyles = useMemo(() => createStyles(colors), [colors]);

    const [customers, setCustomers] = useState<Customer[]>([]);
    const [ready, setReady] = useState<boolean>(false);
    const [busy, setBusy] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [attempt, setAttempt] = useState<number>(0);

    const [draft, setDraft] = useState<string>('');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const mounted = useRef<boolean>(true);

    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);

    const fetchList = () => {
        let active = true;
        setReady(false);
        setError('');

        listCustomers()
            .then((data) => {
                if (active) {
                    setCustomers(data);
                    setReady(true);
                }
            })
            .catch((err: unknown) => {
                if (active) {
                    setError(err instanceof Error ? err.message : String(err));
                }
            });

        return () => {
            active = false;
        };
    };

    useEffect(fetchList, [attempt]);

    const handleSave = async () => {
        if (!mounted.current || busy || !ready) return;
        setBusy(true);
        setError('');

        try {
            if (editingId === null) {
                await addCustomer(draft);
            } else {
                await renameCustomer(editingId, draft);
            }
            if (mounted.current) {
                setDraft('');
                setEditingId(null);
                setAttempt(prev => prev + 1);
            }
        } catch (err: unknown) {
            if (mounted.current) {
                setError(err instanceof Error ? err.message : String(err));
            }
        } finally {
            if (mounted.current) {
                setBusy(false);
            }
        }
    };

    const handleEdit = (item: Customer) => {
        setEditingId(item.id);
        setDraft(item.name);
        setError('');
    };

    const handleCancel = () => {
        setEditingId(null);
        setDraft('');
        setError('');
    };

    const confirmDelete = (id: number, name: string) => {
        Alert.alert(
            'Підтвердження',
            `Ви дійсно хочете видалити клієнта "${name}" (ID: ${id})?`,
            [
                { text: 'Скасувати', style: 'cancel' },
                { text: 'Видалити', style: 'destructive', onPress: () => handleDelete(id) },
            ]
        );
    };

    const handleDelete = async (id: number) => {
        if (!mounted.current || busy || !ready) return;
        setBusy(true);
        setError('');

        try {
            await deleteCustomer(id);
            if (mounted.current) {
                if (editingId === id) handleCancel();
                setAttempt(prev => prev + 1);
            }
        } catch (err: unknown) {
            if (mounted.current) {
                setError(err instanceof Error ? err.message : String(err));
            }
        } finally {
            if (mounted.current) {
                setBusy(false);
            }
        }
    };

    const filteredCustomers = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return customers;
        return customers.filter(c => c.name.toLowerCase().includes(query));
    }, [customers, searchQuery]);

    return (
        <View style={dynamicStyles.container}>
            <Text style={dynamicStyles.title}>Клієнти Little Lemon</Text>

            <View style={dynamicStyles.form}>
                <TextInput
                    style={dynamicStyles.input}
                    placeholder="Ім'я клієнта"
                    placeholderTextColor={colors.muted}
                    value={draft}
                    onChangeText={setDraft}
                    maxLength={80}
                    editable={!busy}
                />

                <View style={dynamicStyles.buttonRow}>
                    <Pressable
                        accessibilityRole="button"
                        style={({ pressed }) => [
                            busy ? dynamicStyles.buttonDisabled : dynamicStyles.buttonAccent,
                            pressed && !busy && dynamicStyles.buttonPressed,
                            dynamicStyles.flexButton,
                        ]}
                        onPress={handleSave}
                        disabled={busy}
                    >
                        <Text style={dynamicStyles.buttonAccentText}>
                            {editingId === null ? 'Додати клієнта' : 'Зберегти ім\'я'}
                        </Text>
                    </Pressable>

                    {editingId !== null && (
                        <Pressable
                            accessibilityRole="button"
                            style={({ pressed }) => [
                                dynamicStyles.buttonOutline,
                                pressed && dynamicStyles.buttonOutlinePressed,
                            ]}
                            onPress={handleCancel}
                            disabled={busy}
                        >
                            <Text style={dynamicStyles.buttonOutlineText}>Скасувати</Text>
                        </Pressable>
                    )}
                </View>
            </View>

            {error !== '' && (
                <View style={dynamicStyles.noticeBox}>
                    <Text style={dynamicStyles.errorText}>{error}</Text>
                    {!ready && (
                        <Pressable
                            accessibilityRole="button"
                            style={({ pressed }) => [
                                dynamicStyles.buttonOutline,
                                pressed && dynamicStyles.buttonOutlinePressed,
                                { marginTop: 12 }
                            ]}
                            onPress={() => setAttempt(prev => prev + 1)}
                            disabled={busy}
                        >
                            <Text style={dynamicStyles.buttonOutlineText}>Оновити список</Text>
                        </Pressable>
                    )}
                </View>
            )}

            {ready && (
                <>
                    <TextInput
                        style={dynamicStyles.searchInput}
                        placeholder="Пошук клієнтів за іменем..."
                        placeholderTextColor={colors.muted}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <Text style={dynamicStyles.countText}>
                        Загалом клієнтів: {customers.length}. Знайдено: {filteredCustomers.length}.
                    </Text>

                    <FlatList
                        data={filteredCustomers}
                        keyExtractor={(item) => String(item.id)}
                        contentContainerStyle={dynamicStyles.listContent}
                        ListEmptyComponent={
                            <Text style={dynamicStyles.emptyText}>
                                {customers.length === 0 ? 'Клієнтів поки немає.' : 'За цим запитом нічого не знайдено.'}
                            </Text>
                        }
                        renderItem={({ item }) => (
                            <View style={dynamicStyles.card}>
                                <Text style={dynamicStyles.cardName} numberOfLines={1}>{item.name}</Text>
                                <View style={dynamicStyles.cardActions}>
                                    <Pressable
                                        accessibilityRole="button"
                                        onPress={() => handleEdit(item)}
                                        disabled={busy}
                                        style={dynamicStyles.actionButton}
                                    >
                                        <Text style={dynamicStyles.actionTextEdit}>Редагувати</Text>
                                    </Pressable>
                                    <Pressable
                                        accessibilityRole="button"
                                        onPress={() => confirmDelete(item.id, item.name)}
                                        disabled={busy}
                                        style={dynamicStyles.actionButton}
                                    >
                                        <Text style={dynamicStyles.actionTextDelete}>Видалити</Text>
                                    </Pressable>
                                </View>
                            </View>
                        )}
                    />
                </>
            )}

            {!ready && error === '' && (
                <View style={dynamicStyles.loaderContainer}>
                    <ActivityIndicator size="large" color={colors.accent} />
                    <Text style={dynamicStyles.loadingText}>Завантаження бази...</Text>
                </View>
            )}
        </View>
    );
}

const createStyles = (colors: Palette) => StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, padding: 16 },
    title: { fontSize: 24, fontWeight: 'bold', color: colors.text, marginBottom: 16, textAlign: 'center' },
    form: { marginBottom: 16, gap: 12 },
    input: {
        borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface,
        color: colors.text, padding: 12, borderRadius: 8, fontSize: 16
    },
    searchInput: {
        borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface,
        color: colors.text, padding: 10, borderRadius: 8, fontSize: 14, marginBottom: 8
    },
    buttonRow: { flexDirection: 'row', gap: 12 },
    flexButton: { flex: 1 },
    buttonAccent: { backgroundColor: colors.accent, padding: 14, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
    buttonDisabled: { backgroundColor: colors.border, padding: 14, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
    buttonAccentText: { color: colors.onAccent, fontSize: 16, fontWeight: '600' },
    buttonPressed: { opacity: 0.8 },
    buttonOutline: { borderWidth: 1, borderColor: colors.accent, padding: 14, borderRadius: 8, alignItems: 'center', backgroundColor: colors.background, justifyContent: 'center' },
    buttonOutlineText: { color: colors.accent, fontSize: 16, fontWeight: '600' },
    buttonOutlinePressed: { opacity: 0.5 },
    noticeBox: { padding: 12, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.error, borderRadius: 8, marginBottom: 16 },
    errorText: { color: colors.error, fontSize: 14, textAlign: 'center' },
    countText: { color: colors.muted, fontSize: 14, marginBottom: 8 },
    listContent: { paddingBottom: 40 },
    emptyText: { color: colors.muted, textAlign: 'center', marginTop: 24, fontSize: 16 },
    card: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, padding: 12, borderRadius: 8, marginBottom: 8 },
    cardName: { color: colors.text, fontSize: 16, flex: 1, marginRight: 8, fontWeight: '500' },
    cardActions: { flexDirection: 'row', gap: 12 },
    actionButton: { paddingVertical: 4, paddingHorizontal: 4 },
    actionTextEdit: { color: colors.text, fontSize: 14, fontWeight: 'bold' },
    actionTextDelete: { color: colors.error, fontSize: 14, fontWeight: 'bold' },
    loaderContainer: { marginTop: 40, alignItems: 'center' },
    loadingText: { color: colors.text, marginTop: 12, fontSize: 16 }
});
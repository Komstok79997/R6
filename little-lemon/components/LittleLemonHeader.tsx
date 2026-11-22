import { StyleSheet, Text, View } from 'react-native';

export function LittleLemonHeader() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Little Lemon</Text>
            <Text style={styles.subtitle}>Середземноморське сімейне бістро</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EE9972',
        paddingVertical: 16,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333333',
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333333',
        marginTop: 4,
    },
});
import { StyleSheet, Text, View } from 'react-native';

export function LittleLemonFooter() {
    const year = new Date().getFullYear();

    return (
        <View style={styles.container}>
            <Text style={styles.footerText}>© {year} Little Lemon</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EE9972',
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333333',
    },
});

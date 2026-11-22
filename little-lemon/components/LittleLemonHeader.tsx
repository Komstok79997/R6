// D:\Work\R6\little-lemon\components\LittleLemonHeader.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { Palette } from '../theme/palette';

type LittleLemonHeaderProps = {
    colors: Palette;
};

export default function LittleLemonHeader({ colors }: LittleLemonHeaderProps) {
    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: colors.surface,
                    borderBottomColor: colors.border,
                },
            ]}
        >
            <View style={styles.sideSpacer} />
            <View style={styles.titleBlock}>
                <Text style={[styles.title, { color: colors.text }]}>Little Lemon</Text>
                <Text style={[styles.subtitle, { color: colors.muted }]}>
                    Середземноморське сімейне бістро
                </Text>
            </View>
            <View style={[styles.gearBadge, { backgroundColor: colors.background }]}>
                <Text style={[styles.gearSymbol, { color: colors.muted }]}>⚙</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
    },
    sideSpacer: {
        width: 36,
    },
    titleBlock: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 2,
    },
    gearBadge: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gearSymbol: {
        fontSize: 18,
        lineHeight: 22,
    },
});
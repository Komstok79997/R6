// D:\Work\R6\little-lemon\components\LittleLemonFooter.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { Palette } from '../theme/palette';

type LittleLemonFooterProps = {
    colors: Palette;
};

export default function LittleLemonFooter({ colors }: LittleLemonFooterProps) {
    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: colors.surface,
                    borderTopColor: colors.border,
                },
            ]}
        >
            <Text style={[styles.footerText, { color: colors.text }]}>
                © 2026 Little Lemon
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
        borderTopWidth: 1,
    },
    footerText: {
        fontSize: 15,
        fontWeight: '500',
    },
});
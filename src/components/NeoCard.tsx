import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../styles/theme';

interface NeoCardProps {
    children: React.ReactNode;
    style?: ViewStyle;
    variant?: 'primary' | 'secondary' | 'accent' | 'surface';
}

export const NeoCard = ({ children, style, variant = 'surface' }: NeoCardProps) => {
    const getBackgroundColor = () => {
        switch (variant) {
            case 'primary': return theme.colors.primary;
            case 'secondary': return theme.colors.secondary;
            case 'accent': return theme.colors.accent;
            default: return theme.colors.surface;
        }
    };

    return (
        <View style={[styles.card, { backgroundColor: getBackgroundColor() }, style]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderWidth: theme.neo.borderWidth,
        borderColor: theme.colors.border,
        borderRadius: theme.borderRadius.md,
        // Hard Shadow
        shadowColor: theme.colors.shadow,
        shadowOffset: theme.neo.shadowOffset,
        shadowOpacity: theme.neo.shadowOpacity,
        shadowRadius: theme.neo.shadowRadius,
        elevation: theme.neo.elevation,
        marginBottom: theme.spacing.md,
    }
});

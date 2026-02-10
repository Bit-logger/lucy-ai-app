import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../styles/theme';

interface NeoButtonProps {
    title?: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    variant?: 'primary' | 'secondary' | 'accent' | 'surface' | 'info';
    children?: React.ReactNode;
    disabled?: boolean;
}

export const NeoButton = ({ title, onPress, style, textStyle, variant = 'primary', children, disabled }: NeoButtonProps) => {
    const getBackgroundColor = () => {
        if (disabled) return '#e0e0e0';
        switch (variant) {
            case 'secondary': return theme.colors.secondary;
            case 'accent': return theme.colors.accent;
            case 'surface': return theme.colors.surface;
            case 'info': return theme.colors.info;
            default: return theme.colors.primary;
        }
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            disabled={disabled}
            style={[
                styles.button,
                { backgroundColor: getBackgroundColor() },
                style
            ]}
        >
            {children ? children : (
                <Text style={[styles.text, textStyle]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderWidth: theme.neo.borderWidth,
        borderColor: theme.colors.border,
        borderRadius: theme.borderRadius.full,
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
        alignItems: 'center',
        justifyContent: 'center',
        // Hard Shadow
        shadowColor: theme.colors.shadow,
        shadowOffset: theme.neo.shadowOffset,
        shadowOpacity: theme.neo.shadowOpacity,
        shadowRadius: theme.neo.shadowRadius,
        elevation: theme.neo.elevation,
    },
    text: {
        fontWeight: 'bold',
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.text,
    }
});

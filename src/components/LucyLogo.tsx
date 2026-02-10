import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

interface LucyLogoProps {
    size?: number;
}

export const LucyLogo: React.FC<LucyLogoProps> = ({ size = 60 }) => {
    return (
        <View style={[styles.container, { width: size, height: size }]}>
            <Text style={[styles.text, { fontSize: size * 0.35 }]}>LUCY</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: theme.colors.text,
        // Neo-brutalism shadow
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 8,
    },
    text: {
        fontWeight: '900',
        color: '#000000',
        letterSpacing: -1,
    },
});

// Theme configuration for Lucy V2 (Neo-Brutalism)
export const theme = {
    colors: {
        primary: '#FF6B6B',      // Pastel Red
        secondary: '#4ECDC4',    // Pastel Teal
        accent: '#FFE66D',       // Pastel Yellow
        background: '#F4F0EB',   // Off-white / Paper
        surface: '#FFFFFF',      // White
        text: '#000000',         // Black
        textSecondary: '#333333', // Dark Gray
        border: '#000000',       // Black for borders
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
        // Neo specific
        shadow: '#000000',
    },
    typography: {
        fontFamily: {
            regular: 'System',
            bold: 'System',
        },
        fontSize: {
            xs: 12,
            sm: 14,
            md: 16,
            lg: 18,
            xl: 20,
            xxl: 24,
            xxxl: 32,
        },
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
    },
    borderRadius: {
        sm: 4,     // Sharper corners
        md: 8,
        lg: 12,
        full: 9999,
    },
    // Neo-Brutalist helpers
    neo: {
        borderWidth: 2,
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 4, // For Android (approximate)
    }
};

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform, Clipboard } from 'react-native';
import { theme } from '../styles/theme';
import { Copy } from 'lucide-react-native';

interface MarkdownRendererProps {
    text: string;
    isUser: boolean;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ text, isUser }) => {
    const copyToClipboard = (code: string) => {
        Clipboard.setString(code);
        Alert.alert('Copied!', 'Code copied to clipboard');
    };

    const parseMarkdown = (content: string) => {
        const elements: JSX.Element[] = [];
        const lines = content.split('\n');
        let inCodeBlock = false;
        let codeContent = '';
        let codeLanguage = '';
        let key = 0;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            // Code block detection
            if (line.startsWith('```')) {
                if (!inCodeBlock) {
                    // Start of code block
                    inCodeBlock = true;
                    codeLanguage = line.slice(3).trim();
                    codeContent = '';
                } else {
                    // End of code block
                    inCodeBlock = false;
                    elements.push(
                        <View key={key++} style={styles.codeBlockContainer}>
                            <View style={styles.codeHeader}>
                                <Text style={styles.codeLanguage}>{codeLanguage || 'code'}</Text>
                                <TouchableOpacity
                                    onPress={() => copyToClipboard(codeContent)}
                                    style={styles.copyButton}
                                >
                                    <Copy size={16} color={theme.colors.textSecondary} />
                                    <Text style={styles.copyText}>Copy</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.codeBlock}>
                                <Text style={styles.codeText}>{codeContent}</Text>
                            </View>
                        </View>
                    );
                    codeContent = '';
                    codeLanguage = '';
                }
                continue;
            }

            if (inCodeBlock) {
                codeContent += line + '\n';
                continue;
            }

            // Bold headings (lines starting with ## or **text**)
            if (line.startsWith('##')) {
                const heading = line.replace(/^#+\s*/, '');
                elements.push(
                    <Text key={key++} style={styles.heading}>
                        {heading}
                    </Text>
                );
            } else if (line.includes('**')) {
                // Parse inline bold
                const parts = line.split('**');
                const textElements = parts.map((part, idx) => {
                    if (idx % 2 === 1) {
                        return <Text key={idx} style={styles.bold}>{part}</Text>;
                    }
                    return <Text key={idx}>{part}</Text>;
                });
                elements.push(
                    <Text key={key++} style={styles.paragraph}>
                        {textElements}
                    </Text>
                );
            } else if (line.trim()) {
                // Regular paragraph
                elements.push(
                    <Text key={key++} style={styles.paragraph}>
                        {line}
                    </Text>
                );
            } else {
                // Empty line for spacing
                elements.push(<View key={key++} style={styles.spacer} />);
            }
        }

        return elements;
    };

    if (isUser) {
        // User messages don't need markdown parsing
        return <Text style={styles.userText}>{text}</Text>;
    }

    return <View>{parseMarkdown(text)}</View>;
};

const styles = StyleSheet.create({
    userText: {
        fontSize: theme.typography.fontSize.md,
        lineHeight: 22,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    paragraph: {
        fontSize: theme.typography.fontSize.md,
        lineHeight: 22,
        color: theme.colors.text,
        marginBottom: 8,
    },
    heading: {
        fontSize: theme.typography.fontSize.lg,
        fontWeight: '900',
        color: theme.colors.text,
        marginTop: 8,
        marginBottom: 8,
    },
    bold: {
        fontWeight: '900',
        color: theme.colors.text,
    },
    codeBlockContainer: {
        marginVertical: 8,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 8,
        overflow: 'hidden',
    },
    codeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2D2D2D',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    codeLanguage: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#A0A0A0',
        textTransform: 'uppercase',
    },
    copyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: '#3D3D3D',
        borderRadius: 4,
    },
    copyText: {
        fontSize: 12,
        color: theme.colors.textSecondary,
        fontWeight: '600',
    },
    codeBlock: {
        backgroundColor: '#1E1E1E',
        padding: 12,
    },
    codeText: {
        fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
        fontSize: 13,
        color: '#D4D4D4',
        lineHeight: 20,
    },
    spacer: {
        height: 8,
    },
});

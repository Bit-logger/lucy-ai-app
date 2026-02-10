import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, Modal, ActivityIndicator, SafeAreaView } from 'react-native';
import { theme } from '../styles/theme';
import { Send, Settings, Key } from 'lucide-react-native';
import { GroqService } from '../services/groq';
import { useProgress } from '../context/ProgressContext';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { buildLucyContext, formatContextForPrompt } from '../utils/chatContext';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'lucy';
}


export default function ChatScreen() {
    const { streak, currentDay, examScores } = useProgress();
    const [messages, setMessages] = useState<Message[]>([
        { id: '0', text: "Hello Ricky! 👋", sender: 'lucy' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [showKeyModal, setShowKeyModal] = useState(false);
    const [apiKeyInput, setApiKeyInput] = useState('');
    const listRef = useRef<FlatList>(null);

    useEffect(() => {
        initializeApiKey();
    }, []);

    const initializeApiKey = async () => {
        const hasKey = await GroqService.hasApiKey();
        if (!hasKey) {
            setShowKeyModal(true);
        }
    };

    const saveApiKey = async () => {
        if (apiKeyInput.trim().length < 10) {
            Alert.alert("Invalid Key", "Please enter a valid Groq API Key.");
            return;
        }
        await GroqService.setApiKey(apiKeyInput.trim());
        setShowKeyModal(false);
        setApiKeyInput('');
        Alert.alert("Success", "API Key saved! Lucy is ready.");
    };

    const sendMessage = async () => {
        if (!input.trim() || loading) return;

        const userMsg: Message = { id: Date.now().toString(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        // Convert messages for Groq History
        const historyForGroq = messages.slice(1).map(m => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text
        })) as any;

        try {
            // Build rich context for Lucy
            const lucyContext = buildLucyContext(currentDay, streak, examScores);
            const contextPrompt = formatContextForPrompt(lucyContext);

            const responseText = await GroqService.generateResponse(
                userMsg.text,
                historyForGroq,
                contextPrompt  // Pass rich context string
            );

            const lucyMsg: Message = { id: (Date.now() + 1).toString(), text: responseText, sender: 'lucy' };
            setMessages(prev => [...prev, lucyMsg]);
        } catch (error) {
            const errorMsg: Message = { id: (Date.now() + 1).toString(), text: "I'm having trouble connecting to the server. Please check your API Key settings.", sender: 'lucy' };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }: { item: Message }) => (
        <View style={[styles.bubble, item.sender === 'user' ? styles.userBubble : styles.lucyBubble]}>
            <MarkdownRenderer text={item.text} isUser={item.sender === 'user'} />
        </View>
    );

    const clearChat = () => {
        Alert.alert(
            'Clear Chat',
            'Are you sure you want to delete all messages?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Clear',
                    style: 'destructive',
                    onPress: () => {
                        setMessages([{ id: '0', text: "Hello Ricky! 👋", sender: 'lucy' }]);
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
            >
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Lucy AI 🤖</Text>
                    <View style={styles.headerActions}>
                        <TouchableOpacity onPress={clearChat} style={styles.clearButton}>
                            <Text style={styles.clearText}>Clear</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setShowKeyModal(true)} style={styles.settingsButton}>
                            <Settings color={theme.colors.textSecondary} size={22} />
                        </TouchableOpacity>
                    </View>
                </View>

                <FlatList
                    ref={listRef}
                    data={messages}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.list}
                    onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
                />

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={input}
                        onChangeText={setInput}
                        placeholder={loading ? "Lucy is thinking..." : "Ask about Python, DSA, or Jobs..."}
                        placeholderTextColor={theme.colors.textSecondary}
                        editable={!loading}
                    />
                    <TouchableOpacity style={[styles.sendButton, loading && styles.disabledButton]} onPress={sendMessage} disabled={loading}>
                        {loading ? <ActivityIndicator color="#FFF" size="small" /> : <Send color="#FFF" size={20} />}
                    </TouchableOpacity>
                </View>

                {/* API Key Modal */}
                <Modal visible={showKeyModal} transparent animationType="slide">
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Key color={theme.colors.primary} size={24} />
                                <Text style={styles.modalTitle}>Enter Groq API Key</Text>
                            </View>
                            <Text style={styles.modalText}>
                                To use Lucy's AI features, you need a Groq API Key.
                                It is stored locally on your device.
                            </Text>
                            <TextInput
                                style={styles.modalInput}
                                value={apiKeyInput}
                                onChangeText={setApiKeyInput}
                                placeholder="Paste API Key here..."
                                secureTextEntry
                            />
                            <TouchableOpacity style={styles.saveButton} onPress={saveApiKey}>
                                <Text style={styles.saveButtonText}>Save Key</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setShowKeyModal(false)}>
                                <Text style={styles.closeButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing.md,
        paddingTop: theme.spacing.lg,
        backgroundColor: theme.colors.surface,
        borderBottomWidth: theme.neo.borderWidth,
        borderBottomColor: theme.colors.border,
        // Hard Shadow for header
        shadowColor: theme.colors.shadow,
        shadowOffset: theme.neo.shadowOffset,
        shadowOpacity: theme.neo.shadowOpacity,
        shadowRadius: theme.neo.shadowRadius,
        elevation: theme.neo.elevation,
        zIndex: 10,
    },
    headerTitle: {
        fontSize: theme.typography.fontSize.xl,
        fontWeight: '900',
        color: theme.colors.text,
        letterSpacing: 1,
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    clearButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: theme.colors.error,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: theme.colors.border,
    },
    clearText: {
        color: '#FFF',
        fontWeight: '700',
        fontSize: 13,
    },
    settingsButton: {
        padding: 6,
    },
    list: {
        padding: theme.spacing.md,
    },
    bubble: {
        maxWidth: '85%',
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        borderWidth: theme.neo.borderWidth,
        borderColor: theme.colors.border,
        // Hard Shadow for bubbles
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 2,
    },
    userBubble: {
        alignSelf: 'flex-end',
        backgroundColor: theme.colors.primary,
        borderRadius: 0, // Blocky
        borderBottomRightRadius: 0,
    },
    lucyBubble: {
        alignSelf: 'flex-start',
        backgroundColor: theme.colors.surface,
        borderRadius: 0, // Blocky
    },
    messageText: {
        fontSize: theme.typography.fontSize.md,
        lineHeight: 22,
        fontWeight: '500',
    },
    userText: {
        color: theme.colors.text, // Black text on Primary (Pastel Red)
        fontWeight: 'bold',
    },
    lucyText: {
        color: theme.colors.text,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: theme.spacing.md,
        backgroundColor: theme.colors.surface,
        borderTopWidth: theme.neo.borderWidth,
        borderTopColor: theme.colors.border,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: theme.colors.background,
        borderWidth: theme.neo.borderWidth,
        borderColor: theme.colors.border,
        borderRadius: theme.borderRadius.sm,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        fontSize: theme.typography.fontSize.md,
        marginRight: theme.spacing.md,
        height: 50,
        color: theme.colors.text,
        fontWeight: '600',
    },
    sendButton: {
        backgroundColor: theme.colors.secondary, // Teal
        width: 50,
        height: 50,
        borderRadius: theme.borderRadius.sm, // Square-ish
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: theme.neo.borderWidth,
        borderColor: theme.colors.border,
        // Shadow
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 2,
    },
    disabledButton: {
        opacity: 0.5,
        backgroundColor: '#ccc',
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.lg,
    },
    modalContent: {
        backgroundColor: theme.colors.surface,
        borderWidth: theme.neo.borderWidth,
        borderColor: theme.colors.border,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.xl,
        width: '100%',
        maxWidth: 400,
        elevation: 5,
        shadowColor: theme.colors.shadow,
        shadowOffset: theme.neo.shadowOffset,
        shadowOpacity: 1,
        shadowRadius: 0,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
        gap: theme.spacing.sm,
    },
    modalTitle: {
        fontSize: theme.typography.fontSize.xl,
        fontWeight: '900',
        color: theme.colors.text,
    },
    modalText: {
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.lg,
        lineHeight: 20,
        fontWeight: '500',
    },
    modalInput: {
        borderWidth: theme.neo.borderWidth,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.background,
        borderRadius: theme.borderRadius.sm,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.lg,
        fontSize: theme.typography.fontSize.md,
        fontWeight: 'bold',
    },
    saveButton: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.sm,
        alignItems: 'center',
        marginBottom: theme.spacing.md,
        borderWidth: theme.neo.borderWidth,
        borderColor: theme.colors.border,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
    },
    saveButtonText: {
        color: theme.colors.text,
        fontWeight: '900',
        fontSize: theme.typography.fontSize.md,
    },
    closeButton: {
        alignItems: 'center',
        padding: theme.spacing.sm,
    },
    closeButtonText: {
        color: theme.colors.text,
        fontSize: theme.typography.fontSize.md,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    }
});

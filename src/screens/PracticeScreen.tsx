import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import { theme } from '../styles/theme';
import { GroqService } from '../services/groq';
import { NeoButton } from '../components/NeoButton';
import { NeoCard } from '../components/NeoCard';
import { ChevronLeft, ChevronRight, CheckCircle, AlertCircle, Clock } from 'lucide-react-native';
import { curriculum } from '../data/curriculum';
import { useProgress } from '../context/ProgressContext';

interface Question {
    id: number;
    category: 'python' | 'dsa' | 'aptitude';
    question: string;
    codeSnippet?: string;
    options: string[];
    correctOptionIndex: number;
    explanation: string;
}

export default function PracticeScreen() {
    const { currentDay, advanceDay, addExamScore } = useProgress();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [reviewList, setReviewList] = useState<Set<number>>(new Set());
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [todayTopics, setTodayTopics] = useState<{ python: string, dsa: string, aptitude: string } | null>(null);

    useEffect(() => {
        loadExam();
    }, []);

    const getTopicForDay = (category: 'python' | 'dsa' | 'aptitude') => {
        const list = curriculum[category];
        // Strict day matching
        return list.find(t => t.day === currentDay) || list[list.length - 1];
    };

    const loadExam = async () => {
        setLoading(true);
        try {
            // 1. Determine Topics based on Current Day
            const pyTopic = getTopicForDay('python');
            const dsaTopic = getTopicForDay('dsa');
            const aptTopic = getTopicForDay('aptitude');

            setTodayTopics({
                python: pyTopic ? pyTopic.title : "General Python",
                dsa: dsaTopic ? dsaTopic.title : "General DSA",
                aptitude: aptTopic ? aptTopic.title : "General Aptitude"
            });

            // 2. Generate Questions
            const data = await GroqService.generateExamQuestions({
                python: pyTopic ? { title: pyTopic.title, description: pyTopic.description, tasks: pyTopic.tasks } : null,
                dsa: dsaTopic ? { title: dsaTopic.title, description: dsaTopic.description, tasks: dsaTopic.tasks } : null,
                aptitude: aptTopic ? { title: aptTopic.title, description: aptTopic.description, tasks: aptTopic.tasks } : null
            });

            if (data && data.length > 0) {
                setQuestions(data);
            } else {
                Alert.alert("Error", "Failed to generate exam. Please try again.");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Check your internet connection.");
        } finally {
            setLoading(false);
        }
    };

    const handleAnswer = (optionIndex: number) => {
        const qId = questions[currentQuestionIndex].id;
        setAnswers(prev => ({ ...prev, [qId]: optionIndex }));
    };

    const toggleMarkForReview = () => {
        const qId = questions[currentQuestionIndex].id;
        setReviewList(prev => {
            const newSet = new Set(prev);
            if (newSet.has(qId)) newSet.delete(qId);
            else newSet.add(qId);
            return newSet;
        });
    };

    const submitExam = () => {
        Alert.alert(
            "Submit Practice",
            "Are you sure you want to finish?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Submit", onPress: () => {
                        let newScore = 0;
                        questions.forEach(q => {
                            if (answers[q.id] === q.correctOptionIndex) {
                                newScore++;
                            }
                        });
                        setScore(newScore);
                        setShowResult(true);

                        // Pass Criteria: > 40% (8/20)
                        if (newScore >= 8) {
                            advanceDay();
                            Alert.alert("🎉 Day Complete!", `You've unlocked Day ${currentDay + 1}!`);
                        } else {
                            Alert.alert("Try Again", "You need at least 8 correct answers to advance.");
                        }
                    }
                }
            ]
        );
    };

    const getStatusColor = (qId: number) => {
        const isAnswered = answers[qId] !== undefined;
        const isReview = reviewList.has(qId);
        const isCurrent = questions[currentQuestionIndex]?.id === qId;

        if (isCurrent) return theme.colors.primary;
        if (isReview) return '#A855F7';
        if (isAnswered) return theme.colors.success;
        return theme.colors.surface;
    };

    const getStatusTextColor = (qId: number) => {
        const isAnswered = answers[qId] !== undefined;
        const isReview = reviewList.has(qId);
        const isCurrent = questions[currentQuestionIndex]?.id === qId;

        if (isCurrent || isReview || isAnswered) return '#FFFFFF';
        return theme.colors.text;
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text style={styles.loadingText}>Creating Your Daily Practice...</Text>
                <Text style={styles.subLoadingText}>Analyzing your progress & generating questions</Text>
            </View>
        );
    }

    if (showResult) {
        return (
            <View style={styles.container}>
                <View style={styles.resultCard}>
                    <CheckCircle size={64} color={theme.colors.success} style={{ marginBottom: 16 }} />
                    <Text style={styles.resultTitle}>Practice Complete!</Text>
                    <Text style={styles.scoreText}>Score: {score} / {questions.length}</Text>
                    <Text style={styles.feedbackText}>
                        {score >= 18 ? "Excellent! You mastered today's topics. 🌟" : "Good work! Review the mistakes provided below. 📚"}
                    </Text>

                    <NeoButton title="Start New Practice" onPress={() => {
                        setShowResult(false);
                        setAnswers({});
                        setReviewList(new Set());
                        setCurrentQuestionIndex(0);
                        loadExam();
                    }} />
                </View>
            </View>
        );
    }

    const currentQ = questions[currentQuestionIndex];

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.timerContainer}>
                        <Clock size={20} color={theme.colors.text} />
                        <Text style={styles.timerText}>Day {currentDay} Practice</Text>
                    </View>
                </View>

                {/* Main Content */}
                <ScrollView contentContainerStyle={styles.content}>

                    {/* Topic Info */}
                    {todayTopics && currentQuestionIndex === 0 && (
                        <View style={styles.topicInfo}>
                            <Text style={styles.topicLabel}>TODAY'S FOCUS:</Text>
                            <Text style={styles.topicText}>🐍 {todayTopics.python.split(':')[0]}</Text>
                            <Text style={styles.topicText}>🧩 {todayTopics.dsa.split(':')[0]}</Text>
                            <Text style={styles.topicText}>🧠 {todayTopics.aptitude.split(':')[0]}</Text>
                        </View>
                    )}

                    {/* Question Flashcard */}
                    <NeoCard style={styles.flashcard}>
                        <View style={styles.questionMeta}>
                            <Text style={styles.categoryBadge}>{currentQ.category.toUpperCase()}</Text>
                            <Text style={styles.qNum}>Question {currentQuestionIndex + 1}/{questions.length}</Text>
                        </View>

                        <Text style={styles.questionText}>{currentQ.question}</Text>

                        {currentQ.codeSnippet && (
                            <View style={styles.codeBlock}>
                                <Text style={styles.codeText}>{currentQ.codeSnippet}</Text>
                            </View>
                        )}

                        <View style={styles.optionsContainer}>
                            {currentQ.options.map((option, index) => {
                                const isSelected = answers[currentQ.id] === index;
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={[styles.optionButton, isSelected && styles.optionSelected]}
                                        onPress={() => handleAnswer(index)}
                                    >
                                        <View style={[styles.radioCircle, isSelected && styles.radioSelected]} />
                                        <Text style={styles.optionText}>{option}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </NeoCard>

                    {/* Footer Navigation Buttons */}
                    <View style={styles.navRow}>
                        <TouchableOpacity
                            disabled={currentQuestionIndex === 0}
                            onPress={() => setCurrentQuestionIndex(prev => prev - 1)}
                            style={[styles.navBtn, currentQuestionIndex === 0 && styles.disabledBtn]}
                        >
                            <ChevronLeft color={theme.colors.text} />
                            <Text style={styles.navText}>Prev</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={toggleMarkForReview} style={styles.reviewBtn}>
                            <AlertCircle size={20} color={reviewList.has(currentQ.id) ? '#A855F7' : theme.colors.text} />
                            <Text style={[styles.reviewText, reviewList.has(currentQ.id) && { color: '#A855F7' }]}>Review</Text>
                        </TouchableOpacity>

                        {currentQuestionIndex === questions.length - 1 ? (
                            <TouchableOpacity
                                onPress={submitExam}
                                style={[styles.navBtn, { backgroundColor: theme.colors.primary, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 }]}
                            >
                                <Text style={[styles.navText, { color: '#FFF' }]}>Submit</Text>
                                <CheckCircle color="#FFF" size={20} />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                onPress={() => setCurrentQuestionIndex(prev => prev + 1)}
                                style={styles.navBtn}
                            >
                                <Text style={styles.navText}>Next</Text>
                                <ChevronRight color={theme.colors.text} />
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Inline Question Palette */}
                    <View style={styles.paletteContainer}>
                        <Text style={styles.paletteTitle}>Question Palette</Text>
                        <View style={styles.gridContainer}>
                            {questions.map((q, index) => (
                                <TouchableOpacity
                                    key={q.id}
                                    style={[styles.gridItem, { backgroundColor: getStatusColor(q.id) }]}
                                    onPress={() => setCurrentQuestionIndex(index)}
                                >
                                    <Text style={[styles.gridText, { color: getStatusTextColor(q.id) }]}>{index + 1}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    container: { flex: 1, backgroundColor: theme.colors.background },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loadingText: { fontSize: 18, fontWeight: 'bold', marginTop: 16, color: theme.colors.text },
    subLoadingText: { fontSize: 14, color: theme.colors.textSecondary, marginTop: 8 },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        paddingTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        backgroundColor: theme.colors.surface
    },
    timerContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    timerText: { fontWeight: 'bold', fontSize: 16 },

    content: { padding: 16, paddingBottom: 50 },

    topicInfo: {
        marginBottom: 16,
        padding: 12,
        backgroundColor: '#E0F2FE',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#0284C7'
    },
    topicLabel: { fontWeight: 'bold', fontSize: 12, color: '#0369A1', marginBottom: 4 },
    topicText: { fontSize: 14, color: '#0C4A6E', fontWeight: '500' },

    flashcard: {
        padding: 16,
        marginBottom: 24,
    },
    questionMeta: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
    categoryBadge: {
        backgroundColor: theme.colors.secondary,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        fontWeight: 'bold',
        fontSize: 12
    },
    qNum: { color: theme.colors.textSecondary, fontWeight: '600' },

    questionText: { fontSize: 18, fontWeight: 'bold', color: theme.colors.text, marginBottom: 16, lineHeight: 26 },
    codeBlock: {
        backgroundColor: '#1E1E1E',
        padding: 16,
        borderRadius: 8,
        marginBottom: 20
    },
    codeText: { color: '#D4D4D4', fontFamily: 'monospace', fontSize: 14 },

    optionsContainer: { gap: 12 },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: theme.colors.background,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 8,
        gap: 12
    },
    optionSelected: { borderColor: theme.colors.primary, backgroundColor: '#FFF5F5' },
    radioCircle: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: theme.colors.textSecondary },
    radioSelected: { borderColor: theme.colors.primary, backgroundColor: theme.colors.primary },
    optionText: { fontSize: 16, color: theme.colors.text, flex: 1 },

    navRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 },
    navBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, padding: 8 },
    reviewBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    navText: { fontWeight: 'bold', fontSize: 16, color: theme.colors.text },
    reviewText: { fontWeight: '600', fontSize: 16, color: theme.colors.textSecondary },
    disabledBtn: { opacity: 0.3 },

    paletteContainer: { padding: 16, backgroundColor: theme.colors.surface, borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border },
    paletteTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12, color: theme.colors.textSecondary },
    gridContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center' },
    gridItem: {
        width: 40, height: 40,
        justifyContent: 'center', alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: theme.colors.border
    },
    gridText: { fontWeight: 'bold' },
    resultCard: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    resultTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
    scoreText: { fontSize: 32, fontWeight: 'bold', color: theme.colors.primary, marginBottom: 16 },
    feedbackText: { fontSize: 18, color: theme.colors.textSecondary, marginBottom: 24, textAlign: 'center' },
});

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { theme } from '../styles/theme';
import { Clock, Play, Pause, RotateCcw, CheckCircle2, BookOpen, Brain, Calculator } from 'lucide-react-native';
import { useProgress } from '../context/ProgressContext';
import { curriculum } from '../data/curriculum';
import { NeoCard } from '../components/NeoCard';

export default function ScheduleScreen() {
    const { currentDay } = useProgress();
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0 && interval) {
            clearInterval(interval);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, seconds]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setSeconds(0);
    };

    const formatTime = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Get today's topics
    const pyTopic = curriculum.python.find(t => t.day === currentDay);
    const dsaTopic = curriculum.dsa.find(t => t.day === currentDay);
    const aptTopic = curriculum.aptitude.find(t => t.day === currentDay);

    const todayTopics = [
        { id: 'py', title: 'Python', icon: <BookOpen color="#3B82F6" size={24} />, data: pyTopic },
        { id: 'dsa', title: 'DSA', icon: <Brain color="#A855F7" size={24} />, data: dsaTopic },
        { id: 'apt', title: 'Aptitude', icon: <Calculator color="#F59E0B" size={24} />, data: aptTopic },
    ];

    const getCategoryColor = (id: string) => {
        switch (id) {
            case 'py': return '#3B82F6'; // Blue
            case 'dsa': return '#A855F7'; // Purple
            case 'apt': return '#F59E0B'; // Amber
            default: return theme.colors.text;
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Day {currentDay} Focus 🎯</Text>
                <Text style={styles.subtitle}>Consistency Beats Intensity.</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>

                {/* Timer Section */}
                <NeoCard style={styles.timerCard}>
                    <Text style={styles.timerLabel}>Study Session</Text>
                    <Text style={styles.timerDisplay}>{formatTime(seconds)}</Text>

                    <View style={styles.timerControls}>
                        <TouchableOpacity style={styles.controlBtn} onPress={toggleTimer}>
                            {isActive ? <Pause size={24} color={theme.colors.text} /> : <Play size={24} color={theme.colors.text} fill={theme.colors.text} />}
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.controlBtn, styles.resetBtn]} onPress={resetTimer}>
                            <RotateCcw size={24} color={theme.colors.textSecondary} />
                        </TouchableOpacity>
                    </View>
                </NeoCard>

                {/* Topics Carousel */}
                <Text style={styles.sectionTitle}>Today's Plan (Day {currentDay})</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carousel}>
                    {todayTopics.map((item) => (
                        <NeoCard key={item.id} style={[styles.flashcard, { borderTopColor: getCategoryColor(item.id) }]}>
                            <View style={styles.cardHeader}>
                                <View style={[styles.iconBox, { backgroundColor: getCategoryColor(item.id) + '20' }]}>
                                    {item.icon}
                                </View>
                                <View style={styles.badgeContainer}>
                                    <View style={[styles.badge, { backgroundColor: getCategoryColor(item.id) }]}>
                                        <Text style={styles.badgeText}>{item.title}</Text>
                                    </View>
                                </View>
                            </View>

                            <Text style={styles.cardTitle} numberOfLines={2}>
                                {item.data?.title || "Rest / Revision"}
                            </Text>

                            <Text style={styles.cardDesc} numberOfLines={3}>
                                {item.data?.description || "No specific topics for today."}
                            </Text>

                            {item.data?.tasks && (
                                <View style={styles.miniTaskList}>
                                    <Text style={styles.miniTaskHeader}>Key Concepts:</Text>
                                    {item.data.tasks.slice(0, 3).map((task, idx) => (
                                        <View key={idx} style={styles.miniTaskItem}>
                                            <View style={[styles.dot, { backgroundColor: getCategoryColor(item.id) }]} />
                                            <Text style={styles.miniTaskText} numberOfLines={1}>{task}</Text>
                                        </View>
                                    ))}
                                    {item.data.tasks.length > 3 && (
                                        <Text style={styles.moreTasks}>+{item.data.tasks.length - 3} more</Text>
                                    )}
                                </View>
                            )}
                        </NeoCard>
                    ))}
                </ScrollView>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    header: {
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    title: { fontSize: 24, fontWeight: 'bold', color: theme.colors.text },
    subtitle: { color: theme.colors.textSecondary, marginTop: 4 },
    content: { paddingVertical: 16 },

    timerCard: { alignItems: 'center', marginHorizontal: 16, marginBottom: 24, paddingVertical: 24 },
    timerLabel: { fontSize: 16, color: theme.colors.textSecondary, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 },
    timerDisplay: { fontSize: 48, fontWeight: 'bold', fontFamily: 'monospace', color: theme.colors.primary, marginBottom: 24 },
    timerControls: { flexDirection: 'row', gap: 20 },
    controlBtn: {
        width: 56, height: 56,
        borderRadius: 28,
        backgroundColor: theme.colors.background,
        justifyContent: 'center', alignItems: 'center',
        borderWidth: 2,
        borderColor: theme.colors.border,
        elevation: 2
    },
    resetBtn: { borderColor: theme.colors.error + '40' },

    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: theme.colors.text, paddingHorizontal: 16 },

    carousel: { paddingHorizontal: 16, gap: 16, paddingBottom: 20 },
    flashcard: {
        width: 280,
        padding: 16,
        borderTopWidth: 4,
        marginRight: 4,  // small spacer 
        minHeight: 220,
        justifyContent: 'space-between'
    },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
    iconBox: { padding: 8, borderRadius: 12 },
    badgeContainer: { alignItems: 'flex-end' },
    badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
    badgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' },

    cardTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.text, marginBottom: 8 },
    cardDesc: { fontSize: 14, color: theme.colors.textSecondary, lineHeight: 20, marginBottom: 16 },

    miniTaskList: { backgroundColor: theme.colors.background, padding: 12, borderRadius: 8 },
    miniTaskHeader: { fontSize: 10, fontWeight: 'bold', color: theme.colors.textSecondary, marginBottom: 6, textTransform: 'uppercase' },
    miniTaskItem: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
    dot: { width: 6, height: 6, borderRadius: 3 },
    miniTaskText: { fontSize: 12, color: theme.colors.text },
    moreTasks: { fontSize: 10, color: theme.colors.primary, marginTop: 4, fontWeight: 'bold' }
});

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { theme } from '../styles/theme';
import { useProgress } from '../context/ProgressContext';
import { curriculum } from '../data/curriculum';
import { Calendar, BookOpen, Brain, Zap, ArrowRight } from 'lucide-react-native';
import { NeoCard } from '../components/NeoCard';
import { NeoButton } from '../components/NeoButton';

export default function DashboardScreen({ navigation }: any) {
    const { streak, currentDay } = useProgress();

    const timeOfDay = useMemo(() => {
        const hour = new Date().getHours();
        if (hour < 12) return 'MORNING';
        if (hour < 18) return 'AFTERNOON';
        return 'EVENING';
    }, []);

    // Get today's python topic for the "Mission"
    const pyTopic = curriculum.python.find(t => t.day === currentDay);
    const topicTitle = pyTopic ? pyTopic.title : "Review Previous Topics";

    const showStreakInfo = () => {
        Alert.alert(
            "🔥 Streak Power",
            "Your streak increases every day you complete your Daily Practice with a passing score!\n\nConsistency is the key to mastery. Keep the fire burning!",
            [{ text: "Got it!" }]
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.greeting}>GOOD {timeOfDay},</Text>
                    <Text style={styles.greetingName}>RICKY! 🎓</Text>
                </View>

                <TouchableOpacity onPress={showStreakInfo} activeOpacity={0.8}>
                    <NeoCard variant="accent" style={styles.streakCard}>
                        <View style={styles.streakRow}>
                            <View>
                                <Text style={styles.streakLabel}>CURRENT STREAK</Text>
                                <Text style={styles.streakCount}>{streak} 🔥</Text>
                            </View>
                            <Zap color="black" size={40} fill="black" />
                        </View>
                        <View style={styles.divider} />
                        <Text style={styles.streakMessage}>Keep the fire burning!</Text>
                    </NeoCard>
                </TouchableOpacity>

                <Text style={styles.sectionTitle}>TODAY'S MISSION (Day {currentDay})</Text>
                <View style={styles.grid}>
                    <TouchableOpacity onPress={() => navigation.navigate('Learn')} style={{ flex: 1 }}>
                        <NeoCard variant="primary" style={styles.actionCard}>
                            <BookOpen color="black" size={32} />
                            <Text style={styles.cardTitle}>LEARN</Text>
                            <Text style={styles.cardDesc}>{topicTitle}</Text>
                        </NeoCard>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Practice')} style={{ flex: 1 }}>
                        <NeoCard variant="secondary" style={styles.actionCard}>
                            <Brain color="black" size={32} />
                            <Text style={styles.cardTitle}>PRACTICE</Text>
                            <Text style={styles.cardDesc}>Daily Practice</Text>
                        </NeoCard>
                    </TouchableOpacity>
                </View>

                <NeoCard variant="surface" style={styles.quoteCard}>
                    <Text style={styles.quote}>"THE ONLY WAY TO DO GREAT WORK IS TO LOVE WHAT YOU DO."</Text>
                    <Text style={styles.author}>— STEVE JOBS</Text>
                </NeoCard>
            </ScrollView>
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
        padding: theme.spacing.md,
    },
    header: {
        marginBottom: theme.spacing.xl,
        marginTop: theme.spacing.lg,
    },
    greeting: {
        fontSize: theme.typography.fontSize.xl,
        fontWeight: '900',
        color: theme.colors.text,
        letterSpacing: 1,
    },
    greetingName: {
        fontSize: theme.typography.fontSize.xxxl,
        fontWeight: '900',
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    subtitle: {
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.textSecondary,
        fontWeight: 'bold',
    },
    streakCard: {
        padding: theme.spacing.lg,
        borderWidth: theme.neo.borderWidth,
    },
    streakRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    streakLabel: {
        fontWeight: 'bold',
        fontSize: theme.typography.fontSize.sm,
        marginBottom: theme.spacing.xs,
    },
    streakCount: {
        fontSize: theme.typography.fontSize.xxxl,
        fontWeight: '900',
    },
    divider: {
        height: 2,
        backgroundColor: 'black',
        marginVertical: theme.spacing.md,
    },
    streakMessage: {
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: theme.typography.fontSize.xl,
        fontWeight: '900',
        marginBottom: theme.spacing.md,
        marginTop: theme.spacing.md,
        color: theme.colors.text,
    },
    grid: {
        flexDirection: 'row',
        gap: theme.spacing.md,
    },
    actionCard: {
        padding: theme.spacing.lg,
        height: 160,
        justifyContent: 'space-between',
    },
    cardTitle: {
        fontSize: theme.typography.fontSize.xl,
        fontWeight: '900',
        marginTop: theme.spacing.sm,
    },
    cardDesc: {
        fontSize: theme.typography.fontSize.sm,
        fontWeight: '600',
        opacity: 0.8,
    },
    quoteCard: {
        padding: theme.spacing.lg,
        marginTop: theme.spacing.xl,
        borderLeftWidth: 6,
        borderLeftColor: theme.colors.accent,
    },
    quote: {
        fontSize: theme.typography.fontSize.md,
        fontWeight: 'bold',
        fontStyle: 'italic',
        lineHeight: 24,
    },
    author: {
        marginTop: theme.spacing.md,
        fontWeight: '900',
        alignSelf: 'flex-end',
    }
});

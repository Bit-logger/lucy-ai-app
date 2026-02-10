import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { theme } from '../styles/theme';
import { curriculum, Topic } from '../data/curriculum';
import { ChevronRight, ChevronDown, CheckSquare, Square, Book, Layers, Brain } from 'lucide-react-native';
import { NeoCard } from '../components/NeoCard';
import { NeoButton } from '../components/NeoButton';

type ModuleType = 'python' | 'dsa' | 'aptitude' | 'weeks';

export default function LearnScreen() {
    const [activeModule, setActiveModule] = useState<ModuleType>('python');
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

    const toggleExpand = (id: string) => {
        setExpandedId(prev => prev === id ? null : id);
    };

    const toggleTask = (taskId: string) => {
        setCompletedTasks(prev => ({
            ...prev,
            [taskId]: !prev[taskId]
        }));
    };

    const renderItem = ({ item }: { item: Topic }) => {
        const isExpanded = expandedId === item.id;
        const tasks = item.tasks || []; // Fallback if tasks haven't been populated for all yet

        // Calculate progress for this day
        const dayTasks = tasks.map((task, idx) => `${item.id}_${idx}`);
        const completedCount = dayTasks.filter(tid => completedTasks[tid]).length;
        const totalCount = dayTasks.length;
        const isComplete = totalCount > 0 && completedCount === totalCount;

        return (
            <TouchableOpacity onPress={() => toggleExpand(item.id)} activeOpacity={0.9}>
                <NeoCard variant={isComplete ? 'success' : 'surface'} style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={styles.headerLeft}>
                            <View style={[styles.dayBadge, isComplete && styles.completedBadge]}>
                                <Text style={styles.dayText}>
                                    {activeModule === 'weeks' ? `WEEK ${item.day}` : `DAY ${item.day}`}
                                </Text>
                            </View>
                            <View style={styles.titleContainer}>
                                <Text style={styles.topicTitle}>{item.title}</Text>
                                <Text style={styles.progressText}>
                                    {totalCount > 0 ? `${completedCount}/${totalCount} Done` : 'View Details'}
                                </Text>
                            </View>
                        </View>
                        {isExpanded ? <ChevronDown color="black" /> : <ChevronRight color="black" />}
                    </View>

                    {isExpanded && (
                        <View style={styles.taskList}>
                            <Text style={styles.descText}>{item.description}</Text>
                            <View style={styles.divider} />
                            {tasks.length > 0 ? (
                                tasks.map((task, index) => {
                                    const taskId = `${item.id}_${index}`;
                                    const isChecked = completedTasks[taskId];
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            style={styles.taskItem}
                                            onPress={() => toggleTask(taskId)}
                                        >
                                            {isChecked ?
                                                <CheckSquare color={theme.colors.success} fill="black" size={20} /> :
                                                <Square color="black" size={20} />
                                            }
                                            <Text style={[styles.taskText, isChecked && styles.taskTextDone]}>
                                                {task}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })
                            ) : (
                                <Text style={styles.emptyText}>No checklist available.</Text>
                            )}
                        </View>
                    )}
                </NeoCard>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>CURRICULUM 🗺️</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabs}>
                    <NeoButton
                        title="PYTHON"
                        onPress={() => setActiveModule('python')}
                        variant={activeModule === 'python' ? 'primary' : 'surface'}
                        style={styles.tabBtn}
                        textStyle={styles.tabText}
                    />
                    <NeoButton
                        title="DSA"
                        onPress={() => setActiveModule('dsa')}
                        variant={activeModule === 'dsa' ? 'secondary' : 'surface'}
                        style={styles.tabBtn}
                        textStyle={styles.tabText}
                    />
                    <NeoButton
                        title="APTITUDE"
                        onPress={() => setActiveModule('aptitude')}
                        variant={activeModule === 'aptitude' ? 'accent' : 'surface'}
                        style={styles.tabBtn}
                        textStyle={styles.tabText}
                    />
                    <NeoButton
                        title="WEEKS"
                        onPress={() => setActiveModule('weeks')}
                        variant={activeModule === 'weeks' ? 'info' : 'surface'}
                        style={styles.tabBtn}
                        textStyle={styles.tabText}
                    />
                </ScrollView>
            </View>

            <FlatList
                data={curriculum[activeModule]}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        padding: theme.spacing.md,
        backgroundColor: theme.colors.surface,
        borderBottomWidth: theme.neo.borderWidth,
        borderBottomColor: theme.colors.border,
        paddingTop: theme.spacing.lg,
    },
    headerTitle: {
        fontSize: theme.typography.fontSize.xxl,
        fontWeight: '900',
        marginBottom: theme.spacing.md,
        color: theme.colors.text,
    },
    tabs: {
        flexDirection: 'row',
        gap: theme.spacing.sm,
        paddingBottom: theme.spacing.xs,
    },
    tabBtn: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        minWidth: 100,
    },
    tabText: {
        fontSize: theme.typography.fontSize.sm,
    },
    list: {
        padding: theme.spacing.md,
    },
    card: {
        padding: 0, // Reset default padding
    },
    cardHeader: {
        padding: theme.spacing.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    dayBadge: {
        backgroundColor: 'black',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
        marginRight: theme.spacing.md,
    },
    completedBadge: {
        backgroundColor: theme.colors.success,
    },
    dayText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: theme.typography.fontSize.xs,
    },
    titleContainer: {
        flex: 1,
    },
    topicTitle: {
        fontSize: theme.typography.fontSize.md,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    progressText: {
        fontSize: theme.typography.fontSize.xs,
        color: theme.colors.textSecondary,
        marginTop: 2,
    },
    taskList: {
        borderTopWidth: 2,
        borderTopColor: theme.colors.border,
        padding: theme.spacing.md,
        backgroundColor: '#FAFAFA',
    },
    descText: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.md,
        fontStyle: 'italic',
    },
    divider: {
        height: 1,
        backgroundColor: theme.colors.border,
        marginBottom: theme.spacing.md,
    },
    taskItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
        gap: theme.spacing.md,
    },
    taskText: {
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.text,
        flex: 1,
    },
    taskTextDone: {
        textDecorationLine: 'line-through',
        opacity: 0.6,
    },
    emptyText: {
        fontStyle: 'italic',
        color: theme.colors.textSecondary,
    }
});

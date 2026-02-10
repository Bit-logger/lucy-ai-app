import { curriculum } from '../data/curriculum';
import type { ExamScore } from '../context/ProgressContext';

export interface LucyContext {
    currentDay: number;
    streak: number;
    todaysTopics: {
        title: string;
        description: string;
        category: string;
    }[];
    recentPerformance: {
        averageScore: number;
        lastExamScore: number | null;
        totalExamsTaken: number;
    };
    insights: string[];
}

export function buildLucyContext(
    currentDay: number,
    streak: number,
    examScores: ExamScore[]
): LucyContext {
    // Get today's topics from curriculum
    const pyTopic = curriculum.python.find(t => t.day === currentDay);
    const dsaTopic = curriculum.dsa.find(t => t.day === currentDay);
    const aptTopic = curriculum.aptitude.find(t => t.day === currentDay);

    const todaysTopics = [];
    if (pyTopic) {
        todaysTopics.push({
            title: pyTopic.title,
            description: pyTopic.description || '',
            category: 'Python'
        });
    }
    if (dsaTopic) {
        todaysTopics.push({
            title: dsaTopic.title,
            description: dsaTopic.description || '',
            category: 'DSA'
        });
    }
    if (aptTopic) {
        todaysTopics.push({
            title: aptTopic.title,
            description: aptTopic.description || '',
            category: 'Aptitude'
        });
    }

    // Calculate performance metrics
    const recentScores = examScores.slice(-7); // Last 7 exams
    const averageScore = examScores.length > 0
        ? Math.round(examScores.reduce((sum, exam) => {
            return sum + (exam.score / exam.totalQuestions) * 100;
        }, 0) / examScores.length)
        : 0;

    const lastExam = examScores[examScores.length - 1];
    const lastExamScore = lastExam
        ? Math.round((lastExam.score / lastExam.totalQuestions) * 100)
        : null;

    // Generate insights
    const insights: string[] = [];
    if (streak >= 7) {
        insights.push(`Amazing! You've maintained a ${streak}-day streak! 🔥`);
    }
    if (averageScore >= 80) {
        insights.push("You're performing excellently! Keep it up!");
    } else if (averageScore >= 60) {
        insights.push("Good progress! A bit more practice will get you to excellence.");
    } else if (examScores.length > 0) {
        insights.push("Keep practicing! Consistency is key to improvement.");
    }

    if (lastExamScore !== null && lastExamScore >= 90) {
        insights.push("Outstanding performance on your last exam!");
    }

    return {
        currentDay,
        streak,
        todaysTopics,
        recentPerformance: {
            averageScore,
            lastExamScore,
            totalExamsTaken: examScores.length
        },
        insights
    };
}

export function formatContextForPrompt(context: LucyContext): string {
    const topicsList = context.todaysTopics
        .map(t => `${t.title} (${t.category})`)
        .join(', ');

    return `
RICKY'S CURRENT PROGRESS:
- Day ${context.currentDay} of the learning journey
- Current Streak: ${context.streak} days 🔥
- Today's Topics: ${topicsList || 'Review day'}

RECENT PERFORMANCE:
- Average Score: ${context.recentPerformance.averageScore}%
- Last Exam: ${context.recentPerformance.lastExamScore !== null ? context.recentPerformance.lastExamScore + '%' : 'Not taken yet'}
- Total Exams Completed: ${context.recentPerformance.totalExamsTaken}

INSIGHTS:
${context.insights.map(i => `- ${i}`).join('\n')}

When asked about progress, analytics, or what to study, use this specific data to provide personalized insights.
Be encouraging and specific in your responses.
`.trim();
}

import React, { createContext, useState, useEffect, useContext } from 'react';
import { storage } from '../utils/storage';

export interface ExamScore {
    day: number;
    date: string;
    score: number;
    totalQuestions: number;
    topics: string[];
}

interface ProgressContextType {
    streak: number;
    currentDay: number;
    completedTasks: Record<string, boolean>;
    examScores: ExamScore[];
    markComplete: (taskId: string) => void;
    advanceDay: () => void;
    addExamScore: (score: ExamScore) => Promise<void>;
    getRecentScores: (days: number) => ExamScore[];
    getAverageScore: () => number;
    getCompletion: (day: number) => number;
}

const ProgressContext = createContext<ProgressContextType>({} as any);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [streak, setStreak] = useState(0);
    const [currentDay, setCurrentDay] = useState(1);
    const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
    const [examScores, setExamScores] = useState<ExamScore[]>([]);

    useEffect(() => {
        loadProgress();
    }, []);

    const loadProgress = async () => {
        const savedTasks = await storage.getItem('@lucy_progress');
        if (savedTasks) {
            setCompletedTasks(JSON.parse(savedTasks));
        }

        const savedDay = await storage.getItem('@lucy_current_day');
        if (savedDay) {
            setCurrentDay(parseInt(savedDay, 10));
        }

        const savedStreak = await storage.getItem('@lucy_streak');
        if (savedStreak) {
            setStreak(parseInt(savedStreak, 10));
        }

        const savedScores = await storage.getItem('@lucy_exam_scores');
        if (savedScores) {
            setExamScores(JSON.parse(savedScores));
        }
    };

    const markComplete = (taskId: string) => {
        const updated = { ...completedTasks, [taskId]: true };
        setCompletedTasks(updated);
        storage.setItem('@lucy_progress', JSON.stringify(updated));
    };

    const advanceDay = async () => {
        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split('T')[0];
        const lastPracticeDate = await storage.getItem('@lucy_last_practice_date');

        // Helper to check if dates are consecutive
        const isNextDay = (lastDate: string, currentDate: string): boolean => {
            const last = new Date(lastDate);
            const current = new Date(currentDate);
            const diffTime = current.getTime() - last.getTime();
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            return diffDays === 1;
        };

        // Check if this is a consecutive day
        const isConsecutive = lastPracticeDate ? isNextDay(lastPracticeDate, today) : false;
        const isSameDay = lastPracticeDate === today;

        // Update streak based on date logic
        if (!isSameDay) {
            let newStreak: number;
            if (isConsecutive || !lastPracticeDate) {
                // Consecutive day or first time - increment
                newStreak = streak + 1;
            } else {
                // Skipped days - reset to 1
                newStreak = 1;
            }
            setStreak(newStreak);
            await storage.setItem('@lucy_streak', newStreak.toString());
            await storage.setItem('@lucy_last_practice_date', today);
        }

        // Advance curriculum day
        const nextDay = currentDay + 1;
        setCurrentDay(nextDay);
        await storage.setItem('@lucy_current_day', nextDay.toString());
    };

    const addExamScore = async (score: ExamScore) => {
        const updated = [...examScores, score];
        setExamScores(updated);
        await storage.setItem('@lucy_exam_scores', JSON.stringify(updated));
    };

    const getRecentScores = (days: number): ExamScore[] => {
        return examScores.slice(-days);
    };

    const getAverageScore = (): number => {
        if (examScores.length === 0) return 0;
        const total = examScores.reduce((sum: number, exam: ExamScore) => {
            const percentage = (exam.score / exam.totalQuestions) * 100;
            return sum + percentage;
        }, 0);
        return Math.round(total / examScores.length);
    };

    const getCompletion = (day: number) => {
        // Logic to calculate % based on day's tasks
        return 0;
    };

    return (
        <ProgressContext.Provider value={{
            streak,
            currentDay,
            completedTasks,
            examScores,
            markComplete,
            advanceDay,
            addExamScore,
            getRecentScores,
            getAverageScore,
            getCompletion
        }}>
            {children}
        </ProgressContext.Provider>
    );
};

export const useProgress = () => useContext(ProgressContext);

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProgressProvider } from './src/context/ProgressContext';
import { theme } from './src/styles/theme';
import { Home, BookOpen, Brain, MessageSquare, Calendar } from 'lucide-react-native';

// Screens
import DashboardScreen from './src/screens/DashboardScreen';
import ScheduleScreen from './src/screens/ScheduleScreen';
import LearnScreen from './src/screens/LearnScreen';
import PracticeScreen from './src/screens/PracticeScreen';
import ChatScreen from './src/screens/ChatScreen';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <ProgressProvider>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={{
                        headerShown: false,
                        tabBarActiveTintColor: theme.colors.primary,
                        tabBarInactiveTintColor: theme.colors.textSecondary,
                        tabBarStyle: {
                            borderTopColor: theme.colors.border,
                            backgroundColor: theme.colors.surface,
                            height: 60,
                            paddingBottom: 8,
                            paddingTop: 8,
                        },
                        tabBarLabelStyle: {
                            fontWeight: 'bold', // Use string literal for safety
                            fontSize: 12,
                        }
                    }}
                >
                    <Tab.Screen
                        name="Dashboard"
                        component={DashboardScreen}
                        options={{
                            tabBarIcon: ({ color }) => <Home color={color} size={24} />,
                            tabBarLabel: 'Home'
                        }}
                    />
                    <Tab.Screen
                        name="Learn"
                        component={LearnScreen}
                        options={{
                            tabBarIcon: ({ color }) => <BookOpen color={color} size={24} />,
                            tabBarLabel: 'Learn'
                        }}
                    />
                    <Tab.Screen
                        name="Schedule"
                        component={ScheduleScreen}
                        options={{
                            tabBarIcon: ({ color }) => <Calendar color={color} size={24} />,
                            tabBarLabel: 'Plan'
                        }}
                    />
                    <Tab.Screen
                        name="Practice"
                        component={PracticeScreen}
                        options={{
                            tabBarIcon: ({ color }) => <Brain color={color} size={24} />,
                            tabBarLabel: 'Daily'
                        }}
                    />
                    <Tab.Screen
                        name="Chat"
                        component={ChatScreen}
                        options={{
                            tabBarIcon: ({ color }) => <MessageSquare color={color} size={24} />,
                            tabBarLabel: 'Lucy AI'
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </ProgressProvider>
    );
}

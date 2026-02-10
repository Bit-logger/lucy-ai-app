import { GoogleGenerativeAI } from '@google/generative-ai';
import { storage } from '../utils/storage';

const API_KEY_STORAGE_KEY = '@lucy_gemini_key';

export const GeminiService = {
    // secure storage for API key
    async setApiKey(key: string) {
        await storage.setItem(API_KEY_STORAGE_KEY, key);
    },

    async getApiKey(): Promise<string | null> {
        return await storage.getItem(API_KEY_STORAGE_KEY);
    },

    async hasApiKey(): Promise<boolean> {
        const key = await this.getApiKey();
        return !!key;
    },

    // Main chat function
    async generateResponse(
        userMessage: string,
        chatHistory: { role: 'user' | 'model'; parts: { text: string }[] }[],
        contextData: any // User progress, current topic etc.
    ) {
        const apiKey = await this.getApiKey();
        if (!apiKey) throw new Error('API Key not found');

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        // RAG / Context Injection
        const systemPrompt = `
You are Lucy, a Senior AI Engineer at a top FAANG/MANGA company (Google/Meta). 
Your goal is to mentor the user to become a top-tier AI Engineer and secure a job offering at least 15 LPA (Lakhs Per Annum).

**User Context:**
- Current Topic: ${contextData.currentTopic || 'General AI'}
- Progress: ${contextData.progress || 'Beginner'}
- Streak: ${contextData.streak || 0} days

**Your Persona & Rules:**
1. **Professional & Strict but Encouraging**: Act like a senior mentor. Don't fluff. Focus on high-quality output.
2. **LeetCode Style**: When asked about DSA, provide optimized solutions (Time/Space Complexity) and explain like you are in a coding interview.
3. **Career Focused**: Always relate topics back to interview questions and real-world MNC applications.
4. **Adaptive Difficulty**: Increase the complexity of your explanations and questions as the user progresses. Currently, they are at stage: ${contextData.progress}.
5. **Memory**: You should reference previous topics if relevant.

**Response Structure (Markdown):**
- Use bold for key terms.
- Use code blocks for Python/Code.
- If the user is wrong, correct them constructively with examples.
`;

        const chat = model.startChat({
            history: [
                {
                    role: 'user',
                    parts: [{ text: `System Instruction: ${systemPrompt}` }]
                },
                {
                    role: 'model',
                    parts: [{ text: "Understood. I am Lucy, your Senior AI Mentor. I am ready to guide you to your 15 LPA goal." }]
                },
                ...chatHistory
            ],
        });

        try {
            const result = await chat.sendMessage(userMessage);
            const response = result.response;
            return response.text();
        } catch (error) {
            console.error("Gemini Error:", error);
            throw error;
        }
    }
};

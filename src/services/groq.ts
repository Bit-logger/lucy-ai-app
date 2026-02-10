import Groq from "groq-sdk";
import { storage } from '../utils/storage';

const API_KEY_STORAGE_KEY = '@lucy_groq_key';

export const GroqService = {
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
        chatHistory: { role: 'user' | 'assistant'; content: string }[],
        contextData: string // Rich context string from chatContext.ts
    ) {
        const apiKey = await this.getApiKey();
        if (!apiKey) throw new Error('API Key not found');

        const groq = new Groq({ apiKey, dangerouslyAllowBrowser: true }); // Need this for Expo/Web

        // RAG / Context Injection
        const systemPrompt = `
You are Lucy, Ricky's AI study mentor for learning Python, DSA, and Aptitude.

${contextData}

**Your Persona & Rules:**
1. **Professional & Encouraging**: Act like a senior mentor. Be supportive and specific.
2. **LeetCode Style**: When asked about DSA, provide optimized solutions (Time/Space Complexity).
3. **Career Focused**: Relate topics to interview questions and real-world applications.
4. **Memory**: Reference previous topics and progress when relevant.

**Response Structure (Markdown):**
- Use **bold** for key terms
- Use ## for headings
- Use code blocks for Python/Code
- If the user is wrong, correct them constructively with examples
`;

        // Construct messages array for Groq
        const messages = [
            { role: "system", content: systemPrompt },
            ...chatHistory,
            { role: "user", content: userMessage }
        ];

        try {
            const completion = await groq.chat.completions.create({
                messages: messages as any,
                model: "llama-3.3-70b-versatile", // Updated from decommissioned model
                temperature: 0.7,
                max_tokens: 1024,
            });

            return completion.choices[0]?.message?.content || "I couldn't generate a response.";
        } catch (error) {
            console.error("Groq Error:", error);
            throw error;
        }
    },

    // Generate Exam Questions
    async generateExamQuestions(topics?: {
        python: { title: string, description: string, tasks: string[] } | null,
        dsa: { title: string, description: string, tasks: string[] } | null,
        aptitude: { title: string, description: string, tasks: string[] } | null
    }): Promise<any[]> {
        const apiKey = await this.getApiKey();
        if (!apiKey) throw new Error('API Key not found');

        const groq = new Groq({ apiKey, dangerouslyAllowBrowser: true });

        const topicPrompt = topics ? `
        **STRICT TOPIC SCOPE (DO NOT DEVIATE):**
        1. **Python (${topics.python?.title || 'Basics'})**: 
           - Context: ${topics.python?.description || 'General Python'}
           - Key Concepts: ${topics.python?.tasks?.join(', ') || 'Basics'}
        
        2. **DSA (${topics.dsa?.title || 'Basics'})**: 
           - Context: ${topics.dsa?.description || 'General DSA'}
           - Key Concepts: ${topics.dsa?.tasks?.join(', ') || 'Basics'}

        3. **Aptitude (${topics.aptitude?.title || 'General'})**: 
           - Context: ${topics.aptitude?.description || 'General Logic'}
           - Key Concepts: ${topics.aptitude?.tasks?.join(', ') || 'Logic'}
        ` : '**Focus Topics:** General Interview Questions from all 3 categories.';

        const prompt = `
        Generate a **Daily Mock Exam** with exactly **20 multiple-choice questions**.
        
        ${topicPrompt}

        **CRITICAL INSTRUCTIONS:**
        - **Questions must be STRICTLY relevant** to the specific sub-topics listed above. 
        - If Day 1 is "Intro", do NOT ask about Classes or Recursion.
        - If Day 2 is "Variables", do NOT ask about Loops.
        - **Format**: STRICT JSON ARRAY.

        **Distribution:**
        - 10 Questions: Python (As per topic above)
        - 5 Questions: Data Structures (As per topic above)
        - 5 Questions: Aptitude (As per topic above)

        **Output Structure:**
        [
            {
                "id": 1,
                "category": "python",
                "question": "Question text...",
                "options": ["A", "B", "C", "D"],
                "correctOptionIndex": 0,
                "explanation": "Short explanation..."
            },
            ...
        ]
        `;

        try {
            const completion = await groq.chat.completions.create({
                messages: [
                    { role: "system", content: "You are a exam generation API. Output ONLY valid JSON." },
                    { role: "user", content: prompt }
                ],
                model: "llama-3.3-70b-versatile",
                temperature: 0.5,
                max_tokens: 3000,
            });

            const content = completion.choices[0]?.message?.content || "[]";

            // Extract JSON from markdown code blocks if present
            const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/```\s*([\s\S]*?)\s*```/);
            const jsonString = jsonMatch ? jsonMatch[1] : content;

            try {
                return JSON.parse(jsonString);
            } catch (e) {
                console.error("Failed to parse Exam JSON. Raw content:", content);
                throw new Error("Invalid JSON format from AI");
            }
        } catch (error) {
            console.error("Groq Exam Gen Error:", error);
            // Fallback to simpler mock if fails
            return [];
        }
    }
};

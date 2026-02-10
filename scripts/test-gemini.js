const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = "AIzaSyDHtuyFWtOv885OqW8ckVH53PnfK3qR-nU";

async function testMultipleModels() {
    const genAI = new GoogleGenerativeAI(API_KEY);
    console.log("🔍 Probing Multiple Models...");

    const candidates = [
        "gemini-1.5-flash",
        "gemini-1.5-flash-latest",
        "gemini-1.5-pro",
        "gemini-1.5-pro-latest",
        "gemini-pro",
        "gemini-1.0-pro"
    ];

    for (const modelName of candidates) {
        console.log(`\nTesting: [${modelName}] ...`);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Test.");
            const response = await result.response;
            console.log(`✅ SUCCESS: ${modelName} is WORKING!`);
            return; // Stop after finding one
        } catch (error) {
            let msg = error.message.split('[')[0];
            if (error.response) msg += ` (Status: ${error.response.status})`;
            console.log(`❌ FAILED: ${modelName} - ${msg}`);
        }
    }

    console.log("\n❌ ALL MODELS FAILED.");
}

testMultipleModels();

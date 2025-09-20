import { GoogleGenAI, Type } from "@google/genai";
// FIX: Added .ts extension to type imports to resolve module not found error.
import type { SafetyBriefing } from '../types';
// FIX: Added .ts extension to type imports to resolve module not found error.
import { SafetyStatus } from '../types';

const getSafetyBriefing = async (location: string): Promise<SafetyBriefing> => {
    if (!process.env.API_KEY) {
        console.error("API_KEY environment variable not set.");
        throw new Error("API key is missing. Please set the API_KEY environment variable.");
    }
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
        const prompt = `You are a travel safety AI called SafeJourney. A tourist is currently at or planning to visit '${location}'. Provide a concise, proactive safety briefing. Your response must be in JSON format. The JSON should contain: 'safetyScore' (an integer from 0 to 100, where 100 is safest), 'status' (a single word: 'Safe', 'Caution', or 'Alert'), 'summary' (a brief one-sentence summary), and 'recommendations' (an array of 3-5 short, actionable safety tips).`;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        safetyScore: { type: Type.INTEGER, description: "A safety score from 0 to 100." },
                        status: { type: Type.STRING, description: "One of: 'Safe', 'Caution', or 'Alert'." },
                        summary: { type: Type.STRING, description: "A one-sentence summary of the safety situation." },
                        recommendations: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING },
                            description: "An array of 3 to 5 actionable safety tips."
                        },
                    },
                    required: ["safetyScore", "status", "summary", "recommendations"],
                },
            },
        });
        
        const jsonText = response.text;
        const parsedData = JSON.parse(jsonText);

        // Validate the status field against our enum
        const statusValue = parsedData.status as SafetyStatus;
        if (!Object.values(SafetyStatus).includes(statusValue)) {
            throw new Error(`Invalid safety status received from API: ${parsedData.status}`);
        }
        
        return {
            ...parsedData,
            status: statusValue,
        };

    } catch (error) {
        console.error("Error fetching safety briefing from Gemini API:", error);
        throw new Error("Failed to get safety intelligence. Please check your connection or API key and try again.");
    }
};

export { getSafetyBriefing };
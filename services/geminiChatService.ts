import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

let chat: Chat | null = null;

const createChatSession = (): Chat => {
    if (!process.env.API_KEY) {
        throw new Error("API key is missing. Please set the API_KEY environment variable.");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: 'You are SafeJourney AI, a friendly and helpful travel safety assistant. Provide concise, clear, and actionable safety advice. Be reassuring and professional. Do not mention that you are an AI or language model.',
        },
    });
    return chat;
};

export const getChat = (): Chat => {
    if (!chat) {
        return createChatSession();
    }
    return chat;
}

export const sendMessage = async (message: string): Promise<AsyncGenerator<GenerateContentResponse>> => {
    const currentChat = getChat();
    try {
        const responseStream = await currentChat.sendMessageStream({ message });
        return responseStream;
    } catch (error) {
        console.error("Error sending message to Gemini API:", error);
        throw new Error("Failed to get response from AI assistant. Please try again.");
    }
};

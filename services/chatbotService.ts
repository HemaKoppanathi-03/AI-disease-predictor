import { GoogleGenAI, Chat } from "@google/genai";

const systemInstruction = `
You are an AI assistant for the 'AI Disease Risk Predictor' app. 
Your role is to answer frequently asked questions about the app's features, how to use it, and general health topics like diabetes and hypertension in a helpful and friendly manner. 
Keep your answers concise and easy to understand.
Do not provide medical advice. If a user asks for a diagnosis or treatment suggestion, you must politely decline and strongly recommend they consult a qualified healthcare professional.
Here are some example FAQs you can answer:
- "How does the disease predictor work?"
- "What kind of document can I upload for analysis?"
- "How do I export my data?"
- "What is hypertension?"
- "Can you explain Type 2 Diabetes?"
`;

export function startChatSession(): Chat {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: systemInstruction,
        },
    });
    return chat;
}

export async function sendMessage(chat: Chat, message: string): Promise<string> {
    try {
        const response = await chat.sendMessage({ message });
        return response.text;
    } catch (error) {
        console.error("Error sending message to AI:", error);
        return "Sorry, I'm having trouble connecting right now. Please try again later.";
    }
}

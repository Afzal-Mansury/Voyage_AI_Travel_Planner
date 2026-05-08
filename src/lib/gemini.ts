import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini AI SDK
const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || "dummy_key_for_build",
});

export async function generateTravelPlan(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });
    
    if (response.text) {
      return JSON.parse(response.text);
    }
    return null;
  } catch (error) {
    console.error("Error generating travel plan:", error);
    throw error;
  }
}

export async function askTravelAssistant(chatHistory: any[], newMessage: string) {
  try {
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: "You are VoyageAI, a helpful and enthusiastic travel assistant. Give short and engaging answers about travel.",
      }
    });
    
    // Simplistic handling for MVP, proper chat history would require passing history in
    const response = await chat.sendMessage({ message: newMessage });
    return response.text;
  } catch (error) {
    console.error("Error in chat assistant:", error);
    throw error;
  }
}

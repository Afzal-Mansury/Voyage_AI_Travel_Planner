"use server";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || "dummy",
});

export async function askGeminiAssistant(messages: { role: string; content: string }[], userMessage: string) {
  try {
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: "You are YatraVerse AI, an enthusiastic and expert travel assistant specializing in Incredible India. Provide short, highly engaging, and accurate answers about travel, food, culture, trains, and flights in India. Use emojis. Keep responses under 4 sentences.",
      }
    });

    // Send history (skip the first system message if it exists)
    for (const msg of messages) {
      if (msg.role === "user") {
        await chat.sendMessage({ message: msg.content });
      } else if (msg.role === "assistant" && msg.content.length > 0 && !msg.content.includes("Namaste!")) {
        // We can't strictly inject assistant responses easily in this simple chat.sendMessage loop,
        // but for a hackathon MVP, just sending the latest message or the whole stringified history is fine.
      }
    }

    const response = await chat.sendMessage({ message: userMessage });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm experiencing heavy traffic right now, please try again in a moment! 🙏";
  }
}

export async function generateAIItinerary(formData: any) {
  try {
    const prompt = `You are YatraVerse AI, an expert travel planner. Create a detailed travel itinerary for India.
Destination: ${formData.destination}
Start Date: ${formData.startDate}
End Date: ${formData.endDate}
Budget: ${formData.budget}
Interests: ${formData.interests}
Travel Style: ${formData.style}

Return ONLY a pure JSON object (no markdown formatting, no \`\`\`json block).
The JSON MUST perfectly match this exact structure:
{
  "weather": "e.g. 25°C (77°F)",
  "days": [
    {
      "day": 1,
      "title": "Short title for the day",
      "color": "Choose a hex color like #FF9933 or #60a5fa",
      "events": [
        {
          "time": "10:00 AM",
          "icon": "One of these strings exactly: Coffee, Camera, Sun, CloudSun, Utensils, MapPin",
          "color": "Choose a tailwind bg class like bg-orange-500, bg-blue-500, bg-green-500",
          "title": "Activity name",
          "desc": "2 sentence detailed description",
          "cost": "Cost in INR e.g. ₹500 or Free"
        }
      ]
    }
  ],
  "food": [
    {
      "name": "Local Dish Name",
      "type": "e.g. 🍴 Local Special or ☕ Must Try",
      "desc": "Short description of the dish",
      "veg": true or false boolean
    }
  ],
  "localTips": [
    {
      "emoji": "emoji icon",
      "type": "tip, warn, phrase, or culture",
      "text": "The tip itself"
    }
  ],
  "packingList": ["item 1", "item 2", "item 3", "item 4", "item 5"]
}

Rules:
1. Generate exactly 3 days in the days array (Day 1, 2, 3), regardless of the start/end date difference. (If the trip is longer, the UI will add a + icon, but just generate the first 3 core days).
2. Each day must have exactly 3 events.
3. Generate exactly 4 food items.
4. Generate exactly 4 localTips.
5. All costs should reflect the requested budget: ${formData.budget}.
6. OUTPUT ONLY VALID JSON. Do not wrap in markdown quotes.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    return response.text;
  } catch (error) {
    console.error("Error generating itinerary:", error);
    return null;
  }
}

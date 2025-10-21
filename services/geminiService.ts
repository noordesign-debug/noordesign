
import { GoogleGenAI } from "@google/genai";

const getApiKey = (): string => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable not set");
  }
  return apiKey;
};

export const getMotivationalQuote = async (): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Generate a short, powerful motivational quote for someone working hard to achieve their financial goals. Make it concise and impactful, under 20 words.',
    });

    const text = response.text;
    if (text) {
      return text.trim().replace(/^"|"$/g, ''); // Remove quotes if present
    }
    throw new Error("Received an empty response from Gemini API.");
  } catch (error) {
    console.error("Error fetching from Gemini API:", error);
    throw error;
  }
};

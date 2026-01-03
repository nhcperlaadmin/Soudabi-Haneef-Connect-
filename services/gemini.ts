
import { GoogleGenAI } from "@google/genai";

// Fix: Strictly follow SDK guidelines for initializing GoogleGenAI using process.env.API_KEY directly
export const getGeminiResponse = async (userPrompt: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: `You are 'Ward Mitra', a helpful AI assistant for the Bengapadavu Ward (Ward 17) of Enmakaje Grama Panchayath in Kerala. 
        Your goal is to help citizens understand government schemes, ward activities, and how to contact local authorities.
        Be polite, concise, and helpful. If you don't know something, suggest they contact the Ward Member directly.
        Focus on Kerala specific schemes like LIFE Mission, Kudumbashree, and MGNREGS.`,
        temperature: 0.7,
      },
    });

    // Fix: Access response.text property directly as per guidelines
    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I'm having trouble processing that right now. Please try again or contact the ward office.";
  }
};

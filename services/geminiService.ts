
import { GoogleGenAI } from '@google/genai';
import { GAME_RULES_PROMPT } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY, vertexai: true });

function fileToGenerativePart(base64: string, mimeType: string) {
  return {
    inlineData: {
      data: base64.split(',')[1],
      mimeType
    },
  };
}

export async function getGameSuggestion(imageDataUrl: string): Promise<string> {
  const imagePart = fileToGenerativePart(imageDataUrl, 'image/jpeg');

  const textPart = {
    text: GAME_RULES_PROMPT,
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        role: 'user',
        parts: [textPart, imagePart]
      },
      config: {
        temperature: 0.2,
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("The request to the AI service failed. This might be due to an invalid API key or network issues.");
  }
}

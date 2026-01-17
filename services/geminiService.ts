
import { GoogleGenAI } from 'https://esm.sh/@google/genai@1.20.0';
import { GAME_RULES_PROMPT } from '../constants';

// A singleton promise to ensure the API key is fetched only once.
let apiKeyPromise: Promise<string> | null = null;

async function getApiKey(): Promise<string> {
  if (apiKeyPromise) {
    return apiKeyPromise;
  }
  apiKeyPromise = (async () => {
    try {
      const response = await fetch('/api/get-key');
      if (!response.ok) {
        throw new Error(`Failed to fetch API key: ${response.statusText}`);
      }
      const { apiKey } = await response.json();
      if (!apiKey) {
        throw new Error("API key not found in server response.");
      }
      return apiKey;
    } catch (error) {
      console.error("Could not get API key:", error);
      // Invalidate the promise on failure to allow retries
      apiKeyPromise = null; 
      throw error;
    }
  })();
  return apiKeyPromise;
}


function fileToGenerativePart(base64: string, mimeType: string) {
  return {
    inlineData: {
      data: base64.split(',')[1],
      mimeType
    },
  };
}

export async function getGameSuggestion(imageDataUrl: string): Promise<string> {
  try {
    const apiKey = await getApiKey();
    const ai = new GoogleGenAI({ apiKey, vertexai: true });

    const imagePart = fileToGenerativePart(imageDataUrl, 'image/jpeg');
    const textPart = {
      text: GAME_RULES_PROMPT,
    };

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
    throw new Error("The request to the AI service failed. This might be due to an invalid API key or a server-side issue. Check the Vercel logs.");
  }
}

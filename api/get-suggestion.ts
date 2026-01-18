
const GAME_RULES_PROMPT = `You are an expert on the board game "Sleeping Queens 2: The Rescue of the Kings". I have provided an image of a player's hand of cards. Your task is to analyze the cards and suggest the best possible moves. Your response must be in Markdown.`;

export default async function handler(request, response) {
  // Ensure the request is a POST request
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // 1. Get the image data and API key
    const { image } = request.body;
    if (!image) {
      return response.status(400).json({ error: 'Image data is required.' });
    }

    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        return response.status(500).json({ error: 'API_KEY environment variable is not set on the server.' });
    }

    // 2. DEFINITIVE FIX: Use the 'gemini-2.5-flash' model which is confirmed to be on the user's free tier.
    const model = 'gemini-2.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const requestBody = {
      contents: [
        {
          parts: [
            { text: GAME_RULES_PROMPT },
            {
              inline_data: {
                mime_type: 'image/jpeg',
                data: image,
              },
            },
          ],
        },
      ],
    };

    // 3. Make the direct fetch call to the Google AI REST API
    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    // 4. Handle the response from the API
    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      console.error('Google AI API Error:', errorData);
      return response.status(apiResponse.status).json({ error: `Google AI API Error: ${errorData.error.message}` });
    }

    const responseData = await apiResponse.json();
    
    // 5. Extract the text and send it back to the frontend
    const suggestion = responseData.candidates?.[0]?.content?.parts?.[0]?.text || "The AI model returned a valid but empty response. Please try again with a clearer picture.";

    response.status(200).json({ suggestion });

  } catch (error) {
    console.error('Internal Server Error:', error);
    response.status(500).json({ error: 'Failed to get suggestion due to an internal server error.' });
  }
}


const GAME_RULES_PROMPT = `You are an expert on the board game "Sleeping Queens 2: The Rescue of the Kings". I have provided an image of a player's hand of cards. Your task is to analyze the cards and suggest the best possible moves. Your response must be in Markdown.`;

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { image } = request.body;
    if (!image) {
      return response.status(400).json({ error: 'Image data is required.' });
    }

    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        return response.status(500).json({ error: 'API_KEY environment variable is not set on the server.' });
    }

    // Use the correct model for multimodal input with the public Google AI API
    const model = 'gemini-pro-vision';
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

    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      console.error('Google AI API Error:', errorData);
      return response.status(apiResponse.status).json({ error: `Google AI API Error: ${errorData.error.message}` });
    }

    const responseData = await apiResponse.json();
    const suggestion = responseData.candidates[0].content.parts[0].text;

    response.status(200).json({ suggestion });

  } catch (error) {
    console.error('Internal Server Error:', error);
    response.status(500).json({ error: 'Failed to get suggestion due to an internal server error.' });
  }
}

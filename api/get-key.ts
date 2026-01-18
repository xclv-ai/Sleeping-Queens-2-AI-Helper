
// This file should be placed in the `api` directory.
// e.g., `api/get-key.ts`

// By removing the edge runtime config, this now defaults to Vercel's standard
// Node.js serverless environment, where `process.env` is always available.

export default function handler(request, response) {
  try {
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      // Use the response object to send status and JSON
      response.status(500).json({ error: 'API_KEY environment variable is not set on the server.' });
      return;
    }

    response.status(200).json({ apiKey: apiKey });
  } catch (error) {
    response.status(500).json({ error: 'An internal server error occurred.' });
  }
}

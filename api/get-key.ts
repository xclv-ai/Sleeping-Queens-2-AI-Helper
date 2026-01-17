
// This file should be placed in the `api` directory.
// e.g., `api/get-key.ts`

// Vercel automatically treats files in the /api directory as serverless functions.
// This function will run on a server, not in the user's browser.

export const config = {
  runtime: 'edge',
};

export default function handler(request: Request) {
  try {
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API_KEY environment variable is not set on the server.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ apiKey: apiKey }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'An internal server error occurred.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

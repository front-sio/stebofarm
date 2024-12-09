// next-auth.d.ts
import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

// api.ts
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000'; // Fallback to localhost in development
import { getSession } from 'next-auth/react';

/**
 * Utility function to make API requests using Fetch API
 * @param endpoint - API endpoint (relative to BASE_URL)
 * @param options - Fetch options such as method, headers, body, etc.
 * @returns JSON-parsed response or throws an error
 */


export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  const url = `${BASE_URL}${endpoint}`;

  // Get the session to retrieve the accessToken
  const session = await getSession();
  console.log('Session:', session); // Log session to debug
  console.log(session);
  const accessToken = session?.accessToken;

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // If accessToken is available, include it in the headers
  if (accessToken) {
    defaultHeaders['Authorization'] = `Bearer ${accessToken}`;
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorResponse = await response.text();
      let errorMessage = `Error ${response.status}: Unknown error`;

      try {
        const parsedError = JSON.parse(errorResponse);
        errorMessage = parsedError.message || errorMessage;
      } catch (e) {
        errorMessage = errorResponse;
      }

      throw new Error(errorMessage);
    }

    // Parse and return the JSON response
    return response.json();
  } catch (error: any) {
    console.error('API Fetch Error:', error);
    throw new Error(error.message || 'Network error');
  }
}

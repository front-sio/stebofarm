// src/utils/api.ts

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000"; // Fallback to localhost in development

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

  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

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
      const errorResponse = await response.text();  // Get raw response text
      let errorMessage = `Error ${response.status}: Unknown error`;

      // Attempt to parse error response if JSON
      try {
        const parsedError = JSON.parse(errorResponse);
        errorMessage = parsedError.message || errorMessage;
      } catch (e) {
        // If it's not JSON, keep the raw response text
        errorMessage = errorResponse;
      }

      throw new Error(errorMessage);
    }

    // Parse and return the JSON response
    return response.json();
  } catch (error: any) {
    // Log and re-throw the error for further handling
    console.error('API Fetch Error:', error);
    throw new Error(error.message || 'Network error');
  }
}

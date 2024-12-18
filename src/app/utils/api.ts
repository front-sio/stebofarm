const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000'; // Fallback to localhost in development

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

  // Get the accessToken from localStorage
  const accessToken = localStorage.getItem('accessToken');

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

    // Check if the response is a valid fetch response
    if (!response || !response.ok) {
      const errorResponse = await response.text(); // This ensures we handle the error response correctly.
      let errorMessage = `Error ${response.status}: Unknown error`;

      try {
        const parsedError = JSON.parse(errorResponse);
        errorMessage = parsedError.message || errorMessage;
      } catch (e) {
        errorMessage = errorResponse; // Fallback to raw error text if parsing fails
      }

      throw new Error(errorMessage);
    }

    // Ensure response is valid before calling .json()
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      // If response is not JSON, treat it as plain text or another format
      const textResponse = await response.text();
      console.warn('Response is not JSON, received:', textResponse);
      return textResponse;
    }
  } catch (error: any) {
    console.error('API Fetch Error:', error);
    throw new Error(error.message || 'Network error');
  }
}

// /src/utils/fetchWithAuth.ts

/**
 * Utility function to fetch data with authentication from local storage
 * @param endpoint - API endpoint
 * @returns JSON response with authentication
 */
export async function fetchWithAuth(endpoint: string) {
  // Retrieve the access token from local storage
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    throw new Error('Not authenticated');
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
}

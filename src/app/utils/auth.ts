import { getSession } from 'next-auth/react';
import { apiFetch } from './api';

/**
 * Utility function to fetch data with authentication
 * @param endpoint - API endpoint
 * @returns JSON response with authentication
 */
export async function fetchWithAuth(endpoint: string) {
  const session = await getSession();

  if (!session || !session.user.accessToken) {
    throw new Error('Not authenticated');
  }

  const response = await apiFetch(endpoint, {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  });

  return response;
}

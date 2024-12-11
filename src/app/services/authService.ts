// src/app/services/authService.ts
import { apiFetch } from "../utils/api";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface SignInResponse {
  access_token: string;
  user: User;
}

export async function loginUser(email: string, password: string) {
  try {
    // Call your backend API for user authentication
    const response = await apiFetch('/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    // If the response status is not OK, throw an error
    if (!response.ok) {
      throw new Error('Failed to authenticate');
    }

    // Assuming the response includes user data and accessToken
    const data = await response.json();
    return {
      accessToken: data.access_token,
      user: {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
      },
    };
  } catch (error: any) {
    console.error('Login failed:', error);
    throw error;  // Re-throw to be handled by component
  }
}

import { apiFetch } from "../utils/api";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface SignInResponse {
  access_token: string;
  user: User; // Ensure user is defined in the response
}


// services/loginService.ts
export async function loginUser(email: string, password: string) {
  try {
    // Call your backend API for user authentication
    const response = await apiFetch('/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Failed to authenticate');
    }

    // Assuming the response includes user data and accessToken
    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      accessToken: data.accessToken,
      role: data.role,
    };
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}


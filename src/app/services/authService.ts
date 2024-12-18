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
    const response = await apiFetch('/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response || !response.access_token || !response.user) {
      throw new Error('Invalid response format: missing expected fields');
    }

    localStorage.setItem('accessToken', response.access_token);
    localStorage.setItem('user', JSON.stringify(response.user));

    return {
      accessToken: response.access_token,
      user: response.user,
    };
  } catch (error: any) {
    console.error('Login failed:', error);
    throw error;
  }
}




export function isAuthenticated(): boolean {
  const accessToken = localStorage.getItem('accessToken');
  return !!accessToken;
}

export function getUser(): User | null {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}
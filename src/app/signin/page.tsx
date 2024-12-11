// src/app/components/Signin.tsx

'use client'; // Add this to make it a client-side component

import React, { useState } from 'react';
import { loginUser } from '../services/loginService';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Call the login service
      const response = await loginUser(email, password);
      // Store the token in localStorage
      localStorage.setItem('access_token', response.accessToken);

      // Navigate to the dashboard using window.location
      window.location.href = '/dashboard'; // Use window.location for client-side navigation
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-row w-screen h-screen bg-white">
      {/* Left Side (Form Section) */}
      <div className="flex flex-col justify-center items-center w-1/2 bg-white px-12">
        <h1 className="text-4xl font-semibold text-gray-800 mb-6">Welcome Back</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>

      {/* Right Side (Image Section) */}
      <div className="w-1/2 bg-gradient-to-b from-black to-gray-900 text-white flex flex-col justify-center items-center rounded-tl-[80px] rounded-bl-[80px]">
        <div className="text-center px-12">
          <h2 className="text-3xl font-semibold">Empower Your Future</h2>
          <p className="mt-4 text-lg">Sign in to explore more opportunities</p>
        </div>
        <img
          src="/assets/images/farmer1.jpg"
          alt="Sign In"
          className="mt-6 w-3/4 h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Signin;

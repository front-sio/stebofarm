"use client"
import React, { useState } from 'react';
import { signUpBusinessOwner } from '../services/signupService';


const Signup = () => {
  const [businessName, setBusinessName] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Call the signup service
      await signUpBusinessOwner(businessName, description, email, password, phone, address);
      // Handle successful signup (e.g., redirect to another page)
      alert('Signup successful!');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <section className="signup-section text-center py-12">
        <h2 className="signup-heading text-3xl">Sign Up</h2>
        <form onSubmit={handleSubmit} className="signup-form max-w-md mx-auto mt-8">
          {error && <div className="error-message text-red-500 mb-4">{error}</div>}
          
          <input
            className="input-field w-full p-3 border rounded mb-4"
            type="text"
            placeholder="Business Name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
          />
          <textarea
            className="input-field w-full p-3 border rounded mb-4"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            className="input-field w-full p-3 border rounded mb-4"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="input-field w-full p-3 border rounded mb-4"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            className="input-field w-full p-3 border rounded mb-4"
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            className="input-field w-full p-3 border rounded mb-4"
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <button
            type="submit"
            className="submit-button bg-primary text-white w-full p-3 rounded hover:bg-secondary transition-all"
            disabled={isLoading}
          >
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </section>
    </div>
  );
};

export default Signup;

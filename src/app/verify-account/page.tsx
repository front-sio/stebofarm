"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // For navigation in Next.js

const VerifyAccountPage: React.FC = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // For routing actions
  
  // Handler for submitting the verification code
  const handleVerifyCode = () => {
    setLoading(true);
    // Simulate verification process
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard'); // Redirect to the dashboard after verification
    }, 1000);
  };

  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg w-[400px]">
        <h3 className="text-black text-2xl font-semibold font-['Lexend Tera'] text-center">
          Verify Your Account
        </h3>
        <p className="text-neutral-700 text-sm text-center mt-2">
          Enter the verification code sent to your email or phone
        </p>
        
        <div className="mt-6">
          <input 
            type="text" 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Verification Code"
            className="border p-3 rounded mb-4 w-full"
          />
          <div className="mt-4">
            <button 
              onClick={handleVerifyCode}
              className="bg-yellow-400 text-neutral-700 rounded-[15px] w-full h-[50px]"
            >
              {loading ? 'Verifying...' : 'Verify Now'}
            </button>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-neutral-500">
            Didn't receive the code? 
            <a href="#" className="text-yellow-400">Resend Code</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccountPage;

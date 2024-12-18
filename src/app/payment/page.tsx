// payment/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Payment: React.FC = () => {
  const router = useRouter();
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Payment details:", paymentDetails);
    router.push("/order-complete"); // Redirect to order completion page
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Payment</h1>
      <form onSubmit={handlePaymentSubmit} className="space-y-4">
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={paymentDetails.cardNumber}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="cardExpiry" className="block text-sm font-medium">Expiry Date</label>
            <input
              type="text"
              id="cardExpiry"
              name="cardExpiry"
              value={paymentDetails.cardExpiry}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="cardCVV" className="block text-sm font-medium">CVV</label>
            <input
              type="text"
              id="cardCVV"
              name="cardCVV"
              value={paymentDetails.cardCVV}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded font-medium"
        >
          Complete Payment
        </button>
      </form>
    </div>
  );
};

export default Payment;

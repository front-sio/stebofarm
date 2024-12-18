// order-complete/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";

const OrderComplete: React.FC = () => {
  const router = useRouter();

  const handleContinueShopping = () => {
    router.push("/market"); // Redirect to homepage
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Complete</h1>
      <p className="mb-4">Thank you for your purchase! Your order has been placed successfully.</p>
      <button
        onClick={handleContinueShopping}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded font-medium"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderComplete;

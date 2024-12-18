// order-summary/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";

const OrderSummary: React.FC = () => {
  const router = useRouter();
  const orderDetails = {
    items: [
      { productName: "Product 1", quantity: 2, price: 30 },
      { productName: "Product 2", quantity: 1, price: 50 },
    ],
    totalPrice: 110,
  };

  const handlePlaceOrder = () => {
    // Here, you could make an API call to finalize the order
    console.log("Order confirmed:", orderDetails);
    router.push("/payment"); // Redirect to payment page
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Summary</h1>
      <div>
        {orderDetails.items.map((item, index) => (
          <div key={index} className="flex justify-between mb-2">
            <span>{item.productName}</span>
            <span>{item.quantity} x ${item.price}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${orderDetails.totalPrice}</span>
        </div>
      </div>
      <button
        onClick={handlePlaceOrder}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded font-medium mt-4"
      >
        Confirm Order
      </button>
    </div>
  );
};

export default OrderSummary;

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Market from "../market/page";

// Interface Definitions
interface Product {
  id: number;
  image: string;
  title: string;
  discountedPrice: string;
}

interface CartItem extends Product {
  quantity: number;
}

const CartSidebar: React.FC<{ cartItems: CartItem[]; onClose: () => void; onCheckout: () => void }> = ({ cartItems, onClose, onCheckout }) => (
  <div className="fixed right-0 top-0 w-[300px] h-full bg-white shadow-lg p-4">
    <button onClick={onClose} className="text-xl mb-4">Close</button>
    <h2 className="text-lg font-bold mb-4">Cart</h2>
    {cartItems.length === 0 ? (
      <p>Your cart is empty.</p>
    ) : (
      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li key={item.id} className="flex justify-between items-center">
            <span>{item.title} (x{item.quantity})</span>
            <span>{item.discountedPrice}</span>
          </li>
        ))}
      </ul>
    )}
    <button
      className="mt-4 py-2 px-4 bg-green-500 text-white rounded"
      onClick={onCheckout}
    >
      Proceed to Checkout
    </button>
  </div>
);

const CartIcon: React.FC<{ cartItems: CartItem[]; onClick: () => void }> = ({ cartItems, onClick }) => (
  <div className="fixed bottom-5 right-5 p-3 bg-blue-500 text-white rounded-full cursor-pointer" onClick={onClick}>
    🛒 {cartItems.length}
  </div>
);

const MarketWithCart: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleCheckout = () => {
    // Checkout logic
    console.log("Proceeding to checkout...");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      {/* Market Content Here */}
      <Market />
      <CartIcon cartItems={cart} onClick={toggleSidebar} />
      {isSidebarOpen && (
        <CartSidebar
          cartItems={cart}
          onClose={toggleSidebar}
          onCheckout={handleCheckout}
        />
      )}
    </div>
  );
};

export default MarketWithCart;

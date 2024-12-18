"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation"; // Import for getting the current page
import { isAuthenticated, getUser } from "../services/authService"; // Import authService functions
import { CartItem } from "../utils/type";

const Checkout: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current pathname
  const [isAuthenticatedState, setIsAuthenticatedState] = useState<boolean | null>(null); // null initially to check authentication once
  const [user, setUser] = useState<any>(null); // User data state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Calculate total price
  const totalAmount = cartItems.reduce(
    (total, item) => total + parseInt(item.discountedPrice.replace("TSh", "").replace(",", "").trim()) * item.quantity,
    0
  );

  // Simulate authentication check
  useEffect(() => {
    const checkAuth = isAuthenticated();
    if (checkAuth) {
      const currentUser = getUser(); // Get actual user data
      setIsAuthenticatedState(true);
      setUser(currentUser); // Set actual user data
    } else {
      setIsAuthenticatedState(false);
    }
  }, []);

  // Get cart data from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(savedCart);
  }, []);

  // Redirect to login/signup if not authenticated
  useEffect(() => {
    if (isAuthenticatedState === false) {
      router.push(`/signin?redirect=${pathname}`); // Send user to login/signup with a redirect URL
    }
  }, [isAuthenticatedState, router, pathname]);

  // Handle checkout
  const handleCheckout = () => {
    if (isAuthenticatedState) {
      router.push("/confirmation");
    } else {
      router.push(`/signin?redirect=${pathname}`);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {isAuthenticatedState === null ? (
        <div>Loading...</div> // Show loading indicator while checking authentication
      ) : isAuthenticatedState && user ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Checkout</h2>

          {/* User Information */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold">User Information</h3>
            <p>Name: {user?.first_name} {user?.last_name}</p>
            <p>Email: {user?.email}</p>
            <p>Address: {user?.address || "Not available"}</p>
          </div>

          {/* Cart Items */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold">Items in Cart</h3>
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between items-center">
                  <span className="text-sm">{item.name} (x{item.quantity})</span>
                  <span className="text-sm">{`TSh ${item.discountedPrice}`}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment Method */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold">Payment Method</h3>
            <select className="p-2 border rounded w-full">
              <option>Credit Card</option>
              <option>PayPal</option>
              <option>Bank Transfer</option>
              <option>Mobile Money (M-Pesa)</option>
            </select>
          </div>

          {/* Total Amount */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold">Total</h3>
            <p className="text-lg font-bold">
              {`TSh ${totalAmount.toLocaleString()}`} {/* Format the total amount with commas */}
            </p>
          </div>

          {/* Checkout Button */}
          <button
            className="py-2 px-6 bg-green-500 text-white rounded w-full sm:w-auto"
            onClick={handleCheckout}
          >
            Confirm and Pay
          </button>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Please Sign In to Continue</h2>
          <p>You need to be signed in to proceed with the checkout process.</p>
          <button
            className="py-2 px-6 bg-blue-500 text-white rounded mt-4"
            onClick={() => router.push("/login")}
          >
            Sign In
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;

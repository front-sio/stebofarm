"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBars } from "@fortawesome/free-solid-svg-icons";

// Define types for the cart item and cart total
interface CartItem {
  quantity: number; // Assuming each item in the cart has a quantity field
}

const Appbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCartIcon, setShowCartIcon] = useState(false);
  const [cartCount, setCartCount] = useState(0); // Dynamic cart count

  const pathname = usePathname();

  // Check if the user is on the market page
  useEffect(() => {
    setShowCartIcon(pathname === "/market");
  }, [pathname]);

  // Fetch cart count from localStorage or API
  useEffect(() => {
    // Fetch cart data from localStorage
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    
    // Calculate total quantity in the cart
    setCartCount(
      cart.reduce((total: number, item: CartItem) => total + (item.quantity || 1), 0) // Sum up quantities
    );
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar fixed top-0 left-0 w-full z-10 bg-white shadow-md">
      <div className="container flex justify-between items-center py-4 px-10">
        <div className="logo text-2xl font-bold text-red-600">Brand</div>
        <ul
          className={`flex space-x-6 md:flex ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <li>
            <Link href="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link href="/market" className="nav-link">
              Market
            </Link>
          </li>
          <li>
            <Link href="/doctor-connect" className="nav-link">
              Doctor Connect
            </Link>
          </li>
          <li>
            <Link href="/signin" className="nav-link">
              Sign In
            </Link>
          </li>
          <li>
            <Link href="/signup" className="nav-link">
              Sign Up
            </Link>
          </li>

          {/* Mobile menu toggle */}
          <li>
            <button onClick={toggleMobileMenu} className="md:hidden">
              <FontAwesomeIcon icon={faBars} className="text-red text-2xl" />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Appbar;

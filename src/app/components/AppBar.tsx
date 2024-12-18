"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBars, faUserCircle } from "@fortawesome/free-solid-svg-icons";

// Define types for the cart item
interface CartItem {
  quantity: number; // Assuming each item in the cart has a quantity field
}

const Appbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCartIcon, setShowCartIcon] = useState(false);
  const [cartCount, setCartCount] = useState(0); // Dynamic cart count
  const [isAuthenticated, setIsAuthenticated] = useState(false); // User authentication state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown state

  const pathname = usePathname();

  // Check if the user is on the market page
  useEffect(() => {
    setShowCartIcon(pathname === "/market");
  }, [pathname]);

  // Fetch cart count from localStorage or API
  useEffect(() => {
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(
      cart.reduce((total: number, item: CartItem) => total + (item.quantity || 1), 0)
    );
  }, []);

  // Check if the user is authenticated (i.e., if an auth token exists in localStorage)
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleOutsideClick = (e: MouseEvent) => {
    if (e.target instanceof HTMLElement) {
      if (!e.target.closest(".profile-dropdown") && !e.target.closest(".profile-icon")) {
        setIsDropdownOpen(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <nav className="navbar fixed top-0 left-0 w-full z-10 bg-white shadow-md">
      <div className="container flex justify-between items-center py-4 px-10">
        {/* Logo */}
        <div className="logo">
          <Link href="/">
            <img src="/assets/images/logo.png" alt="Logo" className="h-12" />
          </Link>
        </div>

        {/* Centered menu */}
        <ul
          className={`flex space-x-6 md:flex ${isMobileMenuOpen ? "block" : "hidden"} mx-auto`}
        >
          <li>
            <Link href="/" className="nav-link text-secondary">
              Home
            </Link>
          </li>
          <li>
            <Link href="/market" className="nav-link text-secondary">
              Market
            </Link>
          </li>
          <li>
            <Link href="/learn" className="nav-link text-secondary">
              Learn
            </Link>
          </li>
          {isAuthenticated ? (
          <li>
            <Link href="/doctor-connect" className="nav-link text-secondary">
              Doctor Connect
            </Link>
          </li>
          ) : <></>
        }
        </ul>

        {/* Right-end buttons */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon */}
          {showCartIcon && (
            <button className="relative">
              <FontAwesomeIcon
                icon={faShoppingCart}
                className="text-xl text-gray-800"
              />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-secondary text-white rounded-full text-xs px-1">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {!isAuthenticated ? (
            <>
              <Link
                href="/signin"
                className="border border-secondary text-secondary py-2 px-6 rounded-md hover:bg-red hover: border-none hover:text-white"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-red text-white py-2 px-6 rounded-lg text-xl font-semibold transition-transform duration-300 ease-in-out hover:scale-105"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              {/* Profile Icon */}
              <button
                onClick={toggleDropdown}
                className="profile-icon flex items-center space-x-2"
              >
                <FontAwesomeIcon
                  icon={faUserCircle}
                  className="text-2xl text-gray-800"
                />
              </button>

              {isDropdownOpen && (
                <div className="profile-dropdown absolute right-12 mt-24 w-48 bg-white border border-gray-200 shadow-lg rounded-md">
                  <ul className="space-y-2 py-2">
                    <li>
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          localStorage.removeItem("accessToken");
                          setIsAuthenticated(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                      >
                        Log Out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-secondary"
          >
            <FontAwesomeIcon icon={faBars} className="text-2xl text-secondary" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Appbar;

"use client";

import React, { useState, useEffect } from "react";
import { fetchProducts } from "../services/productService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import ProductCard, { Product } from "../components/ProductCard";
import { motion } from "framer-motion"; // Ensure this is properly imported

const Market = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        setError("Failed to load products. Please try again.");
      }
    };

    loadProducts();
  }, []);

  // Toggle cart visibility
  useEffect(() => {
    const toggleCartHandler = () => setIsCartOpen((prev) => !prev);
    window.addEventListener("toggleCart", toggleCartHandler);
    return () => window.removeEventListener("toggleCart", toggleCartHandler);
  }, []);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  return (
    <div className="marketplace">
      {/* Error Modal */}
      {error && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Error</h2>
            <p>{error}</p>
            <button onClick={() => setError(null)} className="close-button">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Header with Cart Icon */}
      <section className="products-container p-6">
        {products.length === 0 && !error ? (
          <motion.p
            className="loading-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Loading products...
          </motion.p>
        ) : (
          <motion.div
            className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                className="product-card"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard
                  product={product}
                  onAddToCart={addToCart}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* Side Cart */}
      {isCartOpen && (
        <motion.div
          className="cart-sidebar fixed top-0 right-0 w-80 bg-white shadow-lg h-full p-4"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <h2 className="font-bold text-xl">Your Cart</h2>
          <ul className="cart-items">
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <motion.li
                  key={item.id}
                  className="cart-item flex justify-between items-center py-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      ${item.price} x {item.quantity}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-lg"
                  >
                    ✕
                  </button>
                </motion.li>
              ))
            )}
          </ul>
          <div className="cart-total mt-4">
            <p>
              Total: $
              {cart
                .reduce(
                  (total, item) => total + Number(item.price) * (item.quantity || 1),
                  0
                )
                .toFixed(2)}
            </p>
          </div>
          <button className="bg-primary text-white py-2 px-4 w-full rounded mt-4">
            Checkout
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Market;

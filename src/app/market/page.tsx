"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BsCart4 } from "react-icons/bs";
import { fetchoffers } from "../services/productService"; // Import the fetchProducts function
import { CartItem, Product } from "../utils/type";
import ProductCard from "../components/ProductCard";

// Shimmer Effect Component (for loading state)
const Shimmer: React.FC = () => (
  <div className="w-full sm:w-[247px] h-[380px] bg-gray-300 animate-pulse rounded-lg">
    <div className="w-full h-[218px] bg-gray-400 rounded-t-lg"></div>
    <div className="p-3">
      <div className="h-[20px] bg-gray-400 mb-2 rounded"></div>
      <div className="h-[10px] bg-gray-400 mb-4 rounded"></div>
      <div className="flex justify-between items-center">
        <div className="w-16 h-[10px] bg-gray-400 rounded"></div>
        <div className="w-16 h-[10px] bg-gray-400 rounded"></div>
      </div>
    </div>
  </div>
);

// Modal Component
const Modal: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-[300px] text-center">
      <h3 className="text-xl font-semibold">{message}</h3>
      <button
        className="mt-4 py-2 px-4 bg-red-500 text-white rounded"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  </div>
);



// Cart Component
const Cart: React.FC<{
  cartItems: CartItem[];
  onCheckout: () => void;
}> = ({ cartItems, onCheckout }) => (
  <div className="p-4 bg-gray-100 rounded-lg">
    <h2 className="text-lg font-bold mb-4">Cart</h2>
    {cartItems.length === 0 ? (
      <p>Your cart is empty.</p>
    ) : (
      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li key={item.id} className="flex justify-between items-center">
            <span>{item.name} (x{item.quantity})</span>
            <span>{item.discountedPrice ?? item.price}</span>
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

// Main Market Component
const Market: React.FC = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state

  // Fetch products from the API on component mount
  useEffect(() => {
    const loadOffers = async () => {
      try {
        const fetchedoffers = await fetchoffers();
  
        if (fetchedoffers.length === 0) {
          setIsModalOpen(true); // Show modal if no products are found
        } else {
          setProducts(fetchedoffers);
        }
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };
    loadOffers();
  }, []);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage every time it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      const price = (product.discountedPrice ?? product.price).toString(); // Ensure price is a string
  
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1, price }
            : item
        );
      }
  
      return [
        ...prevCart,
        { ...product, quantity: 1, price, discountedPrice: price } // Ensure price and discountedPrice are strings
      ];
    });
  };
  

  const handleViewDetails = (productId: number) => {
    router.push(`/offers/${productId}`);
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      // Proceed to the checkout page
      router.push("/checkout");
    } else {
      alert("Your cart is empty. Please add some items to the cart.");
    }
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeModal = () => setIsModalOpen(false); // Close the modal

  return (
    <div className="container mx-auto p-16">
      {/* Cart Icon */}
      <div
        className="fixed top-24 right-4 cursor-pointer flex items-center justify-center bg-red text-white p-3 rounded-full shadow-lg transition-transform transform hover:scale-110 hover:bg-red-600"
        onClick={toggleCart}
      >
        <BsCart4 size={24} className="relative" />
        {cart.length > 0 && (
          <span className="absolute top-0 right-10 bg-foreground text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center">
            {cart.length}
          </span>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.length === 0
          ? Array.from({ length: 4 }).map((_, index) => <Shimmer key={index} />) // Show shimmer effect while loading
          : products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onViewDetails={handleViewDetails}
              />
            ))}
      </div>

      {/* Cart Side Panel */}
      {isCartOpen && (
        <div
          className="fixed inset-0 top-20 bg-gray-800 bg-opacity-50 z-50"
          onClick={toggleCart}
        >
          <div
            className="absolute right-0 top-0 bg-white w-[600px] h-full p-6"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the cart
          >
            <button
              className="text-white bg-red text-xl absolute top-4 right-4 p-2 rounded-full"
              onClick={toggleCart}
            >
              &times;
            </button>

            <div className="absolute top-16 w-[90%]">
              <Cart cartItems={cart} onCheckout={handleCheckout} />
            </div>
          </div>
        </div>
      )}

      {/* Modal for No Products Found */}
      {isModalOpen && <Modal message="No products found" onClose={closeModal} />}
    </div>
  );
};

export default Market;

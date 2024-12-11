"use client";

import React, { useState, useEffect } from "react";
import { fetchProducts, getCategories, Product, Category } from "../services/productService";
import { FaSearch, FaCartPlus, FaShoppingBag } from "react-icons/fa";
import SearchBar from "../components/SearchBar";
import Categories from '../components/CategoryBar';

const Market: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>("All");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeLink, setActiveLink] = useState("products");

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






  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 0) + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const checkAuth = (): boolean => {
    const token = localStorage.getItem("authToken"); // Assuming you're storing the token in localStorage
    return token ? true : false;
  };

  const handleCheckout = () => {
    if (!checkAuth()) {
      alert("You need to be logged in to place an order.");
      window.location.href = "/login"; // Redirect to login page
    } else {
      alert("Proceeding with the order...");
      // Here, you can proceed with the order logic, like sending the cart to an API
    }
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`h-auto w-64 bg-gray-10 p-6 fixed left-0 top-0 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ top: "10rem" }}
      >
        {/* Sidebar Links */}
        <div className="flex flex-col gap-2">
          <div>
           {activeLink === 'featuredProduct' ? <div className="Line4 w-[54px] h-[0px] left-[1px] top-[54px] absolute origin-top-left -rotate-90 border-4 border-[#ffd722]"></div> : <div></div>}
            <div
              className={`cursor-pointer ${activeLink === "featuredProduct" ? "Rectangle13 w-[210px] h-[54px] left-0 top-0 absolute bg-zinc-100" : ""}`}
              onClick={() => handleLinkClick("featuredProduct")}
            >
              Featured Products
            </div>
          </div>

          <div
            className={`cursor-pointer ${activeLink === "trendingProducts" ? "bg-yellow-200" : ""}`}
            onClick={() => handleLinkClick("trendingProducts")}
          >
            Trending Products
          </div>

          <div
            className={`cursor-pointer ${activeLink === "farmers" ? "bg-yellow-200" : ""}`}
            onClick={() => handleLinkClick("farmers")}
          >
            Farmers
          </div>
          {/* More links */}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 ml-64 mt-24">
          <div className="Cart w-[72px] h-[72px] pl-[19px] pr-5 py-[19.50px] bg-[#d30404] rounded-[36px] justify-center items-center inline-flex">
            <FaShoppingBag  size={24} className="text-white"/>
          </div>
          {/* Categories */}
          <div 
          className="CategoryContainer w-[967px] h-[66px] pl-[66px] pr-[17px] py-[21px] bg-[#fff8f8] justify-end items-center inline-flex" 
          style={{
            margin: '18px'
          }}
          >
          </div>


        <SearchBar />
        

        {/* Render Active Content */}
        {activeLink === "products" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
            {products.map((product) => (
              <div key={product.id} className="ProductCard bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src={product.image_url || "https://via.placeholder.com/400x300"}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 truncate max-w-xs">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-4 truncate max-w-xs">{product.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    {product.discountedPrice && (
                      <span className="text-gray-500 line-through">TSH {product.price}</span>
                    )}
                    <span className="text-lg font-bold text-yellow-500">TSH {product.discountedPrice || product.price}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="flex items-center justify-center w-full bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                      onClick={() => addToCart(product)}
                    >
                      <FaCartPlus className="mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Checkout Button */}
        {cart.length > 0 && (
          <button
            className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        )}
      </main>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed right-0 top-100 w-80 bg-white p-8 shadow-lg h-full overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4">Shopping Cart</h3>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center mb-4">
                <span>
                 <img 
                src={item.image_url} 
                style={{ width: '40px', height: '40px', borderRadius: '50%'}}
                /></span>
                <span className="truncate max-w-xs">{item.name}</span>
                <span>{item.quantity} x TSH {item.price}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between">
            <span className="font-bold">Total:</span>
            <span className="font-bold">
              TSH{" "}
              {cart.reduce((total, item) => total + (item.quantity || 0) * item.price, 0)}
            </span>
          </div>
          <button
            className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Market;

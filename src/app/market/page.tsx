"use client";

import React, { useState, useEffect } from "react";
import { fetchProducts, fetchCategories, Product, Category } from "../services/productService";
import { FaSearch, FaCartPlus, FaShoppingBag } from "react-icons/fa";

const Market: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>("All");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default sidebar open
  const [activeLink, setActiveLink] = useState("products"); // Set the default active link

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        setError("Failed to load products. Please try again.");
      }
    };

    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        setError("Failed to load categories. Please try again.");
      }
    };

    loadProducts();
    loadCategories();
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
        <div
          className={`Active cursor-pointer w-[210px] h-14 relative mb-6 ${
            activeLink === "products" ? "bg-yellow-200" : ""
          }`}
          onClick={() => handleLinkClick("products")}
        >
          <div className="Rectangle13 w-full h-full bg-gray-200 rounded-md"></div>
          <div className="Products absolute left-6 top-4 text-black text-base font-medium font-['Inter']">
            Products
          </div>
          <div className="Line4 w-[54px] h-0 absolute left-1 top-14 origin-top-left -rotate-90 border-4 border-yellow-400"></div>
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col gap-2">
          <div
            className={`cursor-pointer ${activeLink === "orders" ? "bg-yellow-200" : ""}`}
            onClick={() => handleLinkClick("orders")}
          >
            My Orders
          </div>
          <div
            className={`cursor-pointer ${activeLink === "myProducts" ? "bg-yellow-200" : ""}`}
            onClick={() => handleLinkClick("myProducts")}
          >
            My Products
          </div>
          <div
            className={`cursor-pointer ${activeLink === "expert" ? "bg-yellow-200" : ""}`}
            onClick={() => handleLinkClick("expert")}
          >
            Connect to Expert
          </div>
          <div
            className={`cursor-pointer ${activeLink === "community" ? "bg-yellow-200" : ""}`}
            onClick={() => handleLinkClick("community")}
          >
            Community
          </div>
          <div
            className={`cursor-pointer ${activeLink === "favorites" ? "bg-yellow-200" : ""}`}
            onClick={() => handleLinkClick("favorites")}
          >
            Favorites
          </div>
          <div
            className={`cursor-pointer ${activeLink === "trackProduct" ? "bg-yellow-200" : ""}`}
            onClick={() => handleLinkClick("trackProduct")}
          >
            Track Product
          </div>
          <div
            className={`cursor-pointer text-red-500 font-bold ${
              activeLink === "logout" ? "bg-yellow-200" : ""
            }`}
            onClick={() => handleLinkClick("logout")}
          >
            Logout
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 ml-64 mt-24">
        {/* Categories and Cart */}
          <div className="CategoryContainer w-full h-16 px-16 bg-red-50 flex items-center gap-8 rounded-lg shadow-md mb-8">
            {/* Cart Icon */}
            <div
              className="Cart w-18 h-18 p-4 bg-red rounded-full flex items-center justify-center shadow-lg cursor-pointer"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <FaShoppingBag className="w-8 h-8 text-white" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-yellow-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cart.reduce((total, item) => total + (item.quantity || 0), 0)}
                </span>
              )}
            </div>
            {/* Categories */}
            <div className="flex flex-grow gap-8">
              {categories.map((category) => (
                <span
                  key={category.id}
                  className="text-black text-base font-medium font-['Inter'] cursor-pointer"
                  onClick={() => handleCategoryClick(category.name)}
                >
                  {category.name}
                </span>
              ))}
            </div>
          </div>


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

        {/* Other Components for My Orders, My Products, etc. */}
        {activeLink === "orders" && <div>My Orders Content</div>}
        {activeLink === "myProducts" && <div>My Products Content</div>}
        {activeLink === "expert" && <div>Connect to Expert Content</div>}
        {activeLink === "community" && <div>Community Content</div>}
        {activeLink === "favorites" && <div>Favorites Content</div>}
        {activeLink === "trackProduct" && <div>Track Product Content</div>}
        {activeLink === "logout" && <div>Logout Content</div>}
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
            onClick={() => alert("Proceed to checkout")}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Market;

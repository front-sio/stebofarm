// ProductCard Component (Reusable)
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

// Define Product interface
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  image_url: string;
  quantity?: number; // Optional to handle products without quantity specified
}

// Define Props for the component
interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void; // Callback function for adding to cart
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div
      className="product-card p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow"
      role="group"
      aria-labelledby={`product-title-${product.id}`}
    >
      {/* Product Image */}
      <img
        src={product.image_url || 'https://placehold.co/400'}
        alt={`${product.name} product image`}
        className="product-image w-full h-40 object-cover rounded-t-lg mb-4"
        loading="lazy"
        />


      {/* Product Title */}
      <h3
        id={`product-title-${product.id}`}
        className="product-name text-lg font-bold mb-2"
      >
        {product.name}
      </h3>

      {/* Product Price */}
      <p className="product-price text-gray-600 mb-4">
        ${Number(product.price).toFixed(2)}
      </p>

      {/* Add to Cart Button */}
      <button
        onClick={() => onAddToCart(product)}
        className="add-to-cart-button bg-primary text-white py-2 px-4 rounded flex items-center justify-center hover:bg-primary-dark transition-colors"
        aria-label={`Add ${product.name} to cart`}
      >
        <FontAwesomeIcon icon={faCartPlus} className="mr-2" />
        {/* Add to Cart */}
      </button>
    </div>
  );
};

export default ProductCard;

import React from "react";

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
  quantity?: number;
}

interface FeaturedCardProps {
  product: Product;
  addToCart: () => void;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({ product, addToCart }) => {
  return (
    <div className="FeaturedCard border border-gray-300 rounded p-4 shadow-md">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="text-lg font-bold mt-2">{product.name}</h3>
      <p className="text-gray-700 mt-1">{product.description}</p>
      <p className="text-green-600 font-bold mt-2">TSh {product.price}</p>
      <button
        className="bg-yellow-500 text-white px-4 py-2 rounded mt-2"
        onClick={addToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default FeaturedCard;

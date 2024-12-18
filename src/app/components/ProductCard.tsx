import { Product } from "../utils/type";

// Product Card Component
const ProductCard: React.FC<{
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (productId: number) => void;
}> = ({ product, onAddToCart, onViewDetails }) => (
  <div className="w-full sm:w-[247px] h-[380px] bg-white shadow rounded-lg flex flex-col">
    <img
      className="w-full h-[218px] rounded-t-lg object-cover"
      src={product.image_url}
      alt={product.name}
    />
    <div className="p-3 flex-grow">
      <h3 className="text-[18px] font-medium capitalize">{product.name}</h3>
      <p className="text-[8px] text-gray-600">{product.description}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="line-through text-gray-400 text-xs">
          TSh {product.price}
        </span>
        {product.discountedPrice && (
          <span className="text-black font-medium text-[14px]">
            TSh {product.discountedPrice}
          </span>
        )}
      </div>
    </div>
    <div className="flex">
      <button
        className="w-1/2 py-1 bg-primary rounded-bl-lg text-[16px]"
        onClick={() => onViewDetails(product.id)}
      >
        View Details
      </button>
      <button
        className="w-1/2 py-1 bg-red rounded-br-lg text-[16px] text-white"
        onClick={() => onAddToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  </div>
);



export default ProductCard;
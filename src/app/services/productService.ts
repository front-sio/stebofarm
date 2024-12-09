import { apiFetch } from "../utils/api";


// Define Product interface
export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  image_url: string;
}

// Fetch products from the API
export async function fetchProducts(): Promise<Product[]> {
  try {
    const products = await apiFetch('/products');
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to load products. Please try again later.');
  }
}


// Create a product
export async function createProduct(productData: any): Promise<Product> {
  try {
    const newProduct = await apiFetch('/products', {
      method: 'POST',
      body: productData, // Ensure you are sending FormData here
    });
    return newProduct;
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Failed to create product. Please try again later.');
  }
}

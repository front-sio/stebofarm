import { apiFetch } from "../utils/api";
import { Product } from "../utils/type";


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

// src/app/services/productService.ts
export const createProduct = async (formData: FormData) => {
  const response = await apiFetch("/products", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create product");
  }
  return await response.json();
};

// Function to create a new category
export const createCategory = async (categoryData: { name: string }) => {
  const response = await fetch("/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(categoryData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create category");
  }
  return response.json();
};



// Update a product
export async function updateProduct(productId: number, productData: any): Promise<Product> {
  try {
    const updatedProduct = await apiFetch(`/products/${productId}`, {
      method: 'PUT',
      body: productData, // Send the updated data, which can also include FormData for images
    });
    return updatedProduct;
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Failed to update product. Please try again later.');
  }
}



export async function fetchoffers(): Promise<Product[]> {
  try {
    const products = await apiFetch('/products');
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to load products. Please try again later.');
  }
}

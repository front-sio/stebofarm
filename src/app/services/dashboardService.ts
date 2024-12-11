import { apiFetch } from "../utils/api";


/**
 * Fetch all products for the dashboard.
 * @returns Promise resolving to the list of products
 */
export async function fetchProducts(): Promise<any[]> {
  return apiFetch('/products');
}

/**
 * Fetch all orders for the dashboard.
 * @returns Promise resolving to the list of orders
 */
export async function fetchOrders(): Promise<any[]> {
  return apiFetch('/orders');
}

/**
 * Fetch summary data for the dashboard, including total sales revenue.
 * This is an example endpoint for aggregated dashboard data.
 * @returns Promise resolving to summary data
 */
export async function fetchDashboardSummary(): Promise<{
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
}> {
  return apiFetch('/summary');
}

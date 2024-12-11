'use client';

import React, { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { fetchWithAuth } from '../utils/auth';

interface Product {
  id: number;
  name: string;
  category: string;
  stock: number;
  price: number;
}

interface Order {
  id: number;
  customerName: string;
  date: string;
  total: number;
}

interface DashboardSummary {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
}

const Dashboard = () => {
  const { data: session, status } = useSession();

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [summary, setSummary] = useState<DashboardSummary>({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  // Protect the page if not authenticated
  useEffect(() => {
    if (status === 'loading') return; // Don't redirect while loading session
    if (status === 'unauthenticated') {
      window.location.href = '/signin';
    }
  }, [status]);

  useEffect(() => {
    if (status === 'authenticated') {
      const loadData = async () => {
        try {
          setLoading(true);

          const [productsData, ordersData, summaryData] = await Promise.all([
            fetchWithAuth('/api/products'), // Update API endpoints as needed
            fetchWithAuth('/api/orders'),
            fetchWithAuth('/api/dashboard-summary'),
          ]);

          setProducts(productsData);
          setOrders(ordersData);
          setSummary(summaryData);
        } catch (error) {
          console.error('Error loading dashboard data:', error);
        } finally {
          setLoading(false);
        }
      };

      loadData();
    }
  }, [session, status]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>You are not authenticated. Please log in.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Poultry Marketplace Dashboard</h1>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Summary Cards */}
          <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-700">Total Products</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">{summary.totalProducts}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-700">Total Orders</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">{summary.totalOrders}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-700">Sales Revenue</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                ${summary.totalRevenue.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="col-span-1 bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-700">Recent Orders</h2>
            {loading ? (
              <p className="mt-4 text-gray-500">Loading orders...</p>
            ) : orders.length > 0 ? (
              <ul className="mt-4 space-y-4">
                {orders.slice(0, 5).map((order) => (
                  <li key={order.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-sm text-gray-500">{order.date}</p>
                    </div>
                    <p className="font-semibold text-gray-900">${order.total}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-gray-500">No orders found.</p>
            )}
          </div>
        </div>

        {/* Product List */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-700">Products</h2>
          {loading ? (
            <p className="mt-4 text-gray-500">Loading products...</p>
          ) : products.length > 0 ? (
            <table className="mt-4 w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2 text-sm font-medium text-gray-600">Name</th>
                  <th className="px-4 py-2 text-sm font-medium text-gray-600">Category</th>
                  <th className="px-4 py-2 text-sm font-medium text-gray-600">Stock</th>
                  <th className="px-4 py-2 text-sm font-medium text-gray-600">Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="px-4 py-2 text-sm text-gray-700">{product.name}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{product.category}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{product.stock}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">${product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="mt-4 text-gray-500">No products found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

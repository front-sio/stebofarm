// /src/app/dashboard/page.tsx
"use client"
import React, { useEffect, useState } from 'react';
import { fetchWithAuth } from '../utils/auth';


const DashboardPage: React.FC = () => {
  const [data, setData] = useState<any>(null);  // State to store API data
  const [loading, setLoading] = useState<boolean>(true);  // State for loading indicator
  const [error, setError] = useState<string | null>(null);  // State for error messages

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'your-api-endpoint' with the actual endpoint
        const result = await fetchWithAuth('/your-api-endpoint');
        setData(result);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="dashboard">
      <h1>Welcome to the Dashboard</h1>
      
      {/* Example of displaying fetched data */}
      <div>
        <h2>Data</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default DashboardPage;

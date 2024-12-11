'use client';  // This makes the entire layout client-side

import { SessionProvider } from 'next-auth/react';

import '../styles/globals.css'; // Include your global CSS file
import DashboardAppbar from './components/DashboardSidebar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* You can include your head tags here */}
        <title>My Marketplace</title>
      </head>
      <body className="bg-white text-black">
        <SessionProvider>
          <DashboardAppbar />
          {/* Wrap the children in the body */}
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}

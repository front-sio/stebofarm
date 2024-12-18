'use client';

import Appbar from './components/AppBar';
import './styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>My Marketplace</title>
      </head>
      <body className="bg-white text-black">
        {/* Appbar component */}
        <Appbar />
        {/* Main content with space from Appbar */}
        <div className="pt-20">{children}</div>
      </body>
    </html>
  );
}

import Appbar from './components/AppBar';
import './styles/globals.css'; // Include your global CSS file

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
        <Appbar />
        {/* Wrap the children in the body */}
        {children}
      </body>
    </html>
  );
}

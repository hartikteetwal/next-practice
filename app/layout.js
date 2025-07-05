// app/layout.jsx
import { Toaster } from 'react-hot-toast';
import ShopContextProvider from './context/ShopContext';
import './globals.css';

export const metadata = {
  title: 'EcoWear App',
  description: 'Secure App',
  icons: {
    icon: "/leaf-logo-vector-41779522.png", 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/leaf-logo-vector-41779522.png" type="image/x-icon" />
      </head>
      <ShopContextProvider>
        <body>{children}</body>
      </ShopContextProvider>
    </html>
  );
}

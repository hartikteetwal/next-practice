// app/layout.jsx
import { Toaster } from 'react-hot-toast';
import ShopContextProvider from './context/ShopContext';
import './globals.css';

export const metadata = {
  title: 'EcoWear App',
  description: 'Secure App',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ShopContextProvider>
        <body>{children}</body>
      </ShopContextProvider>
    </html>
  );
}

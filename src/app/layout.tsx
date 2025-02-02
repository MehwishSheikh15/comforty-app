// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import { CartProvider } from "./context/cartContext";
// import { WishlistProvider } from "./context/wishlistContext";


// import "./globals.css";
// import Navbar from "./component/Navbar";
// import Footer from "./component/Footer";
// import InstallNotification from "./component/InstallNotification"; 

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Comforty",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <CartProvider>
//       <WishlistProvider>
//           <html lang="en">
//             <head>
//               {/* PWA Manifest */}
//               <link rel="manifest" href="/manifest.json" />
//               {/* Favicon */}
//               <link rel="icon" href="/favicon.ico" />
//               {/* Theme Color */}
//               <meta name="theme-color" content="#ffffff" />
//               {/* Meta Tags for Mobile */}
//               <meta name="viewport" content="width=device-width, initial-scale=1" />
//               <meta name="apple-mobile-web-app-capable" content="yes" />
//               <meta name="apple-mobile-web-app-status-bar-style" content="default" />
//               <meta name="apple-mobile-web-app-title" content="Comforty" />
//               {/* Apple Touch Icon */}
//               <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
//             </head>
//             <body className={inter.className}>
//                 <Navbar />
//                 {children}
//                 <Footer />
//                 <InstallNotification /> {/* Add InstallNotification component here */}
//             </body>
//           </html>
//       </WishlistProvider>
//     </CartProvider>
//   );
// }
// layout.tsx
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import { CartProvider } from "./context/cartContext";
// import { WishlistProvider } from "./context/wishlistContext";

// import "./globals.css";
// import Navbar from "./component/Navbar";
// import Footer from "./component/Footer";
// import InstallNotification from "./component/InstallNotification"; 

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Comforty",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//       <CartProvider>
//         <WishlistProvider>
//           <html lang="en">
//             <head>
//               {/* PWA Manifest */}
//               <link rel="manifest" href="/manifest.json" />
//               {/* Favicon */}
//               <link rel="icon" href="/favicon.ico" />
//               {/* Theme Color */}
//               <meta name="theme-color" content="#ffffff" />
//               {/* Meta Tags for Mobile */}
//               <meta name="viewport" content="width=device-width, initial-scale=1" />
//               <meta name="apple-mobile-web-app-capable" content="yes" />
//               <meta name="apple-mobile-web-app-status-bar-style" content="default" />
//               <meta name="apple-mobile-web-app-title" content="Comforty" />
//               {/* Apple Touch Icon */}
//               <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
//             </head>
//             <body className={inter.className}>
//               {/* Navbar */}
//               <Navbar />

//               {/* Main Content */}
//               {children}

//               {/* Footer */}
//               <Footer />

//               {/* Install Notification */}
//               <InstallNotification />
//             </body>
//           </html>
//         </WishlistProvider>
//       </CartProvider>
//   );
// }

// RootLayout.tsx
// 'use client';
// import { ClerkProvider } from '@clerk/nextjs';
// import { CartProvider } from './context/cartContext';
// import { WishlistProvider } from './context/wishlistContext';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';

// import './globals.css';
// import Navbar from './component/Navbar';
// import Footer from './component/Footer';

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
//     console.error('Stripe publishable key is not defined.');
//   }

//   return (
//     <ClerkProvider>
//       <CartProvider>
//         <WishlistProvider>
//           <Elements stripe={stripePromise}>
//             <html lang="en">
//               <body>
//                 <Navbar />
//                 {children}
//                 <Footer />
//               </body>
//             </html>
//           </Elements>
//         </WishlistProvider>
//       </CartProvider>
//     </ClerkProvider>
//   );
// }


import { ClerkProvider } from '@clerk/nextjs';
import { CartProvider } from './context/cartContext';
import { WishlistProvider } from './context/wishlistContext';

import './globals.css';
import Navbar from './component/Navbar';
import Footer from './component/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <CartProvider>
        <WishlistProvider>
          <html lang="en">
            <body>
              <Navbar />
              {children}
              <Footer />
            </body>
          </html>
        </WishlistProvider>
      </CartProvider>
    </ClerkProvider>
  );
}

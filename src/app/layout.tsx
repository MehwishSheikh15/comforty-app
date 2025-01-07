// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import { CartProvider } from "./context/cartContext";

// import "./globals.css";
// import Navbar from "./component/Navbar";


// import Footer from "./component/Footer";


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

//     <html lang="en">
//       <body className={inter.className}>
//         <Navbar/>

        
//         {children}
//       <Footer/>
//       </body>
//     </html>
//     </CartProvider>

//   );
// }
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import { CartProvider } from "./context/cartContext";

// import "./globals.css";
// import Navbar from "./component/Navbar";
// import Footer from "./component/Footer";

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
//       <html lang="en">
//         <head>
//           {/* PWA Manifest */}
//           <link rel="manifest" href="/manifest.json" />
//           {/* Favicon */}
//           <link rel="icon" href="/icons/icon-192x192.png" />
//           {/* Theme Color */}
//           <meta name="theme-color" content="#ffffff" />
//           {/* Meta Tags for Mobile */}
//           <meta name="viewport" content="width=device-width, initial-scale=1" />
//           <meta name="apple-mobile-web-app-capable" content="yes" />
//           <meta name="apple-mobile-web-app-status-bar-style" content="default" />
//           <meta name="apple-mobile-web-app-title" content="Comforty" />
//           {/* Apple Touch Icon */}
//           <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
//         </head>
//         <body className={inter.className}>
//           <Navbar />
//           {children}
//           <Footer />
//         </body>
//       </html>
//     </CartProvider>
//   );
// }
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "./context/cartContext";

import "./globals.css";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import InstallNotification from "./component/InstallNotification"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Comforty",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <html lang="en">
        <head>
          {/* PWA Manifest */}
          <link rel="manifest" href="/manifest.json" />
          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" />
          {/* Theme Color */}
          <meta name="theme-color" content="#ffffff" />
          {/* Meta Tags for Mobile */}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Comforty" />
          {/* Apple Touch Icon */}
          <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        </head>
        <body className={inter.className}>
          <Navbar />
          {children}
          <Footer />
          <InstallNotification /> {/* Add InstallNotification component here */}
        </body>
      </html>
    </CartProvider>
  );
}

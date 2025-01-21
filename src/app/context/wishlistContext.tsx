
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type WishlistItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
};

type WishlistContextType = {
  wishlist: WishlistItem[]; // Store full product details in the wishlist
  addToWishlist: (product: WishlistItem) => void; // Add product from CartPage
  removeFromWishlist: (id: string) => void;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]); // Store full product details

  // Add item to wishlist
  const addToWishlist = (product: WishlistItem) => {
    setWishlist((prev) => {
      if (prev.some((item) => item.id === product.id)) return prev; // Prevent duplicates
      return [...prev, product];
    });
  };

  // Remove item from wishlist
  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

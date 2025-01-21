
'use client';

import React, { createContext, useContext, useState } from "react";

// Define the Product type based on the structure from ProductPage
type Product = {
  id: string;  // Use the _id from the product
  name: string;
  image: string;
  price: number;
  priceWithoutDiscount?: number; // Optional price without discount
  quantity: number;
  description: string;
  inventory: number; // Inventory field
  badge?: string;  // Optional badge (Sales, New, etc.)
  tags: string[];  // Tags for filtering or search
};

type CartItem = Product & {
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  wishlist: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, quantityChange: number) => void;
  clearCart: () => void;
  addToWishlist: (item: CartItem) => void; // Add to wishlist
  removeFromWishlist: (id: string) => void; // Remove from wishlist
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<CartItem[]>([]); // Wishlist state

  // Function to add a product to the cart
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // If item exists in cart, update quantity, but ensure inventory is not exceeded
        const newQuantity = Math.min(existingItem.quantity + item.quantity, existingItem.inventory);
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: newQuantity }  // Add the quantity without exceeding inventory
            : cartItem
        );
      }
      // If item is not in the cart, add it
      return [...prevCart, item];
    });
  };

  // Function to remove a product from the cart
  const removeFromCart = (id: string) => {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.id !== id)
    );
  };

  // Function to update the quantity of an item in the cart
  const updateCartQuantity = (id: string, quantityChange: number) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === id
          ? {
              ...cartItem,
              quantity: Math.max(cartItem.quantity + quantityChange, 1), // Ensure quantity doesn't go below 1
            }
          : cartItem
      )
    );
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart([]);
  };

  // Add item to wishlist
  const addToWishlist = (item: CartItem) => {
    setWishlist((prevWishlist) => {
      if (!prevWishlist.find((wishlistItem) => wishlistItem.id === item.id)) {
        return [...prevWishlist, item]; // Add item if not already in wishlist
      }
      return prevWishlist;
    });
  };

  // Remove item from wishlist
  const removeFromWishlist = (id: string) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, wishlist, addToCart, removeFromCart, updateCartQuantity, clearCart, addToWishlist, removeFromWishlist }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the Cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

'use client';

import React from "react";
import { useWishlist } from "../context/wishlistContext"; // Import wishlist context
import { useCart } from "../context/cartContext"; // Import cart context
import { AiOutlineHeart, AiOutlineDelete } from "react-icons/ai";
import Link from "next/link";

const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart(); // Use cart context

  // Handle adding item to cart
  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.title,
      price: item.price,
      image: item.image,
      quantity: 1,
      description: item.description,
      inventory: 0,
      tags: []
    });
  };

  return (
    <div className="py-16 px-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="text-center text-lg">Your wishlist is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Wishlist Items Section */}
          <div className="flex-1">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 border-b pb-4"
              >
                <img src={item.image} alt={item.title} className="w-20 h-20" />
                <div className="flex-1 ml-4">
                  <p className="text-lg font-semibold">{item.title}</p>
                  <div className="mt-4 sm:mt-0 flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                    <p className="text-gray-600">Price: ${item.price}</p>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-[#029FAE] text-white py-2 px-4 rounded-full shadow-md hover:bg-[#027a8b] transition-colors duration-300"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="text-black hover:text-red-700"
                    >
                      <AiOutlineDelete className="w-5 h-5 cursor-pointer hover:text-red-700" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;

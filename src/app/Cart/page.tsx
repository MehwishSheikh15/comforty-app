'use client';
import Image from "next/image";
import React, { useState } from "react";
import { useCart } from "../context/cartContext";
import { useWishlist } from "../context/wishlistContext";
import { AiOutlineHeart, AiOutlineDelete } from "react-icons/ai";
import Link from "next/link";

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Calculate total price
  const total = cart.reduce(
    (acc: number, item: { price: number; quantity: number }) =>
      acc + item.price * item.quantity,
    0
  );

  const handleIncreaseQuantity = (itemId: string) => {
    updateCartQuantity(itemId, 1); // Increase quantity by 1
    showSuccessMessage("Successfully added to the cart!");
  };

  const handleDecreaseQuantity = (itemId: string) => {
    updateCartQuantity(itemId, -1); // Decrease quantity by 1
  };

  const handleAddToWishlist = (item: {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    description: string;
  }) => {
    if (!wishlist.some((wishItem) => wishItem.id === item.id)) {
      addToWishlist({
        id: item.id,
        title: item.name,
        price: item.price,
        image: item.image,
        description: item.description,
      });
    } else {
      removeFromWishlist(item.id);
    }
  };

  const showSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null); // Hide message after 3 seconds
    }, 3000);
  };

  return (
    <div className="py-16 px-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Bag</h2>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
          {successMessage}
        </div>
      )}

      {cart.length === 0 ? (
        <p className="text-center text-lg">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="flex-1">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 border-b pb-4"
              >
                <Image src={item.image} 
                alt={item.name} 
                width={10}
                height={10}
                className="w-20 h-20" />
                <div className="flex-1 ml-4">
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p className="text-gray-600 mt-2 text-sm">
                    Quantity:
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleDecreaseQuantity(item.id)}
                        className="text-xl text-gray-600 hover:text-gray-800"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleIncreaseQuantity(item.id)}
                        className="text-xl text-gray-600 hover:text-gray-800"
                      >
                        +
                      </button>
                    </div>
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-black hover:text-red-700"
                    >
                      <AiOutlineDelete className="w-5 h-5 cursor-pointer hover:text-red-700" />
                    </button>
                    <button
                      onClick={() => handleAddToWishlist(item)}
                      className={`text-xl cursor-pointer ${
                        wishlist.some((wishItem) => wishItem.id === item.id)
                          ? "text-red-700"
                          : "text-gray-600"
                      } hover:fill-red-700`}
                    >
                      <AiOutlineHeart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                  <p className="text-gray-600">MRP: ${item.price}</p>
                  <p className="text-gray-600">
                    Total: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="w-full lg:w-1/3">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Summary
            </h2>
            <div>
              <div className="flex justify-between mb-4">
                <p className="text-gray-600">Subtotal</p>
                <p className="text-gray-800">${total.toFixed(2)}</p>
              </div>
              <div className="flex justify-between mb-4">
                <p className="text-gray-600">Estimated Delivery & Handling</p>
                <p className="text-gray-800">Free</p>
              </div>
              <div className="flex justify-between border-t border-b-2 border-gray-200 pt-4">
                <p className="text-gray-800 font-medium">Total</p>
                <p className="text-gray-800 font-medium">${total.toFixed(2)}</p>
              </div>

              <Link href="/checkout">
                <button className="mt-6 w-full bg-teal-500 text-white py-3 rounded-full text-lg font-medium hover:bg-teal-600 transition">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;


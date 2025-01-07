'use client';

import React from "react";
import { useCart } from "../context/cartContext";
import Link from "next/link";

const CartPage: React.FC = () => {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.priceNumeric * item.quantity, 0);

  return (
    <div className="py-16 px-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-indigo-900">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center text-lg">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-4 shadow-md">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
              <div className="flex-1 ml-4">
                <p className="text-lg font-semibold">{item.name}</p>
                <p className="text-gray-600">{item.price}</p> {/* Display price with $ sign */}
                <p className="text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-8 flex justify-between items-center">
            <p className="text-xl font-bold text-gray-800">Total: ${total.toFixed(2)}</p> {/* Calculate total with priceNumeric */}
            <Link href="/checkout" className="bg-green-700 text-white py-2 px-6 rounded-lg hover:bg-green-800">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;


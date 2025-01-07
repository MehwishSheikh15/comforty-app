'use client';
import React, { useState, useEffect } from "react";
import { useCart } from "../context/cartContext";
import { useRouter } from "next/navigation";

const CheckoutPage: React.FC = () => {
  const { cart, clearCart } = useCart(); 
  const [form, setForm] = useState({
    name: "",
    address: "",
    country: "",
    city: "",
    zip: "",
    payment: "",
  });
  const [error, setError] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false); // State for success message
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrder = () => {
    // Validate form
    if (!form.name || !form.address || !form.country || !form.city || !form.zip || !form.payment) {
      setError("Please fill in all the fields.");
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setError("");
    setOrderSuccess(true); // Show success message

    // Simulate order placement
    setTimeout(() => {
      clearCart(); // Clear cart items
    }, 2000); // Wait for the success message to be shown before clearing cart
  };

  useEffect(() => {
    if (orderSuccess) {
      // Redirect to homepage after 3 seconds
      setTimeout(() => {
        router.push("/"); // Redirect to homepage
      }, 3000);
    }
  }, [orderSuccess, router]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-900">Checkout</h2>
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="First and Last Name"
            className="border p-3 rounded-lg"
            value={form.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="border p-3 rounded-lg"
            value={form.address}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            className="border p-3 rounded-lg"
            value={form.country}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            className="border p-3 rounded-lg"
            value={form.city}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="zip"
            placeholder="ZIP Code"
            className="border p-3 rounded-lg"
            value={form.zip}
            onChange={handleInputChange}
          />
          <select
            name="payment"
            onChange={handleInputChange}
            className="border p-3 rounded-lg"
            value={form.payment}
          >
            <option value="">Select Payment Method</option>
            <option value="cod">Cash on Delivery</option>
            <option value="online">Online Payment</option>
          </select>
        </form>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <button
          type="button"
          onClick={handleOrder}
          className="mt-6 bg-teal-500 text-white py-3 px-6 rounded-lg w-full hover:bg-teal-600"
        >
          Finalize Order
        </button>
      </div>

      {orderSuccess && (
        <div className="mt-6 text-center">
          <div className="flex flex-col items-center">
            <img
              src="/favicon.ico"
              alt="Comforty Logo"
              className="w-20 h-20 mb-4"
            />
            <p className="text-teal-600 font-bold text-lg">
              Thank you for your order! Comforty has successfully placed your order.
            </p>
            <p className="text-gray-600 mt-2">Redirecting to homepage...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;

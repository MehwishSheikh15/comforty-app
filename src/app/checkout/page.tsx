// 'use client';

// import Image from "next/image";
// import React, { useState } from "react";
// import { useCart } from "../context/cartContext";
// import { useRouter } from "next/navigation";
// import { v4 as uuidv4 } from "uuid"; // For generating unique order IDs

// const CheckoutPage: React.FC = () => {
//   const { cart, clearCart } = useCart();
//   const [form, setForm] = useState({
//     name: "",
//     address: "",
//     country: "",
//     city: "",
//     zip: "",
//     email: "",
//     phone: "",
//     payment: "",
//     shippingMethod: "",
//     orderNotes: "",
//   });
//   const [error, setError] = useState("");
//   const [orderSuccess, setOrderSuccess] = useState(false);
//   const router = useRouter();

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//   ) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleOrder = () => {
//     // Validate form
//     if (
//       !form.name ||
//       !form.address ||
//       !form.country ||
//       !form.city ||
//       !form.zip ||
//       !form.email ||
//       !form.phone ||
//       !form.payment ||
//       !form.shippingMethod
//     ) {
//       setError("Please fill in all the fields.");
//       return;
//     }

//     if (cart.length === 0) {
//       setError("Your cart is empty.");
//       return;
//     }

//     setError("");

//     // Create a unique order number using UUID
//     const orderNumber = uuidv4();

//     // Store order details (e.g., in localStorage or send to the backend)
//     const orderData = {
//       orderNumber,
//       name: form.name,
//       address: form.address,
//       email: form.email,
//       phone: form.phone,
//       paymentStatus: form.payment === "online" ? "Pending" : "COD",
//       shippingMethod: form.shippingMethod,
//       orderNotes: form.orderNotes,
//       products: cart,
//       totalPrice: cart.reduce(
//         (total, item) => total + item.price * item.quantity,
//         0
//       ),
//       shipmentTracking:
//         form.shippingMethod === "express" ? "Tracking12345" : "N/A",
//     };

//     // Store order data in localStorage (or use a backend API to save)
//     localStorage.setItem(orderNumber, JSON.stringify(orderData));

//     // If online payment is selected, redirect to EasyPaisa
//     if (form.payment === "online") {
//       window.location.href = "https://www.easypaisa.com.pk/"; // Replace with actual EasyPaisa payment URL
//       return;
//     }

//     // Simulate order success and navigate to the order page
//     setOrderSuccess(true);
//     setTimeout(() => {
//       clearCart(); // Clear the cart
//       router.push(`/Order?orderNumber=${orderNumber}`); // Redirect to the order details page
//     }, 2000);
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-3xl font-bold text-center mb-6 text-indigo-900">
//         Checkout
//       </h2>

//       <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
//         <form className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="First and Last Name"
//             className="border p-3 rounded-lg w-full"
//             value={form.name}
//             onChange={handleInputChange}
//           />
//           <input
//             type="text"
//             name="address"
//             placeholder="Address"
//             className="border p-3 rounded-lg w-full"
//             value={form.address}
//             onChange={handleInputChange}
//           />
//           <input
//             type="text"
//             name="country"
//             placeholder="Country"
//             className="border p-3 rounded-lg w-full"
//             value={form.country}
//             onChange={handleInputChange}
//           />
//           <input
//             type="text"
//             name="city"
//             placeholder="City"
//             className="border p-3 rounded-lg w-full"
//             value={form.city}
//             onChange={handleInputChange}
//           />
//           <input
//             type="text"
//             name="zip"
//             placeholder="ZIP Code"
//             className="border p-3 rounded-lg w-full"
//             value={form.zip}
//             onChange={handleInputChange}
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             className="border p-3 rounded-lg w-full"
//             value={form.email}
//             onChange={handleInputChange}
//           />
//           <input
//             type="text"
//             name="phone"
//             placeholder="Phone Number"
//             className="border p-3 rounded-lg w-full"
//             value={form.phone}
//             onChange={handleInputChange}
//           />
//           <select
//             name="shippingMethod"
//             onChange={handleInputChange}
//             className="border p-3 rounded-lg w-full"
//             value={form.shippingMethod}
//           >
//             <option value="">Select Shipping Method</option>
//             <option value="standard">Standard Shipping</option>
//             <option value="express">Express Shipping</option>
//             <option value="overnight">Overnight Shipping</option>
//           </select>
//           <textarea
//             name="orderNotes"
//             placeholder="Order Notes (Optional)"
//             className="border p-3 rounded-lg w-full"
//             value={form.orderNotes}
//             onChange={handleInputChange}
//           />
//           <select
//             name="payment"
//             onChange={handleInputChange}
//             className="border p-3 rounded-lg w-full"
//             value={form.payment}
//           >
//             <option value="">Select Payment Method</option>
//             <option value="cod">Cash on Delivery</option>
//             <option value="online">Online Payment</option>
//           </select>
//         </form>

//         {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

//         <button
//           type="button"
//           onClick={handleOrder}
//           className="mt-6 bg-teal-500 text-white py-3 px-6 rounded-lg w-full hover:bg-teal-600"
//         >
//           Finalize Order
//         </button>
//       </div>

//       {orderSuccess && (
//         <div className="mt-6 text-center">
//           <div className="flex flex-col items-center">
//             <Image
//               src="/favicon.ico"
//               height={40}
//               width={40}
//               alt="Comforty Logo"
//               className="w-20 h-20 mb-4"
//             />
//             <p className="text-teal-600 font-bold text-lg">
//               Thank you for your order! Comforty has successfully placed your
//               order.
//             </p>
//             <p className="text-gray-600 mt-2">
//               Redirecting to your order details...
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CheckoutPage;
'use client';

import Image from "next/image";
import React, { useState } from "react";
import { useCart } from "../context/cartContext";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid"; // For generating unique order IDs

const CheckoutPage: React.FC = () => {
  const { cart, clearCart } = useCart();
  const [form, setForm] = useState({
    name: "",
    address: "",
    country: "",
    city: "",
    zip: "",
    email: "",
    phone: "",
    payment: "",
    shippingMethod: "",
    orderNotes: "",
  });
  const [error, setError] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrder = () => {
    // Validate form
    if (
      !form.name ||
      !form.address ||
      !form.country ||
      !form.city ||
      !form.zip ||
      !form.email ||
      !form.phone ||
      !form.payment ||
      !form.shippingMethod
    ) {
      setError("Please fill in all the fields.");
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setError("");

    // Create a unique order number using UUID
    const orderNumber = uuidv4();

    // Store order details (e.g., in localStorage or send to the backend)
    const orderData = {
      orderNumber,
      name: form.name,
      address: form.address,
      email: form.email,
      phone: form.phone,
      paymentStatus: form.payment === "online" ? "Pending" : "COD",
      shippingMethod: form.shippingMethod,
      orderNotes: form.orderNotes,
      products: cart,
      totalPrice: cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
      shipmentTracking:
        form.shippingMethod === "express" ? "Tracking12345" : "N/A",
    };

    // Store order data in localStorage (or use a backend API to save)
    localStorage.setItem(orderNumber, JSON.stringify(orderData));

    // If online payment is selected, redirect to EasyPaisa
    if (form.payment === "online") {
      window.location.href = "https://www.easypaisa.com.pk/"; // Replace with actual EasyPaisa payment URL
      return;
    }

    // Simulate order success and navigate to the order page
    setOrderSuccess(true);
    setTimeout(() => {
      clearCart(); // Clear the cart
      router.push(`/order?orderNumber=${orderNumber}`); // Redirect to the order details page
    }, 2000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-900">
        Checkout
      </h2>

      <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
        <form className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="First and Last Name"
            className="border p-3 rounded-lg w-full"
            value={form.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="border p-3 rounded-lg w-full"
            value={form.address}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            className="border p-3 rounded-lg w-full"
            value={form.country}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            className="border p-3 rounded-lg w-full"
            value={form.city}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="zip"
            placeholder="ZIP Code"
            className="border p-3 rounded-lg w-full"
            value={form.zip}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="border p-3 rounded-lg w-full"
            value={form.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="border p-3 rounded-lg w-full"
            value={form.phone}
            onChange={handleInputChange}
          />
          <select
            name="shippingMethod"
            onChange={handleInputChange}
            className="border p-3 rounded-lg w-full"
            value={form.shippingMethod}
          >
            <option value="">Select Shipping Method</option>
            <option value="standard">Standard Shipping</option>
            <option value="express">Express Shipping</option>
            <option value="overnight">Overnight Shipping</option>
          </select>
          <textarea
            name="orderNotes"
            placeholder="Order Notes (Optional)"
            className="border p-3 rounded-lg w-full"
            value={form.orderNotes}
            onChange={handleInputChange}
          />
          <select
            name="payment"
            onChange={handleInputChange}
            className="border p-3 rounded-lg w-full"
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
            <Image
              src="/favicon.ico"
              height={40}
              width={40}
              alt="Comforty Logo"
              className="w-20 h-20 mb-4"
            />
            <p className="text-teal-600 font-bold text-lg">
              Thank you for your order! Comforty has successfully placed your
              order.
            </p>
            <p className="text-gray-600 mt-2">
              Redirecting to your order details...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;

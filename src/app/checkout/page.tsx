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
//       router.push(`/order?orderNumber=${orderNumber}`); // Redirect to the order details page
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













// "use client";
// import convertToSubCurrency from '../lib/ConvertToSubCurrency';
// import CheckoutPage from '@/app/Stripe/CheckoutPage';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

// if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
//     throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined');
// }

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// const Checkout = () => {
//     const amount = 49.99;

//     return (
//         <div>
//             <h1 className='text-3xl font-bold text-center'>Complete Your Payment</h1>

//             <Elements
//                 stripe={stripePromise}
//                 options={{
//                     mode: 'payment',
//                     amount: convertToSubCurrency(amount),
//                     currency: 'usd'
//                 }}
//             >
//                 <CheckoutPage amount={amount} />
//             </Elements>
//         </div>
//     );
// };

// export default Checkout;
// "use client";
// import { useState, useEffect } from "react";
// import convertToSubCurrency from "../lib/ConvertToSubCurrency";
// import CheckoutPage from "@/app/Stripe/CheckoutPage";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import jsPDF from "jspdf";

// // Load Stripe
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "");

// // TypeScript Interfaces
// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
// }

// interface OrderDetails {
//   orderNumber: string;
//   name: string;
//   address: string;
//   phone: string;
//   zipCode: string;
//   city: string;
//   paymentStatus: string;
//   products: Product[];
//   totalPrice: number;
//   shipmentTracking: string;
//   shippingMethod: string;
//   orderNotes: string | null;
// }

// const Checkout = () => {
//   const [cartProducts, setCartProducts] = useState<Product[]>([]);
//   const [customerDetails, setCustomerDetails] = useState({
//     name: "",
//     address: "",
//     phone: "",
//     zipCode: "",
//     city: "",
//   });

//   const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
//   const [isPaid, setIsPaid] = useState(false);
//   const [detailsSaved, setDetailsSaved] = useState(false);

//   // Simulate fetching cart products
//   useEffect(() => {
//     const cartData = [
//       { id: "prod_001", name: "Sample Product 1", price: 49.99, quantity: 1 },
//       { id: "prod_002", name: "Sample Product 2", price: 29.99, quantity: 2 },
//     ];
//     setCartProducts(cartData);
//   }, []);

//   // Calculate total price dynamically
//   const totalPrice = cartProducts.reduce((total, product) => total + product.price * product.quantity, 0);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setCustomerDetails({
//       ...customerDetails,
//       [name]: value,
//     });
//   };

//   // Save customer details
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setDetailsSaved(true);
//   };

//   // Handle successful payment
//   const handlePaymentSuccess = () => {
//     const orderNumber = `ORD${Date.now()}`;
//     const orderData: OrderDetails = {
//       orderNumber,
//       ...customerDetails,
//       paymentStatus: "Paid",
//       products: cartProducts,
//       totalPrice,
//       shipmentTracking: "Pending",
//       shippingMethod: "Standard",
//       orderNotes: "Thank you for your purchase!",
//     };

//     localStorage.setItem(orderNumber, JSON.stringify(orderData));
//     setOrderDetails(orderData);
//     setIsPaid(true);
//   };

//   // Download Invoice (PDF)
//   const downloadPDF = () => {
//     if (!orderDetails) return;

//     const doc = new jsPDF();
//     doc.text("Order Invoice", 20, 20);
//     doc.text(`Order Number: ${orderDetails.orderNumber}`, 20, 30);
//     doc.text(`Customer Name: ${orderDetails.name}`, 20, 40);
//     doc.text(`Address: ${orderDetails.address}`, 20, 50);
//     doc.text(`Phone: ${orderDetails.phone}`, 20, 60);
//     doc.text(`Zip Code: ${orderDetails.zipCode}`, 20, 70);
//     doc.text(`City: ${orderDetails.city}`, 20, 80);
//     doc.text(`Total Price: $${orderDetails.totalPrice.toFixed(2)}`, 20, 90);
//     doc.text(`Payment Status: ${orderDetails.paymentStatus}`, 20, 100);
//     doc.text(`Shipping Method: ${orderDetails.shippingMethod}`, 20, 110);
//     doc.text(`Order Notes: ${orderDetails.orderNotes || "N/A"}`, 20, 120);
//     doc.text("Products:", 20, 130);

//     orderDetails.products.forEach((product, index) => {
//       doc.text(
//         `${index + 1}. ${product.name} - $${product.price.toFixed(2)} x ${product.quantity}`,
//         20,
//         140 + index * 10
//       );
//     });

//     doc.save(`Order_${orderDetails.orderNumber}.pdf`);
//   };

//   return (
//     <div className="flex justify-center my-10">
//       <div className="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-10 w-full max-w-6xl">
//         {!isPaid ? (
//           <>
//             {/* Customer Information Form */}
//             <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
//               <h2 className="text-2xl font-bold mb-4">Customer Information</h2>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 {["name", "address", "phone", "zipCode", "city"].map((field) => (
//                   <div key={field}>
//                     <label htmlFor={field} className="block capitalize">
//                       {field}
//                     </label>
//                     <input
//                       type="text"
//                       id={field}
//                       name={field}
//                       value={customerDetails[field as keyof typeof customerDetails]}
//                       onChange={handleInputChange}
//                       className="w-full border border-gray-300 p-3 rounded"
//                       required
//                     />
//                   </div>
//                 ))}
//                 <button
//                   type="submit"
//                   className="bg-teal-600 text-white p-3 rounded w-full mt-4"
//                 >
//                   Submit Details
//                 </button>
//               </form>

//               {detailsSaved && (
//                 <p className="text-green-600 mt-4 font-bold flex items-center">
//                   ✅ Your details have been saved!
//                 </p>
//               )}
//             </div>

//             {/* Stripe Payment Form */}
//             <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
//               <h2 className="text-2xl font-bold mb-4">Complete Your Payment</h2>
//               <Elements
//                 stripe={stripePromise}
//                 options={{
//                   mode: "payment",
//                   amount: convertToSubCurrency(totalPrice > 0 ? totalPrice : 1),
//                   currency: "usd",
//                 }}
//               >
//                 {totalPrice > 0 ? (
//                   <CheckoutPage amount={totalPrice}  />
//                 ) : (
//                   <p className="text-red-500">Your cart is empty. Add products to continue.</p>
//                 )}
//               </Elements>
//             </div>
//           </>
//         ) : (
//           <div className="flex-1 bg-white p-6 rounded-lg shadow-lg text-center">
//             <h2 className="text-2xl font-bold mb-4 text-teal-600">
//               🎉 Thank You for Your Purchase!
//             </h2>
//             <p className="mb-4">Your order details:</p>
//             <div className="text-left border p-4 rounded-lg">
//               <p><strong>Order Number:</strong> {orderDetails?.orderNumber}</p>
//               <p><strong>Total Price:</strong> ${orderDetails?.totalPrice.toFixed(2)}</p>
//               <p><strong>Payment Status:</strong> {orderDetails?.paymentStatus}</p>
//               <p className="font-bold">Products:</p>
//               {orderDetails?.products.map((product, index) => (
//                 <p key={index}>
//                   {index + 1}. {product.name} - ${product.price.toFixed(2)} x {product.quantity}
//                 </p>
//               ))}
//             </div>
//             <button
//               onClick={downloadPDF}
//               className="bg-teal-600 text-white p-3 rounded mt-4"
//             >
//               📄 Download Invoice
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Checkout;
// Checkout.tsx
"use client";
import { useState, useEffect } from "react";
import convertToSubCurrency from "@/app/lib/ConvertToSubCurrency";
import CheckoutPage from "@/app/Stripe/CheckoutPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import jsPDF from "jspdf";

// Load Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "");

// TypeScript Interfaces
interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderDetails {
  orderNumber: string;
  name: string;
  address: string;
  phone: string;
  zipCode: string;
  city: string;
  paymentStatus: string;
  products: Product[];
  totalPrice: number;
  shipmentTracking: string;
  shippingMethod: string;
  orderNotes: string | null;
}

const Checkout = () => {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    address: "",
    phone: "",
    zipCode: "",
    city: "",
  });

  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [detailsSaved, setDetailsSaved] = useState(false);

  // Simulate fetching cart products
  useEffect(() => {
    const cartData = [
      { id: "prod_001", name: "Sample Product 1", price: 49.99, quantity: 1 },
      { id: "prod_002", name: "Sample Product 2", price: 29.99, quantity: 2 },
    ];
    setCartProducts(cartData);
  }, []);

  // Calculate total price dynamically
  const totalPrice = cartProducts.reduce((total, product) => total + product.price * product.quantity, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerDetails({
      ...customerDetails,
      [name]: value,
    });
  };

  // Save customer details
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDetailsSaved(true);
  };

  // Handle successful payment
  const handlePaymentSuccess = () => {
    const orderNumber = `ORD${Date.now()}`;
    const orderData: OrderDetails = {
      orderNumber,
      ...customerDetails,
      paymentStatus: "Paid",
      products: cartProducts,
      totalPrice,
      shipmentTracking: "Pending",
      shippingMethod: "Standard",
      orderNotes: "Thank you for your purchase!",
    };

    localStorage.setItem(orderNumber, JSON.stringify(orderData));
    setOrderDetails(orderData);
    setIsPaid(true);
  };

  // Download Invoice (PDF)
  const downloadPDF = () => {
    if (!orderDetails) return;

    const doc = new jsPDF();
    doc.text("Order Invoice", 20, 20);
    doc.text(`Order Number: ${orderDetails.orderNumber}`, 20, 30);
    doc.text(`Customer Name: ${orderDetails.name}`, 20, 40);
    doc.text(`Address: ${orderDetails.address}`, 20, 50);
    doc.text(`Phone: ${orderDetails.phone}`, 20, 60);
    doc.text(`Zip Code: ${orderDetails.zipCode}`, 20, 70);
    doc.text(`City: ${orderDetails.city}`, 20, 80);
    doc.text(`Total Price: $${orderDetails.totalPrice.toFixed(2)}`, 20, 90);
    doc.text(`Payment Status: ${orderDetails.paymentStatus}`, 20, 100);
    doc.text(`Shipping Method: ${orderDetails.shippingMethod}`, 20, 110);
    doc.text(`Order Notes: ${orderDetails.orderNotes || "N/A"}`, 20, 120);
    doc.text("Products:", 20, 130);

    orderDetails.products.forEach((product, index) => {
      doc.text(
        `${index + 1}. ${product.name} - $${product.price.toFixed(2)} x ${product.quantity}`,
        20,
        140 + index * 10
      );
    });

    doc.save(`Order_${orderDetails.orderNumber}.pdf`);
  };

  return (
    <div className="flex justify-center my-10">
      <div className="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-10 w-full max-w-6xl">
        {!isPaid ? (
          <>
            {/* Customer Information Form */}
            <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Customer Information</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {["name", "address", "phone", "zipCode", "city"].map((field) => (
                  <div key={field}>
                    <label htmlFor={field} className="block capitalize">
                      {field}
                    </label>
                    <input
                      type="text"
                      id={field}
                      name={field}
                      value={customerDetails[field as keyof typeof customerDetails]}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 p-3 rounded"
                      required
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  className="bg-teal-600 text-white p-3 rounded w-full mt-4"
                >
                  Submit Details
                </button>
              </form>

              {detailsSaved && (
                <p className="text-green-600 mt-4 font-bold flex items-center">
                  ✅ Your details have been saved!
                </p>
              )}
            </div>

            {/* Stripe Payment Form */}
            <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Complete Your Payment</h2>
              <Elements
                stripe={stripePromise}
                options={{
                  mode: "payment",
                  amount: convertToSubCurrency(totalPrice > 0 ? totalPrice : 1),
                  currency: "usd",
                }}
              >
                {totalPrice > 0 ? (
                  <CheckoutPage amount={totalPrice} />
                ) : (
                  <p className="text-red-500">Your cart is empty. Add products to continue.</p>
                )}
              </Elements>
            </div>
          </>
        ) : (
          <div className="flex-1 bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4 text-teal-600">
              🎉 Thank You for Your Purchase!
            </h2>
            <p className="mb-4">Your order details:</p>
            <div className="text-left border p-4 rounded-lg">
              <p><strong>Order Number:</strong> {orderDetails?.orderNumber}</p>
              <p><strong>Total Price:</strong> ${orderDetails?.totalPrice.toFixed(2)}</p>
              <p><strong>Payment Status:</strong> {orderDetails?.paymentStatus}</p>
              <p className="font-bold">Products:</p>
              {orderDetails?.products.map((product, index) => (
                <p key={index}>
                  {index + 1}. {product.name} - ${product.price.toFixed(2)} x {product.quantity}
                </p>
              ))}
            </div>
            <button
              onClick={downloadPDF}
              className="bg-teal-600 text-white p-3 rounded mt-4"
            >
              📄 Download Invoice
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;

// "use client";
// import { useState, useEffect } from "react";
// import convertToSubCurrency from "../lib/ConvertToSubCurrency";
// import CheckoutPage from "@/app/Stripe/CheckoutPage";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import jsPDF from "jspdf";

// // Load Stripe
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "");

// // TypeScript Interfaces
// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
// }

// interface OrderDetails {
//   orderNumber: string;
//   name: string;
//   address: string;
//   phone: string;
//   zipCode: string;
//   city: string;
//   paymentStatus: string;
//   products: Product[];
//   totalPrice: number;
//   shipmentTracking: string;
//   shippingMethod: string;
//   orderNotes: string | null;
// }

// const Checkout = () => {
//   // Fetch product details dynamically from cart (Simulating cart)
//   const [cartProducts, setCartProducts] = useState<Product[]>([]);
//   const [customerDetails, setCustomerDetails] = useState({
//     name: "",
//     address: "",
//     phone: "",
//     zipCode: "",
//     city: "",
//   });

//   const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
//   const [isPaid, setIsPaid] = useState(false);
//   const [detailsSaved, setDetailsSaved] = useState(false);

//   // Simulate fetching cart products
//   useEffect(() => {
//     const cartData = [
//       { id: "prod_001", name: "Sample Product 1", price: 49.99, quantity: 1 },
//       { id: "prod_002", name: "Sample Product 2", price: 29.99, quantity: 2 },
//     ];
//     setCartProducts(cartData);
//   }, []);

//   // Calculate total price dynamically
//   const totalPrice = cartProducts.reduce((total, product) => total + product.price * product.quantity, 0);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setCustomerDetails({
//       ...customerDetails,
//       [name]: value,
//     });
//   };

//   // Save customer details
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setDetailsSaved(true); // Show green checkmark message
//   };

//   // Handle successful payment
//   const handlePaymentSuccess = () => {
//     const orderNumber = `ORD${Date.now()}`;
//     const orderData: OrderDetails = {
//       orderNumber,
//       ...customerDetails,
//       paymentStatus: "Paid",
//       products: cartProducts,
//       totalPrice,
//       shipmentTracking: "Pending",
//       shippingMethod: "Standard",
//       orderNotes: "Thank you for your purchase!",
//     };

//     localStorage.setItem(orderNumber, JSON.stringify(orderData));
//     setOrderDetails(orderData);
//     setIsPaid(true);
//   };

//   // Download Invoice (PDF)
//   const downloadPDF = () => {
//     if (!orderDetails) return;

//     const doc = new jsPDF();
//     doc.text("Order Invoice", 20, 20);
//     doc.text(`Order Number: ${orderDetails.orderNumber}`, 20, 30);
//     doc.text(`Customer Name: ${orderDetails.name}`, 20, 40);
//     doc.text(`Address: ${orderDetails.address}`, 20, 50);
//     doc.text(`Phone: ${orderDetails.phone}`, 20, 60);
//     doc.text(`Zip Code: ${orderDetails.zipCode}`, 20, 70);
//     doc.text(`City: ${orderDetails.city}`, 20, 80);
//     doc.text(`Total Price: $${orderDetails.totalPrice.toFixed(2)}`, 20, 90);
//     doc.text(`Payment Status: ${orderDetails.paymentStatus}`, 20, 100);
//     doc.text(`Shipping Method: ${orderDetails.shippingMethod}`, 20, 110);
//     doc.text(`Order Notes: ${orderDetails.orderNotes || "N/A"}`, 20, 120);
//     doc.text("Products:", 20, 130);

//     orderDetails.products.forEach((product, index) => {
//       doc.text(
//         `${index + 1}. ${product.name} - $${product.price.toFixed(2)} x ${product.quantity}`,
//         20,
//         140 + index * 10
//       );
//     });

//     doc.save(`Order_${orderDetails.orderNumber}.pdf`);
//   };

//   return (
//     <div className="flex justify-center my-10">
//       <div className="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-10 w-full max-w-6xl">
//         {!isPaid ? (
//           <>
//             {/* Customer Information Form */}
//             <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
//               <h2 className="text-2xl font-bold mb-4">Customer Information</h2>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 {["name", "address", "phone", "zipCode", "city"].map((field) => (
//                   <div key={field}>
//                     <label htmlFor={field} className="block capitalize">
//                       {field}
//                     </label>
//                     <input
//                       type="text"
//                       id={field}
//                       name={field}
//                       value={customerDetails[field as keyof typeof customerDetails]}
//                       onChange={handleInputChange}
//                       className="w-full border border-gray-300 p-3 rounded"
//                       required
//                     />
//                   </div>
//                 ))}
//                 <button
//                   type="submit"
//                   className="bg-teal-600 text-white p-3 rounded w-full mt-4"
//                 >
//                   Submit Details
//                 </button>
//               </form>

//               {detailsSaved && (
//                 <p className="text-green-600 mt-4 font-bold flex items-center">
//                   ✅ Your details have been saved!
//                 </p>
//               )}
//             </div>

//             {/* Stripe Payment Form */}
//             <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
//               <h2 className="text-2xl font-bold mb-4">Complete Your Payment</h2>
//               <Elements
//                 stripe={stripePromise}
//                 options={{
//                   mode: "payment",
//                   amount: convertToSubCurrency(totalPrice > 0 ? totalPrice : 1),
//                   currency: "usd",
//                 }}
//               >
//                  {totalPrice > 0 ? (
//                  <CheckoutPage amount={totalPrice} />
//                  ) : (
//                  <p className="text-red-500">Your cart is empty. Add products to continue.</p>
//                 )}
//               </Elements>
//             </div>
//           </>
//         ) : (
//           <div className="flex-1 bg-white p-6 rounded-lg shadow-lg text-center">
//             <h2 className="text-2xl font-bold mb-4 text-teal-600">
//               🎉 Thank You for Your Purchase!
//             </h2>
//             <p className="mb-4">Your order details:</p>
//             <div className="text-left border p-4 rounded-lg">
//               <p><strong>Order Number:</strong> {orderDetails?.orderNumber}</p>
//               <p><strong>Total Price:</strong> ${orderDetails?.totalPrice.toFixed(2)}</p>
//               <p><strong>Payment Status:</strong> {orderDetails?.paymentStatus}</p>
//               <p className="font-bold">Products:</p>
//               {orderDetails?.products.map((product, index) => (
//                 <p key={index}>
//                   {index + 1}. {product.name} - ${product.price.toFixed(2)} x {product.quantity}
//                 </p>
//               ))}
//             </div>
//             <button
//               onClick={downloadPDF}
//               className="bg-teal-600 text-white p-3 rounded mt-4"
//             >
//               📄 Download Invoice
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Checkout;

// "use client";
// import { useState } from 'react';
// import convertToSubCurrency from '../lib/ConvertToSubCurrency';
// import CheckoutPage from '@/app/Stripe/CheckoutPage';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

// if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
//     throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined');
// }

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// const Checkout = () => {
//     const amount = 49.99;
//     const [customerDetails, setCustomerDetails] = useState({
//         name: '',
//         address: '',
//         phone: '',
//         zipCode: '',
//         city: ''
//     });

//     const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
//         const { name, value } = e.target;
//         setCustomerDetails({
//             ...customerDetails,
//             [name]: value
//         });
//     };

//     const handleSubmit = (e: { preventDefault: () => void; }) => {
//         e.preventDefault();
//         // Save customer details to localStorage
//         const orderNumber = `ORD${Date.now()}`; // Example order number
//         const orderData = {
//             orderNumber,
//             ...customerDetails,
//             paymentStatus: 'Pending', // You can update this after payment
//             products: [
//                 { name: 'Sample Product', price: amount, quantity: 1 }
//             ],
//             totalPrice: amount,
//             shipmentTracking: '',
//             shippingMethod: 'Standard',
//             orderNotes: null,
//         };
//         localStorage.setItem(orderNumber, JSON.stringify(orderData));
//         // Redirect to OrderPage with orderNumber
//         window.location.href = `/order?orderNumber=${orderNumber}`;
//     };

//     return (
//         <div className="flex justify-center my-10">
//             <div className="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-10 w-full max-w-6xl">
//                 {/* Customer Information Form (Left Side) */}
//                 <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
//                     <h2 className="text-2xl font-bold mb-4">Customer Information</h2>
//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <div>
//                             <label htmlFor="name" className="block">Name</label>
//                             <input
//                                 type="text"
//                                 id="name"
//                                 name="name"
//                                 value={customerDetails.name}
//                                 onChange={handleInputChange}
//                                 className="w-full border border-gray-300 p-3 rounded"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="address" className="block">Address</label>
//                             <input
//                                 type="text"
//                                 id="address"
//                                 name="address"
//                                 value={customerDetails.address}
//                                 onChange={handleInputChange}
//                                 className="w-full border border-gray-300 p-3 rounded"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="phone" className="block">Phone Number</label>
//                             <input
//                                 type="tel"
//                                 id="phone"
//                                 name="phone"
//                                 value={customerDetails.phone}
//                                 onChange={handleInputChange}
//                                 className="w-full border border-gray-300 p-3 rounded"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="zipCode" className="block">Zip Code</label>
//                             <input
//                                 type="text"
//                                 id="zipCode"
//                                 name="zipCode"
//                                 value={customerDetails.zipCode}
//                                 onChange={handleInputChange}
//                                 className="w-full border border-gray-300 p-3 rounded"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="city" className="block">City</label>
//                             <input
//                                 type="text"
//                                 id="city"
//                                 name="city"
//                                 value={customerDetails.city}
//                                 onChange={handleInputChange}
//                                 className="w-full border border-gray-300 p-3 rounded"
//                                 required
//                             />
//                         </div>
//                         <button type="submit" className="bg-teal-600 text-white p-3 rounded w-full mt-4">Submit</button>
//                     </form>
//                 </div>

//                 {/* Stripe Payment Form (Right Side) */}
//                 <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
//                     <h2 className="text-2xl font-bold mb-4">Complete Your Payment</h2>
//                     <Elements
//                         stripe={stripePromise}
//                         options={{
//                             mode: 'payment',
//                             amount: convertToSubCurrency(amount),
//                             currency: 'usd'
//                         }}
//                     >
//                         <CheckoutPage amount={amount} />
//                     </Elements>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Checkout;

// "use client";

// import { useState, useEffect } from "react";
// import convertToSubCurrency from "../lib/ConvertToSubCurrency";
// import CheckoutPage from "@/app/Stripe/CheckoutPage";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
// );

// const Checkout = () => {
//   const amount = 49.99;
//   const [customerDetails, setCustomerDetails] = useState({
//     name: "",
//     address: "",
//     phone: "",
//     zipCode: "",
//     city: "",
//   });

//   const handleInputChange = (e: { target: { name: string; value: string } }) => {
//     const { name, value } = e.target;
//     setCustomerDetails({
//       ...customerDetails,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e: { preventDefault: () => void }) => {
//     e.preventDefault();
//     if (typeof window !== "undefined") {
//       // Ensure this runs only in the browser
//       const orderNumber = `ORD${Date.now()}`;
//       const orderData = {
//         orderNumber,
//         ...customerDetails,
//         paymentStatus: "Pending",
//         products: [{ name: "Sample Product", price: amount, quantity: 1 }],
//         totalPrice: amount,
//         shipmentTracking: "",
//         shippingMethod: "Standard",
//         orderNotes: null,
//       };

//       localStorage.setItem(orderNumber, JSON.stringify(orderData));
//       window.location.href = `/order?orderNumber=${orderNumber}`;
//     }
//   };

//   return (
//     <div className="flex justify-center my-10">
//       <div className="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-10 w-full max-w-6xl">
//         {/* Customer Information Form */}
//         <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
//           <h2 className="text-2xl font-bold mb-4">Customer Information</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {["name", "address", "phone", "zipCode", "city"].map((field) => (
//               <div key={field}>
//                 <label htmlFor={field} className="block capitalize">
//                   {field}
//                 </label>
//                 <input
//                   type="text"
//                   id={field}
//                   name={field}
//                   value={customerDetails[field as keyof typeof customerDetails]}
//                   onChange={handleInputChange}
//                   className="w-full border border-gray-300 p-3 rounded"
//                   required
//                 />
//               </div>
//             ))}
//             <button
//               type="submit"
//               className="bg-teal-600 text-white p-3 rounded w-full mt-4"
//             >
//               Submit
//             </button>
//           </form>
//         </div>

//         {/* Stripe Payment Form */}
//         <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
//           <h2 className="text-2xl font-bold mb-4">Complete Your Payment</h2>
//           <Elements
//             stripe={stripePromise}
//             options={{
//               mode: "payment",
//               amount: convertToSubCurrency(amount),
//               currency: "usd",
//             }}
//           >
//             <CheckoutPage amount={amount} />
//           </Elements>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;




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

//   const handleOrder = async () => {
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

//     // Calculate total price
//     const totalPrice = cart.reduce(
//       (total, item) => total + item.price * item.quantity,
//       0
//     );

//     // If online payment is selected, redirect to Stripe
//     if (form.payment === "online") {
//       try {
//         // Call your backend to create a payment intent
//         const response = await fetch('/api/payment-intent/route.ts', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ amount: totalPrice * 100 }), // Amount in subunits
//         });

//         const data = await response.json();
//         if (data.clientSecret) {
//           // Redirect to Stripe Payment Page
//           router.push(`/Stripe/StripePayment?clientSecret=${data.clientSecret}&amount=${totalPrice}`);
//         } else {
//           setError("Failed to initialize payment. Please try again.");
//         }
//       } catch (err) {
//         setError("An error occurred while processing your payment.");
//       }
//       return;
//     }

//     // Store order details locally or send to backend for COD
//     const orderData = {
//       orderNumber,
//       name: form.name,
//       address: form.address,
//       email: form.email,
//       phone: form.phone,
//       paymentStatus: "COD",
//       shippingMethod: form.shippingMethod,
//       orderNotes: form.orderNotes,
//       products: cart,
//       totalPrice,
//       shipmentTracking:
//         form.shippingMethod === "express" ? "Tracking12345" : "N/A",
//     };

//     localStorage.setItem(orderNumber, JSON.stringify(orderData));

//     // Simulate order success and navigate to the order page
//     setOrderSuccess(true);
//     setTimeout(() => {
//       clearCart(); // Clear the cart
//       router.push(`/order?orderNumber=${orderNumber}`); // Redirect to the order details page
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

// "use client";

// import React, { useState } from "react";
// import { useCart } from "../context/cartContext";
// import { useRouter } from "next/navigation";
// import { v4 as uuidv4 } from "uuid";

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

//   const handleOrder = async () => {
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

//     // Generate a unique order number
//     const orderNumber = uuidv4();

//     // Calculate total price
//     const totalPrice = cart.reduce(
//       (total, item) => total + item.price * item.quantity,
//       0
//     );

//     // If online payment is selected, redirect to JazzCash
//     if (form.payment === "online") {
//       try {
//         const response = await fetch("/api/jazzcash", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ amount: totalPrice, orderId: orderNumber }),
//         });

//         const data = await response.json();
//         console.log("JazzCash API Response:", data); // Log the response for debugging

//         if (data.paymentUrl) {
//           window.location.href = data.paymentUrl; // Redirect to payment gateway
//         } else {
//           setError("Failed to initiate payment. Please try again.");
//         }
//       } catch (err) {
//         console.error("Payment Error:", err); // Log the error for debugging
//         setError("An error occurred while processing your payment.");
//       }
//       return;
//     }

//     // Store order details in localStorage (or send to backend)
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
//       totalPrice,
//       shipmentTracking:
//         form.shippingMethod === "express" ? "Tracking12345" : "N/A",
//     };

//     localStorage.setItem(orderNumber, JSON.stringify(orderData));

//     // Simulate order success
//     setOrderSuccess(true);
//     setTimeout(() => {
//       clearCart();
//       router.push(`/order?orderNumber=${orderNumber}`);
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
//             <option value="online">Online Payment (JazzCash)</option>
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
//           <p className="text-teal-600 font-bold text-lg">
//             Thank you for your order! Your order has been successfully placed.
//           </p>
//           <p className="text-gray-600 mt-2">
//             Redirecting to your order details...
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CheckoutPage;

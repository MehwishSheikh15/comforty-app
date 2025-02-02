// // OrderPage.tsx
// 'use client'
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import Link from 'next/link'; // Import Link from next/link

// // Define the interface for the order details
// interface Product {
//   name: string;
//   price: number;
//   quantity: number;
// }

// interface OrderDetails {
//   orderNumber: string;
//   name: string;
//   address: string;
//   country: string;
//   city: string;
//   zip: string;
//   email: string;
//   phone: string;
//   paymentStatus: string;
//   shippingMethod: string;
//   orderNotes: string | null;
//   products: Product[];
//   totalPrice: number;
//   shipmentTracking: string;
// }

// const OrderPage = () => {
//   const router = useRouter();
//   const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

//   useEffect(() => {
//     // Get the order number from the URL
//     const urlParams = new URLSearchParams(window.location.search);
//     const orderNumber = urlParams.get('orderNumber');

//     if (orderNumber) {
//       // Retrieve the order data from localStorage
//       const storedOrderData = localStorage.getItem(orderNumber);
//       if (storedOrderData) {
//         setOrderDetails(JSON.parse(storedOrderData));
//       }
//     }
//   }, []);

//   if (!orderDetails) {
//     return <p>Loading order details...</p>;
//   }

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-3xl font-bold text-center mb-6 text-indigo-900">
//         Order Details
//       </h2>

//       <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
//         <h3 className="text-2xl font-semibold mb-4">Order #{orderDetails.orderNumber}</h3>
//         <p><strong>Name:</strong> {orderDetails.name}</p>
//         <p><strong>Email:</strong> {orderDetails.email}</p>
//         <p><strong>Phone:</strong> {orderDetails.phone}</p>
//         <p><strong>Address:</strong> {orderDetails.address}</p>
//         <p><strong>Shipping Method:</strong> {orderDetails.shippingMethod}</p>
//         <p><strong>Payment Method:</strong> {orderDetails.paymentStatus}</p>
//         <p><strong>Total Price:</strong> ${orderDetails.totalPrice}</p>
//         <p><strong>Order Notes:</strong> {orderDetails.orderNotes || 'None'}</p>

//         <h4 className="text-xl font-semibold mt-6 mb-4">Products:</h4>
//         <ul>
//           {orderDetails.products.map((product, index) => (
//             <li key={index} className="mb-2">
//               <p>{product.name} - ${product.price} x {product.quantity}</p>
//             </li>
//           ))}
//         </ul>

//         {/* Use Link component from Next.js to navigate to the ShipmentPage with tracking number */}
//         <Link href={`/shipment?trackingNumber=${orderDetails.shipmentTracking}`}>
//           <button
//             className="mt-6 bg-teal-500 text-white py-3 px-6 rounded-lg w-full hover:bg-teal-600"
//           >
//             Go to Shipment Tracking
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default OrderPage;
// 'use client'

// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import Link from 'next/link';

// interface Product {
//   name: string;
//   price: number;
//   quantity: number;
// }

// interface OrderDetails {
//   orderNumber: string;
//   name: string;
//   address: string;
//   country: string;
//   city: string;
//   zip: string;
//   email: string;
//   phone: string;
//   paymentStatus: string;
//   shippingMethod: string;
//   orderNotes: string | null;
//   products: Product[];
//   totalPrice: number;
//   shipmentTracking: string;
// }

// const OrderPage = () => {
//   const router = useRouter();
//   const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const orderNumber = urlParams.get('orderNumber');

//     if (orderNumber) {
//       const storedOrderData = localStorage.getItem(orderNumber);
//       if (storedOrderData) {
//         setOrderDetails(JSON.parse(storedOrderData));
//       }
//     }
//   }, []);

//   if (!orderDetails) {
//     return <p>Loading order details...</p>;
//   }

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-3xl font-bold text-center mb-6 text-indigo-900">
//         Order Details
//       </h2>

//       <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
//         <h3 className="text-2xl font-semibold mb-4">Order #{orderDetails.orderNumber}</h3>
//         <p><strong>Name:</strong> {orderDetails.name}</p>
//         <p><strong>Email:</strong> {orderDetails.email}</p>
//         <p><strong>Phone:</strong> {orderDetails.phone}</p>
//         <p><strong>Address:</strong> {orderDetails.address}</p>
//         <p><strong>Shipping Method:</strong> {orderDetails.shippingMethod}</p>
//         <p><strong>Payment Method:</strong> {orderDetails.paymentStatus}</p>
//         <p><strong>Total Price:</strong> ${orderDetails.totalPrice}</p>
//         <p><strong>Order Notes:</strong> {orderDetails.orderNotes || 'None'}</p>

//         <h4 className="text-xl font-semibold mt-6 mb-4">Products:</h4>
//         <ul>
//           {orderDetails.products.map((product, index) => (
//             <li key={index} className="mb-2">
//               <p>{product.name} - ${product.price} x {product.quantity}</p>
//             </li>
//           ))}
//         </ul>

//         {/* Correct Link to Shipment Page */}
//         <Link href={`/Shipment?trackingNumber=${orderDetails.shipmentTracking}`}>
//           <button className="mt-6 bg-teal-500 text-white py-3 px-6 rounded-lg w-full hover:bg-teal-600">
//             Go to Shipment Tracking
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default OrderPage;

// 'use client';

// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import Link from 'next/link';

// interface Product {
//   name: string;
//   price: number;
//   quantity: number;
// }

// interface OrderDetails {
//   orderNumber: string;
//   name: string;
//   address: string;
//   country: string;
//   city: string;
//   zip: string;
//   email: string;
//   phone: string;
//   paymentStatus: string;
//   shippingMethod: string;
//   orderNotes: string | null;
//   products: Product[];
//   totalPrice: number;
//   shipmentTracking: string;
// }

// const OrderPage = () => {
//   const router = useRouter();
//   const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const orderNumber = urlParams.get('orderNumber');

//     if (orderNumber) {
//       const storedOrderData = localStorage.getItem(orderNumber);
//       if (storedOrderData) {
//         setOrderDetails(JSON.parse(storedOrderData));
//       }
//     }
//   }, []);

//   if (!orderDetails) {
//     return (
//       <div className="p-6 max-w-4xl mx-auto text-center">
//         <h2 className="text-3xl font-bold text-indigo-900 mb-4">Order Details</h2>
//         <p className="text-lg text-gray-700">No details available.</p>
//         <Link href="/Shipment">
//           <button className="mt-6 bg-teal-500 text-white py-3 px-6 rounded-lg hover:bg-teal-600">
//             Go to Shipment Tracking
//           </button>
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-3xl font-bold text-center mb-6 text-indigo-900">
//         Order Details
//       </h2>

//       <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
//         <h3 className="text-2xl font-semibold mb-4">Order #{orderDetails.orderNumber}</h3>
//         <p><strong>Name:</strong> {orderDetails.name}</p>
//         <p><strong>Email:</strong> {orderDetails.email}</p>
//         <p><strong>Phone:</strong> {orderDetails.phone}</p>
//         <p><strong>Address:</strong> {orderDetails.address}</p>
//         <p><strong>Shipping Method:</strong> {orderDetails.shippingMethod}</p>
//         <p><strong>Payment Method:</strong> {orderDetails.paymentStatus}</p>
//         <p><strong>Total Price:</strong> ${orderDetails.totalPrice}</p>
//         <p><strong>Order Notes:</strong> {orderDetails.orderNotes || 'None'}</p>

//         <h4 className="text-xl font-semibold mt-6 mb-4">Products:</h4>
//         <ul>
//           {orderDetails.products.map((product, index) => (
//             <li key={index} className="mb-2">
//               <p>{product.name} - ${product.price} x {product.quantity}</p>
//             </li>
//           ))}
//         </ul>

//         {/* Correct Link to Shipment Page */}
//         <Link href={`/Shipment?trackingNumber=${orderDetails.shipmentTracking}`}>
//           <button className="mt-6 bg-teal-500 text-white py-3 px-6 rounded-lg w-full hover:bg-teal-600">
//             Go to Shipment Tracking
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default OrderPage;
// "use client";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import Link from "next/link";

// interface Product {
//   name: string;
//   price: number;
//   quantity: number;
// }

// interface OrderDetails {
//   orderNumber: string;
//   name: string;
//   address: string;
//   country: string;
//   city: string;
//   zip: string;
//   email: string;
//   phone: string;
//   paymentStatus: string;
//   shippingMethod: string;
//   orderNotes: string | null;
//   products: Product[];
//   totalPrice: number;
//   shipmentTracking: string;
// }

// const OrderPage = () => {
//   const router = useRouter();
//   const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const orderNumber = urlParams.get("orderNumber");

//     if (orderNumber) {
//       const storedOrderData = localStorage.getItem(orderNumber);
//       if (storedOrderData) {
//         setOrderDetails(JSON.parse(storedOrderData));
//       }
//     }
//   }, []);

//   if (!orderDetails) {
//     return (
//       <div className="p-6 max-w-4xl mx-auto text-center">
//         <h2 className="text-3xl font-bold text-indigo-900 mb-4">Order Details</h2>
//         <p className="text-lg text-gray-700">No details available.</p>
//         <Link href="/Shipment">
//           <button className="mt-6 bg-teal-500 text-white py-3 px-6 rounded-lg hover:bg-teal-600">
//             Go to Shipment Tracking
//           </button>
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-3xl font-bold text-center mb-6 text-indigo-900">Order Details</h2>

//       <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
//         <h3 className="text-2xl font-semibold mb-4">Order #{orderDetails.orderNumber}</h3>
//         <p><strong>Name:</strong> {orderDetails.name}</p>
//         <p><strong>Email:</strong> {orderDetails.email}</p>
//         <p><strong>Phone:</strong> {orderDetails.phone}</p>
//         <p><strong>Address:</strong> {orderDetails.address}</p>
//         <p><strong>Shipping Method:</strong> {orderDetails.shippingMethod}</p>
//         <p><strong>Payment Method:</strong> {orderDetails.paymentStatus}</p>
//         <p><strong>Total Price:</strong> ${orderDetails.totalPrice}</p>
//         <p><strong>Order Notes:</strong> {orderDetails.orderNotes || 'None'}</p>

//         <h4 className="text-xl font-semibold mt-6 mb-4">Products:</h4>
//         <ul>
//           {orderDetails.products.map((product, index) => (
//             <li key={index} className="mb-2">
//               <p>{product.name} - ${product.price} x {product.quantity}</p>
//             </li>
//           ))}
//         </ul>

//         <Link href={`/Shipment?trackingNumber=${orderDetails.shipmentTracking}`}>
//           <button className="mt-6 bg-teal-500 text-white py-3 px-6 rounded-lg w-full hover:bg-teal-600">
//             Go to Shipment Tracking
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default OrderPage;
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  name: string;
  price: number;
  quantity: number;
}

interface OrderDetails {
  orderNumber: string;
  name: string;
  address: string;
  country: string;
  city: string;
  zip: string;
  email: string;
  phone: string;
  paymentStatus: string;
  shippingMethod: string;
  orderNotes: string | null;
  products: Product[];
  totalPrice: number;
  shipmentTracking: string;
}

const OrderPage = () => {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderNumber = urlParams.get("orderNumber");

    if (orderNumber) {
      const storedOrderData = localStorage.getItem(orderNumber);
      if (storedOrderData) {
        setOrderDetails(JSON.parse(storedOrderData));
      }
    }
  }, []);

  if (!orderDetails) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-indigo-900 mb-4">Order Details</h2>
        <p className="text-lg text-gray-700">No details available.</p>
        <Link href="/Shipment">
          <button className="mt-6 bg-teal-500 text-white py-3 px-6 rounded-lg hover:bg-teal-600">
            Go to Shipment Tracking
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-900">Order Details</h2>

      <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-4">Order #{orderDetails.orderNumber}</h3>
        <p><strong>Name:</strong> {orderDetails.name}</p>
        <p><strong>Email:</strong> {orderDetails.email}</p>
        <p><strong>Phone:</strong> {orderDetails.phone}</p>
        <p><strong>Address:</strong> {orderDetails.address}</p>
        <p><strong>Shipping Method:</strong> {orderDetails.shippingMethod}</p>
        <p><strong>Payment Method:</strong> {orderDetails.paymentStatus}</p>
        <p><strong>Total Price:</strong> ${orderDetails.totalPrice}</p>
        <p><strong>Order Notes:</strong> {orderDetails.orderNotes || 'None'}</p>

        <h4 className="text-xl font-semibold mt-6 mb-4">Products:</h4>
        <ul>
          {orderDetails.products.map((product, index) => (
            <li key={index} className="mb-2">
              <p>{product.name} - ${product.price} x {product.quantity}</p>
            </li>
          ))}
        </ul>

        <Link href={`/Shipment?trackingNumber=${orderDetails.shipmentTracking}`}>
          <button className="mt-6 bg-teal-500 text-white py-3 px-6 rounded-lg w-full hover:bg-teal-600">
            Go to Shipment Tracking
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OrderPage;

'use client'; // Ensure the component is client-side only

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for routing
import { useSearchParams } from 'next/navigation'; // Import useSearchParams to access query params

const OrderPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Get the search params
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const orderNumber = searchParams.get('orderNumber'); // Access query parameter using searchParams

    if (orderNumber) {
      const storedOrder = localStorage.getItem(orderNumber);
      if (storedOrder) {
        setOrderData(JSON.parse(storedOrder));
      } else {
        router.push('/'); // Redirect to homepage if order not found
      }
    }

    setLoading(false); // Set loading to false after the query is processed
  }, [searchParams, router]);

  if (loading) return <p>Loading...</p>;

  if (!orderData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-xl">Order not found.</p>
      </div>
    );
  }
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-900">Order Summary</h2>

      <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
        <p><strong>Order Number:</strong> {orderData.orderNumber}</p>
        <p><strong>Name:</strong> {orderData.name}</p>
        <p><strong>Address:</strong> {orderData.address}</p>
        <p><strong>Email:</strong> {orderData.email}</p>
        <p><strong>Phone:</strong> {orderData.phone}</p>
        <p><strong>Payment Status:</strong> {orderData.paymentStatus}</p>
        <p><strong>Shipping Method:</strong> {orderData.shippingMethod}</p>
        <p><strong>Shipment Tracking:</strong> {orderData.shipmentTracking}</p>

        <h3 className="text-xl font-semibold mt-4">Ordered Products:</h3>
        <ul>
          {orderData.products.map((product: any, index: number) => (
            <li key={index} className="border-b py-2">
              <p>{product.name} (x{product.quantity}) - ${product.price}</p>
            </li>
          ))}
        </ul>

        <p className="mt-4"><strong>Total Price:</strong> ${orderData.totalPrice}</p>
      </div>
    </div>
  );
};

export default OrderPage;


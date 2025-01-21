'use client'; // Ensure the component is client-side only
export const dynamic = 'force-dynamic'; // Force dynamic rendering

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

interface OrderData {
  orderNumber: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  paymentStatus: string;
  shippingMethod: string;
  shipmentTracking: string;
  products: {
    name: string;
    quantity: number;
    price: number;
  }[];
  totalPrice: number;
}

const OrderPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const orderNumber = searchParams.get('orderNumber'); // Access query parameter

    if (orderNumber) {
      const storedOrder = localStorage.getItem(orderNumber);

      if (storedOrder) {
        setOrderData(JSON.parse(storedOrder) as OrderData);
      } else {
        router.push('/Home'); // Redirect if order not found
      }
    } else {
      router.push('/Home'); // Redirect if no order number is provided
    }

    setLoading(false); // Stop loading after processing
  }, [searchParams, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-xl">Loading...</p>
      </div>
    );
  }

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
        <p>
          <strong>Order Number:</strong> {orderData.orderNumber}
        </p>
        <p>
          <strong>Name:</strong> {orderData.name}
        </p>
        <p>
          <strong>Address:</strong> {orderData.address}
        </p>
        <p>
          <strong>Email:</strong> {orderData.email}
        </p>
        <p>
          <strong>Phone:</strong> {orderData.phone}
        </p>
        <p>
          <strong>Payment Status:</strong> {orderData.paymentStatus}
        </p>
        <p>
          <strong>Shipping Method:</strong> {orderData.shippingMethod}
        </p>
        <p>
          <strong>Shipment Tracking:</strong> {orderData.shipmentTracking}
        </p>

        <h3 className="text-xl font-semibold mt-4">Ordered Products:</h3>
        <ul>
          {orderData.products.map((product, index) => (
            <li key={index} className="border-b py-2">
              <p>
                {product.name} (x{product.quantity}) - ${product.price}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-4">
          <strong>Total Price:</strong> ${orderData.totalPrice}
        </p>
      </div>
    </div>
  );
};

export default OrderPage;

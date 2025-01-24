'use client'; // Ensure this is at the top of the file

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import from next/navigation

// Define the interface for the order
interface Order {
  id: number;
  date: string;
  status: string;
  trackingNumber: string;
}

const ShipmentPage = () => {
  const [trackingNumber, setTrackingNumber] = useState<string>('');
  const [trackingStatus, setTrackingStatus] = useState<string | null>(null);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);

  const router = useRouter(); // Get the router to access query parameters

  useEffect(() => {
    const params = new URLSearchParams(window.location.search); // Access query params from URL
    const trackingNumberParam = params.get('trackingNumber');
    if (trackingNumberParam) {
      setTrackingNumber(trackingNumberParam);
    }
  }, []);

  // Dummy order history data
  const dummyOrderHistory: Order[] = [
    { id: 1, date: '2025-01-10', status: 'Delivered', trackingNumber: '123ABC' },
    { id: 2, date: '2025-01-15', status: 'Shipped', trackingNumber: '456DEF' },
    { id: 3, date: '2025-01-20', status: 'Processing', trackingNumber: '789GHI' },
  ];

  const handleTrackOrder = () => {
    // Simulate tracking API call
    const order = dummyOrderHistory.find(
      (order) => order.trackingNumber === trackingNumber
    );
    if (order) {
      setTrackingStatus(order.status);
    } else {
      setTrackingStatus('Order not found');
    }
  };

  const handleOrderHistory = () => {
    // Simulate fetching order history (could be from an API)
    setOrderHistory(dummyOrderHistory);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Shipment Tracking</h1>

      {/* Track Order Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Track Your Order</h2>
        <input
          type="text"
          placeholder="Enter tracking number"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-64 mr-4"
        />
        <button
          onClick={handleTrackOrder}
          className="bg-green-600 text-white p-2 rounded-md hover:bg-teal-600"
        >
          Track Order
        </button>
        {trackingStatus && (
          <p className="mt-4 text-lg font-medium">{trackingStatus}</p>
        )}
      </div>

      {/* Order History Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Order History</h2>
        <button
          onClick={handleOrderHistory}
          className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 mb-4"
        >
          Show Order History
        </button>
        {orderHistory.length > 0 ? (
          <ul className="space-y-4">
            {orderHistory.map((order) => (
              <li key={order.id} className="p-4 border border-gray-300 rounded-md">
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Date:</strong> {order.date}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Tracking Number:</strong> {order.trackingNumber}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4">No order history available.</p>
        )}
      </div>
    </div>
  );
};

export default ShipmentPage;

// 'use client';
// interface IParams {
//     searchParams: {
//         amount: number
//     }
// }

// const PaymentSuccess = ({ searchParams }: IParams) => {
//     return (
//         <div className="text-center w-full">
//             <h1 className="text-6xl">Thank you for purchasing </h1>
//         </div>
//     )
// }

// export default PaymentSuccess
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface IParams {
    searchParams: {
        amount: string | number; // Amount can be a string or number
    };
}

const PaymentSuccess = ({ searchParams }: IParams) => {
    const router = useRouter();

    // Ensure amount is treated as a number
    const amount = typeof searchParams.amount === "string" ? parseFloat(searchParams.amount) : searchParams.amount;

    // Retrieve the order number from localStorage
    const orderNumber = localStorage.getItem("orderNumber");

    useEffect(() => {
     
        

        const timer = setTimeout(() => {
            // Redirect to the order page with order number in query params
            router.push(`/Home`);
        }, 3000);

        // Clean up the timer if the component unmounts
        return () => clearTimeout(timer);
    }, [router, orderNumber]);

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600">
            <div className="text-center text-white p-8 rounded-lg shadow-lg bg-opacity-80 max-w-lg mx-auto">
                <h1 className="text-6xl font-extrabold mb-4 animate__animated animate__fadeIn animate__delay-1s">
                    Thank You for Your Purchase!
                </h1>
                <p className="text-xl mb-6 animate__animated animate__fadeIn animate__delay-2s">
                    Your order has been processed successfully.
                </p>
                {/* <div className="text-lg animate__animated animate__fadeIn animate__delay-3s">
                    <p>Redirecting you to your order details...</p>
                </div> */}
            </div>
        </div>
    );
};

export default PaymentSuccess;
// 'use client'
// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'

// interface IParams {
//     searchParams: {
//         amount: string | number;
//     };
// }

// const PaymentSuccess = ({ searchParams }: IParams) => {
//     const router = useRouter()
//     const [orderDetails, setOrderDetails] = useState<any>(null)

//     // Ensure amount is treated as a number
//     const amount =
//         typeof searchParams.amount === 'string'
//             ? parseFloat(searchParams.amount)
//             : searchParams.amount

//     // Retrieve the order number and order details from localStorage
//     const orderNumber = localStorage.getItem('orderNumber')

//     useEffect(() => {
//         if (orderNumber) {
//             const storedOrder = localStorage.getItem(orderNumber)
//             if (storedOrder) {
//                 const orderData = JSON.parse(storedOrder)
//                 setOrderDetails(orderData)  // Store order data in state
//             }
//         }

//         // Redirect after a delay (e.g., 3 seconds)
//         const timer = setTimeout(() => {
//             router.push('/Home')
//         }, 3000)

//         return () => clearTimeout(timer)
//     }, [router, orderNumber])

//     return (
//         <div className="flex justify-center items-center h-screen bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600">
//             <div className="text-center text-white p-8 rounded-lg shadow-lg bg-opacity-80 max-w-lg mx-auto">
//                 <h1 className="text-6xl font-extrabold mb-4 animate__animated animate__fadeIn animate__delay-1s">
//                     Thank You for Your Purchase!
//                 </h1>
//                 <p className="text-xl mb-6 animate__animated animate__fadeIn animate__delay-2s">
//                     Your order has been processed successfully.
//                 </p>

//                 {/* Display Order Details */}
//                 {orderDetails && (
//                     <div className="text-left border p-4 rounded-lg mt-8">
//                         <p>
//                             <strong>Order Number:</strong> {orderDetails.orderNumber}
//                         </p>
//                         <p>
//                             <strong>Customer Name:</strong> {orderDetails.name}
//                         </p>
//                         <p>
//                             <strong>Address:</strong> {orderDetails.address}
//                         </p>
//                         <p>
//                             <strong>Phone:</strong> {orderDetails.phone}
//                         </p>
//                         <p>
//                             <strong>City:</strong> {orderDetails.city}
//                         </p>
//                         <p>
//                             <strong>Zip Code:</strong> {orderDetails.zipCode}
//                         </p>
//                         <p>
//                             <strong>Shipping Method:</strong> {orderDetails.shippingMethod}
//                         </p>
//                         <p>
//                             <strong>Total Price:</strong> ${orderDetails.totalPrice.toFixed(2)}
//                         </p>
//                         <p>
//                             <strong>Payment Status:</strong> {orderDetails.paymentStatus}
//                         </p>

//                         <h3 className="mt-4 font-semibold">Products:</h3>
//                         {orderDetails.products && orderDetails.products.length > 0 ? (
//                             orderDetails.products.map((product: any, index: number) => (
//                                 <p key={index}>
//                                     {product.name} - ${product.price.toFixed(2)} x {product.quantity}
//                                 </p>
//                             ))
//                         ) : (
//                             <p>No products found</p>
//                         )}
//                     </div>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default PaymentSuccess

// "use client";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// interface IParams {
//     searchParams: {
//         amount: string | number; // Amount can be a string or number
//     };
// }

// const PaymentSuccess = ({ searchParams }: IParams) => {
//     const router = useRouter();

//     // Ensure amount is treated as a number
//     const amount = typeof searchParams.amount === "string" ? parseFloat(searchParams.amount) : searchParams.amount;

//     // Redirect to the order page after 3 seconds
//     useEffect(() => {
//         const timer = setTimeout(() => {
//             router.push("/order"); // Navigate to the order page
//         }, 3000);

//         // Clean up the timer if component unmounts
//         return () => clearTimeout(timer);
//     }, [router]);

//     return (
//         <div className="flex justify-center items-center h-screen bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600">
//             <div className="text-center text-white p-8 rounded-lg shadow-lg bg-opacity-80 max-w-lg mx-auto">
//                 <h1 className="text-6xl font-extrabold mb-4 animate__animated animate__fadeIn animate__delay-1s">
//                     Thank You for Your Purchase!
//                 </h1>
//                 <p className="text-xl mb-6 animate__animated animate__fadeIn animate__delay-2s">
//                     Your order has been processed successfully.
//                 </p>
//                 <div className="text-lg animate__animated animate__fadeIn animate__delay-3s">
//                     <p>Redirecting you to your order details...</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PaymentSuccess;


'use client';
import React from "react";
import { useCart } from "../context/cartContext"; 
import Link from "next/link";
import Image from "next/image";

type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
  priceNumeric: number;
};

const featuredProducts: Product[] = [
  { id: 1, image: '/product1.png', name: 'Comfort Chair', price: '$99.99', priceNumeric: 99.99 },
  { id: 2, image: '/product2.png', name: 'Modern Office Chair', price: '$129.99', priceNumeric: 129.99 },
  { id: 3, image: '/product3.png', name: 'Ergonomic Chair', price: '$149.99', priceNumeric: 149.99 },
  { id: 4, image: '/product4.png', name: 'Executive Leather Chair', price: '$199.99', priceNumeric: 199.99 },
  { id: 5, image: '/product5.png', name: 'Reclining Chair', price: '$249.99', priceNumeric: 249.99 },
];

const HomePage: React.FC = () => {
  const { addToCart } = useCart(); // Use the cart context to add items to the cart

  const handleAddToCart = (product: Product) => {
    // Transform product into CartItem by adding quantity
    const cartItem = { ...product, quantity: 1 };
    addToCart(cartItem); // Add the product to the cart with quantity 1
  };

  return (
    <div className="py-16 bg-gray-50">
      {/* Main Section with Image on Left and Content on Right */}
      <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center lg:space-x-8">
        {/* Left Side - Image */}
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <Image
            src="/product6.png" // Replace with your image path
            alt="Library Stool Chair"
            className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Right Side - Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">
            Library Stool Chair
          </h2>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            This is a comfortable and stylish library stool chair. Perfect for
            reading, studying, or relaxing in any room. It combines great
            design with functionality.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-center lg:justify-start">
            <button className="bg-[#029FAE] text-white py-2 px-6 rounded-full shadow-md hover:bg-[#027a8b] transition-colors duration-300">
              $20.00 USD
            </button>
            <button
              onClick={() => handleAddToCart({ id: 6, name: 'Library Stool Chair', price: '$20.00', image: '/product6.png', priceNumeric: 20.00 })}
              className="bg-[#029FAE] text-white py-2 px-4 rounded-full shadow-md flex items-center justify-center hover:bg-[#027a8b] transition-colors duration-300"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/2543/2543369.png"
                alt="Add to Cart"
                className="h-5 w-5 mr-2"
              />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-gray-800">
          Featured Products
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 px-4 lg:px-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full bg-white"
            >
              <Image
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {product.name}
              </h3>
              <p className="text-lg text-gray-600 mb-4">{product.price}</p>
              <button
                onClick={() => handleAddToCart(product)} // Add to cart functionality
                className="bg-[#029FAE] text-white py-2 px-4 rounded-full shadow-md flex items-center justify-center hover:bg-[#027a8b] transition-colors duration-300"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/2543/2543369.png"
                  alt="Add to Cart"
                  className="h-5 w-5 mr-2"
                />
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <Link
          href="/Product"
          className="text-[#029FAE] mt-12 inline-block text-lg font-semibold hover:underline"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

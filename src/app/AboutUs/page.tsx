'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaShippingFast, FaHands, FaTags, FaRecycle } from "react-icons/fa";

const AboutSection = () => {
  return (
    <div className="bg-gray-200">
      {/* About Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 py-10 px-6 md:px-10">
        {/* Text Content */}
        <div className="bg-teal-800 text-white flex flex-col justify-center p-8 rounded-lg">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">About Us - Comforty</h2>
          <p className="text-base md:text-lg mb-6">
            At Comforty, we believe that the right chair can transform your space and elevate your comfort. Specializing in ergonomic design, premium materials, and modern aesthetics, we craft chairs that seamlessly blend style with functionality.
          </p>
          <Link href="/Product" className="mt-14 w-[190px] h-[56px] bg-teal-600 text-white px-10 py-2 rounded-lg font-medium hover:bg-teal-950 flex items-center justify-center">
           View Collection
          </Link>
        </div>

        {/* Image Section */}
        <div className="flex justify-center items-center">
          <div className="relative w-full max-w-lg h-[400px] md:h-[478px]">
            <Image
              src="/product6.png"
              alt="Comforty Chair"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
              priority
            />
          </div>
        </div>
      </div>

      {/* Brand Difference Section */}
      <div className="bg-white py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">
            What Makes Our Brand Different
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="text-center p-6 bg-gray-100 rounded-lg shadow">
              <div className="mb-4 text-teal-700">
                <FaShippingFast className="h-8 w-8 mx-auto" />
              </div>
              <h4 className="text-lg text-teal-700 font-medium mb-2">Next Day as Standard</h4>
              <p className="text-teal-700 text-sm">Order before 3pm and get your order the next day as standard.</p>
            </div>
            {/* Feature 2 */}
            <div className="text-center p-6 bg-gray-100 rounded-lg shadow">
              <div className="mb-4 text-teal-700">
                <FaHands className="h-8 w-8 mx-auto" />
              </div>
              <h4 className="text-lg text-teal-700 font-medium mb-2">Made by True Artisans</h4>
              <p className="text-teal-700 text-sm">Handmade crafted goods made with real passion and craftsmanship.</p>
            </div>
            {/* Feature 3 */}
            <div className="text-center p-6 bg-gray-100 rounded-lg shadow">
              <div className="mb-4 text-teal-700">
                <FaTags className="h-8 w-8 mx-auto" />
              </div>
              <h4 className="text-lg text-teal-700 font-medium mb-2">Unbeatable Prices</h4>
              <p className="text-teal-700 text-sm">For our materials and quality, you won’t find better prices anywhere.</p>
            </div>
            {/* Feature 4 */}
            <div className="text-center p-6 bg-gray-100 rounded-lg shadow">
              <div className="mb-4 text-teal-700">
                <FaRecycle className="h-8 w-8 mx-auto" />
              </div>
              <h4 className="text-lg text-teal-700 font-medium mb-2">Recycled Packaging</h4>
              <p className="text-teal-700 text-sm">We use 100% recycled materials to ensure our footprint is more manageable.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Products Section */}
      <div className="bg-white py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Our Popular Products
          </h3>
          <div className="flex flex-wrap justify-between items-start gap-6">
            {/* Product 1 */}
            <div className="rounded-lg overflow-hidden shadow-md flex-shrink-0 w-full sm:w-[48%] lg:w-[530px]">
              <div className="relative h-[375px]">
                <Image
                  src="/Large.png"
                  alt="The Poplar suede sofa"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                  priority
                />
              </div>
              <div className="p-4">
                <h4 className="font-medium text-lg">The Poplar suede sofa</h4>
                <p className="text-gray-600">$99.00</p>
              </div>
            </div>
            {/* Product 2 */}
            <div className="rounded-lg overflow-hidden shadow-md flex-shrink-0 w-full sm:w-[48%] lg:w-[280px]">
              <div className="relative h-[375px]">
                <Image
                  src="/Parent1.png"
                  alt="The Dandy chair"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                  priority
                />
              </div>
              <div className="p-4">
                <h4 className="font-medium text-lg">The Dandy chair</h4>
                <p className="text-gray-600">$99.00</p>
              </div>
            </div>
            {/* Product 3 */}
            <div className="rounded-lg overflow-hidden shadow-md flex-shrink-0 w-full sm:w-[48%] lg:w-[280px]">
              <div className="relative h-[375px]">
                <Image
                  src="/Parent2.png"
                  alt="The Dandy chair"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                  priority
                />
              </div>
              <div className="p-4">
                <h4 className="font-medium text-lg">The Dandy chair</h4>
                <p className="text-gray-600">$99.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;

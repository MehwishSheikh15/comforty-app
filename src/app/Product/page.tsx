'use client';
import React, { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client'; // Adjust the path as necessary
import { allProductsQuery } from '../api/query'; // Adjust the path as necessary
import { useCart } from '../context/cartContext';
import { useWishlist } from '../context/wishlistContext'; // Import wishlist context
import imageUrlBuilder from '@sanity/image-url'; // Import the image URL builder
import { FaSearch, FaCartPlus, FaHeart } from 'react-icons/fa'; // Import cart and heart icons

// Sanity image URL builder setup
const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source).auto('format').fit('max');
}

type Product = {
  _id: string;
  title: string;
  price: number;
  priceWithoutDiscount: number;
  image: { asset: { _ref: string } }; // Image reference from Sanity
  description: string;
  category: {
    title: string;
    image: { asset: { _ref: string } }; // Image reference for category
  };
  inventory: number;
  badge: string;
  tags: string[];
};

const ProductPage: React.FC = () => {
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist(); // Use wishlist context
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // For category filter

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await client.fetch(allProductsQuery);
        setProducts(data);
        setFilteredProducts(data); // Initialize filtered products with all products
      } catch (err: any) {
        console.error('Error fetching products:', err);
        setError(err.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products immediately when the search query or category changes
    let filtered = products;
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category.title === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product._id,
      name: product.title,
      price: product.price,
      image: urlFor(product.image).width(500).url(),
      quantity: 1,
      description: product.description,
      inventory: 0,
      tags: []
    });
  };

  const toggleWishlist = (product: Product) => {
    if (wishlist.some((item) => item.id === product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist({
        id: product._id,
        title: product.title,
        price: product.price,
        image: urlFor(product.image).width(500).url(),
        description: ''
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="py-16">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl font-bold mx-4">All Products</h2>

        {/* Search Bar */}
        <div className="flex items-center border p-2 rounded-lg w-64">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-none px-2 w-full p-2 rounded-lg"
          />
          <FaSearch className="text-gray-500 ml-2" />
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="mb-8">
        <div className="flex space-x-4 justify-center">
          {['Wing Chair', 'Wooden Chair', 'Desk Chair'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`py-2 px-4 rounded-lg ${selectedCategory === category ? 'bg-[#029FAE] text-white' : 'bg-gray-200 text-sm rounded-lg'}`}
            >
              {category}
            </button>
          ))}
          <button
            onClick={() => setSelectedCategory('')}
            className="py-2 text-sm px-4 rounded-lg bg-gray-200"
          >
            Show All Products
          </button>
        </div>
      </div>

      {/* Products List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg flex flex-col h-full">
            <div className="relative w-full h-64 mb-4">
              {product.badge && (
                <span className={`absolute top-2 left-2 px-2 py-1 text-xs font-bold text-white ${product.badge === 'Sales' ? 'bg-red-500' : 'bg-green-500'} rounded-full`}>
                  {product.badge.toUpperCase()}
                </span>
              )}
              <img
                src={urlFor(product.image).width(500).url()}
                alt={product.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h3 className="text-xl font-semibold">{product.title}</h3>
            <p className="text-lg text-gray-700">${product.price}</p>
            {product.priceWithoutDiscount && (
              <p className="text-sm text-gray-500 line-through">${product.priceWithoutDiscount}</p>
            )}
            <p className="text-sm text-gray-600">Category: {product.category.title}</p>
            <p className="text-sm text-gray-600"> {product.inventory} items</p>
            <p className="text-sm text-gray-600 space-x-2">
             {product.tags.map((tag, index) => (
               <span
                key={index}
                 className="inline-block bg-gray-200 text-sm text-gray-700 px-3 py-1 rounded-full"
                  >
                   {tag}
                   </span>
            ))}
              </p>


            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-[#029FAE] text-white py-2 px-4 rounded-full shadow-md flex items-center justify-center hover:bg-[#027a8b] transition-colors duration-300"
              >
                <FaCartPlus className="h-5 w-5 mr-2" />
                Add to Cart
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`h-5 w-5 ${wishlist.some((item) => item.id === product._id) ? 'text-red-700' : 'text-gray-500'}`}
              >
                <FaHeart />
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Newsletter Section */}
       <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-4">OR SUBSCRIBE TO THE NEWSLETTER</h2>
         <div className="flex justify-center items-center mb-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="border p-2 rounded-l-lg w-64"
          />
          <button className="text-black py-2 px-4 rounded-r-lg">
            Subscribe
          </button>
        </div>
        {/* Line below the email and submit button */}
        <div className="border-t border-gray-300 w-64 mx-auto"></div>
      </div>

      {/* Instagram Follow Section */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Follow Products and Discount on Instagram
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {products.slice(3, 9).map((product) => (
            <div key={product._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <div className="relative w-full h-50 mb-4">
                <img
                  src={urlFor(product.image).width(500).url()} // Generate image URL for product
                  alt={product.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;



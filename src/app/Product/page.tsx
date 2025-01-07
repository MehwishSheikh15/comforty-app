
'use client';
import React, { useEffect, useState } from 'react';
import { useCart } from "../context/cartContext";

type Product = {
  id: number;
  image: string;
  name: string;
  price: number ;  
  priceNumeric: number;
  description: string;
};

const ProductPage: React.FC = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        setProducts(data);
      } catch (error: any) {
        console.error('Error fetching products:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    // Ensure price is a string before calling replace
    const priceString = typeof product.price === 'string' ? product.price : product.price.toString();
    const price = parseFloat(priceString.replace("$", "")); // Remove dollar sign and convert to number
    addToCart({ ...product, price, quantity: 1 });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold text-center mb-12">All Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg flex flex-col h-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover mb-4"
            />
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-lg text-gray-700">{product.price}</p>
            <button
              onClick={() => handleAddToCart(product)}
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
    </div>
  );
};

export default ProductPage;

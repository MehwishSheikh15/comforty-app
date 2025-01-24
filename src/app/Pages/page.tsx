
'use client';
import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client"; // Adjust the path as necessary
import { allProductsQuery } from "../api/query"; // Adjust the path as necessary
import { useCart } from "../context/cartContext";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url"; // Import the image URL builder

// Sanity image URL builder setup
const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source).auto("format").fit("max");
}

type Review = {
  rating: number;
  comment: string;
  user: string; // Optional: you can track the reviewer
};

type Product = {
  _id: string;
  title: string;
  price: number;
  priceWithoutDiscount: number;
  discountPrice: number; // Added discount price
  image: { asset: { _ref: string } }; // Image reference from Sanity
  description: string;
  category: {
    title: string;
    image: { asset: { _ref: string } }; // Image reference for category
  };
  inventory: number;
  badge: string; // Added badge
  tags: string[]; // Added tags
  rating: number; // Added rating field
};

const HomePage: React.FC = () => {
  const { addToCart } = useCart(); // Use the cart context to add items to the cart
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state for both main section and featured products
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [featuredPage, setFeaturedPage] = useState<number>(1); // Featured products pagination state
  const productsPerPage = 1; // Show one product at a time in the main section
  const productsPerFeaturedPage = 5; // Show 5 products per page in the featured section

  // State for quantity selection
  const [quantity, setQuantity] = useState<number>(0); // Start quantity from 0
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [newReview, setNewReview] = useState<{ rating: number; comment: string }>({ rating: 5, comment: "" });
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await client.fetch(allProductsQuery);
        setProducts(data);
        setSelectedProduct(data[0]); // Set the first product as the selected product
      } catch (err: any) {
        console.error("Error fetching products:", err);
        setError(err.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Get products for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Get products for the featured section
  const indexOfLastFeaturedProduct = featuredPage * productsPerFeaturedPage;
  const indexOfFirstFeaturedProduct = indexOfLastFeaturedProduct - productsPerFeaturedPage;
  const featuredProducts = products.slice(indexOfFirstFeaturedProduct, indexOfLastFeaturedProduct);

  // Change page for main products
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Change page for featured products
  const paginateFeatured = (pageNumber: number) => setFeaturedPage(pageNumber);

  const handleAddToCart = async (product: Product, quantity: number) => {
    if (quantity <= 0) {
      alert("Please select a valid quantity.");
      return;
    }

    if (quantity > product.inventory) {
      alert("Insufficient stock available.");
      return;
    }

    addToCart({
      id: product._id,
      name: product.title,
      price: product.discountPrice || product.price, // Use discount price if available
      image: urlFor(product.image).width(500).url(),
      quantity,
      description: product.description,
      inventory: 0,
      tags: []
    });

    // Update inventory in the frontend
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p._id === product._id
          ? { ...p, inventory: p.inventory - quantity }
          : p
      )
    );

    // Optionally update inventory in the backend (Sanity)
    try {
      await client.patch(product._id).dec({ inventory: quantity }).commit();
    } catch (err) {
      console.error("Error updating inventory:", err);
    }
     {setSuccessMessage(`${product.title} has been added to your cart!`);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    };
    const handleReviewSubmit = async (productId: string) => {
      if (!newReview.comment || newReview.rating < 1 || newReview.rating > 5) {
        alert("Please provide a valid review.");
        return;
      }
    }
     };
     
  // Set success message
 

  const handleQuantityChange = (operation: "increment" | "decrement", product: Product) => {
    setQuantity((prevQuantity) => {
      let newQuantity = prevQuantity;
      if (operation === "increment") {
        // Ensure quantity does not exceed the available inventory
        newQuantity = Math.min(prevQuantity + 1, product.inventory);
      } else if (operation === "decrement") {
        // Ensure quantity does not go below 1
        newQuantity = Math.max(prevQuantity - 1, 0);
      }
      return newQuantity;
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const totalPages = Math.ceil(products.length / productsPerPage);
  const totalFeaturedPages = Math.ceil(products.length / productsPerFeaturedPage);

  // Render the rating stars
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {Array(fullStars)
          .fill(0)
          .map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-5 h-5 text-yellow-500"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 15.27l4.09 2.13-1.56-4.91L18 7.24l-5.02-.37L10 2 7.02 6.87 2 7.24l4.47 5.25-1.56 4.91L10 15.27z"
                clipRule="evenodd"
              />
            </svg>
          ))}
        {halfStar && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-5 h-5 text-yellow-500"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 15.27l4.09 2.13-1.56-4.91L18 7.24l-5.02-.37L10 2 7.02 6.87 2 7.24l4.47 5.25-1.56 4.91L10 15.27z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {Array(emptyStars)
          .fill(0)
          .map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              className="w-5 h-5 text-gray-400"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 15.27l4.09 2.13-1.56-4.91L18 7.24l-5.02-.37L10 2 7.02 6.87 2 7.24l4.47 5.25-1.56 4.91L10 15.27z"
                clipRule="evenodd"
              />
            </svg>
          ))}
      </div>
    );
  };

  return (
    <div className="py-16 bg-gray-50">
      {/* Main Section with Image on Left and Content on Right */}
      <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center lg:space-x-8">
        {/* Left Side - Image */}
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <img
            src={urlFor(currentProducts[0]?.image).width(800).height(600).quality(80).url()} // Fetch high-quality image from Sanity
            alt={currentProducts[0]?.title || "Product Image"}
            className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Right Side - Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">
            {currentProducts[0]?.title || "Product Title"}
          </h2>
          {/* Badge */}
          {currentProducts[0]?.badge && (
            <span className="text-sm bg-yellow-500 text-white px-3 py-1 rounded-full">{currentProducts[0]?.badge}</span>
          )}
          <div className="flex items-center gap-4 mt-4">
            {/* Category */}
            <span className="text-sm text-gray-600">{currentProducts[0]?.category.title}</span>
          </div>
          {/* Price */}
          <div className="mt-4">
            {currentProducts[0]?.discountPrice ? (
              <>
                <span className="text-xl font-bold text-[#029FAE]">${currentProducts[0]?.discountPrice}</span>
                <span className="line-through text-gray-500 ml-2">${currentProducts[0]?.price}</span>
              </>
            ) : (
              <span className="text-xl font-bold text-[#029FAE]">${currentProducts[0]?.price}</span>
            )}
          </div>
          <p className="text-lg text-gray-700 mt-5 mb-4 leading-relaxed">
            {currentProducts[0]?.description || "Product Description"}
          </p>
          <p className="text-md text-gray-600 mb-4">
            <span className="font-semibold">
              {currentProducts[0] ? currentProducts[0].inventory - quantity : 0}
            </span>{" "}
            items remaining
          </p>

          {/* Rating */}
          <div className="mt-4">
            {renderStars(currentProducts[0]?.rating || 4.5)} {/* Display rating */}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 justify-center lg:justify-start mb-4">
            <button
              onClick={() => handleQuantityChange("decrement", currentProducts[0]!)}
              className="bg-gray-300 text-gray-800 px-3 py-2 rounded-md hover:bg-gray-400"
            >
              -
            </button>
            <span className="text-xl font-semibold">{quantity}</span>
            <button
              onClick={() => handleQuantityChange("increment", currentProducts[0]!)}
              className="bg-gray-300 text-gray-800 px-3 py-2 rounded-md hover:bg-gray-400"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-center lg:justify-start">
            <button
              onClick={() => handleAddToCart(currentProducts[0]!, quantity)} // Pass quantity to add to cart
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


          {error && <p className="text-red-500 mt-4">{error}</p>} {/* Show error message */}
          {successMessage && (
  <div className="mt-4 text-lg text-green-500">
    <p>{successMessage}</p>
  </div>
)}
        </div>
      </div>

      {/* Pagination for Main Section */}
      <div className="flex justify-center mt-8 items-center">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="mx-2 px-4 py-2 rounded-full bg-gray-300 hover:bg-gray-400"
        >
          &lt;
        </button>
        <span className="mx-2 px-4 py-2 rounded-full bg-[#029FAE] text-white">
          {currentPage}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="mx-2 px-4 py-2 rounded-full bg-gray-300 hover:bg-gray-400"
        >
          &gt;
        </button>
      </div>

      {/* Featured Products Section */}
      <div className="mt-16 text-center">
        <div className="flex justify-between items-center mx-7 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">Featured Products</h2>
          <Link href="/Product" className="text-[#029FAE] text-lg font-semibold hover:underline">
            View All Products
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 px-4 lg:px-8">
          {featuredProducts.map((product) => (
            <div
              key={product._id}
              className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full bg-white"
            >
              <img
                src={urlFor(product.image).width(500).url()} // Generate image URL for product
                alt={product.title}
                
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <div className="mx-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h3>
                <p className="text-lg text-gray-600 mb-4">${product.price}</p>
                
              </div>
            </div>
          ))}
        </div>

        {/* Pagination for Featured Products */}
        <div className="flex justify-center mt-8 items-center">
          <button
            onClick={() => paginateFeatured(featuredPage - 1)}
            disabled={featuredPage === 1}
            className="mx-2 px-4 py-2 rounded-full bg-gray-300 hover:bg-gray-400"
          >
            &lt;
          </button>
          <span className="mx-2 px-4 py-2 rounded-full bg-[#029FAE] text-white">
            {featuredPage}
          </span>
          <button
            onClick={() => paginateFeatured(featuredPage + 1)}
            disabled={featuredPage === totalFeaturedPages}
            className="mx-2 px-4 py-2 rounded-full bg-gray-300 hover:bg-gray-400"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;


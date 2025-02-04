
// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useCart } from '../context/cartContext';
// import { createClient } from '@sanity/client';
// import imageUrlBuilder from '@sanity/image-url'; // Import the image URL builder

// // Create a Sanity client instance
// const client = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
//   apiVersion: '2023-01-01',
//   useCdn: true, // Enable CDN for faster response
// });

// // Create an image URL builder
// const builder = imageUrlBuilder(client);

// // Function to generate image URLs
// const urlFor = (source: any) => builder.image(source).width(400).url(); // Use the builder to generate the image URL

// const Hero = () => {
//   const { addToCart } = useCart();
//   const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
//   const [ourProducts, setOurProducts] = useState<any[]>([]);
//   const [categories, setCategories] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(false); // Loading state
//   const [searchQuery, setSearchQuery] = useState<string>(''); // Search query state

//   // Fetch products and categories from Sanity
//   useEffect(() => {
//     const fetchProductsAndCategories = async () => {
//       try {
//         // Fetch categories
//         const categoriesQuery = '*[_type == "categories"]';
//         const categoriesData = await client.fetch(categoriesQuery);
//         setCategories(categoriesData);

//         // Fetch products with additional fields (description, inventory, etc.)
//         const productsQuery = '*[_type == "products"]{_id, title, price, priceWithoutDiscount, image, category->, description, inventory, badge, tags}';
//         const productsData = await client.fetch(productsQuery);

//         setFeaturedProducts(productsData.slice(0, 5));
//         setOurProducts(productsData.slice(3, 11));
//       } catch (error) {
//         console.error('Error fetching data from Sanity:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProductsAndCategories();
//   }, []);

//   const handleAddToCart = (product: { id: string; name: string; price: number; image: string; priceWithoutDiscount: number; description: string; inventory: number; badge: string; tags: string[] }) => {
//     addToCart({ ...product, quantity: 1 });
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="bg-white px-4 sm:px-8 md:px-10 shadow-lg">
//       {/* Hero Section */}
//       <div className="relative bg-gray-200 text-black py-20 px-6 sm:px-10 md:px-12 rounded-lg">
//         <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">
//           {/* Left Side - Text Content */}
//           <div className="flex flex-col items-start space-y-4 max-w-xl">
//             <p className="text-sm font-light">Welcome to Chairy</p>
//             <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
//               Best Furniture Collection for your interior.
//             </h1>
//             <div className="mt-6">
//               <a 
//                 href="/shop" 
//                 className="flex items-center bg-[#029FAE] text-white py-2 px-6 rounded-full font-semibold hover:bg-teal-600 transition"
//               >
//                 Shop Now 
//                 <svg 
//                   xmlns="http://www.w3.org/2000/svg" 
//                   className="ml-2 h-5 w-5" 
//                   fill="none" 
//                   viewBox="0 0 24 24" 
//                   stroke="currentColor"
//                 >
//                   <path 
//                     strokeLinecap="round" 
//                     strokeLinejoin="round" 
//                     strokeWidth="2" 
//                     d="M9 5l7 7-7 7" 
//                   />
//                 </svg>
//               </a>
//             </div>
//           </div>

//           {/* Right Side - Product Image */}
//           <div className="flex-shrink-0">
//             <img
//               src="/Product Image.png"  
//               alt="Product"
              
//               className="w-full sm:w-[400px] h-full rounded-lg"
//             />
//           </div>
//         </div>
//       </div>
//       {/* Company Logo Section */}
//       <div className="flex justify-center mt-8">
//         <img
//           src="/CompanyLogo.png" 
//           alt="Company Logo"
          
//           className="h-16 sm:h-24 rounded-full w-auto"
//         />
//       </div>
//       <div className="mb-8 flex justify-center">
//         <input
//           type="text"
//           placeholder="Search for products..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="border rounded-lg px-4 py-2 w-1/2 sm:w-1/3 lg:w-1/4 focus:outline-none focus:ring-2 focus:ring-[#029FAE]"
//         />
//       </div>
//       {/* Featured Products Section */}
//       <div className="mt-12">
//         <h2 className="text-2xl font-bold text-center mb-8">Featured Products</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 px-4 lg:px-8">
//           {/* Map through the featured products fetched from Sanity */}
//           {featuredProducts.map((product) => (
//             <div key={product._id} className="relative bg-gray-100 p-4 rounded-lg shadow-md">
//               {product.badge && (
//                 <span className={`absolute top-2 left-2 px-2 py-1 text-xs font-bold text-white ${product.badge === 'Sales' ? 'bg-red-500' : 'bg-green-500'} rounded-full`}>
//                   {product.badge.toUpperCase()}
//                 </span>
//               )}
//               <img 
//                 src={urlFor(product.image)} // Generate image URL using the Sanity image builder
//                 alt={product.title}
                
//                 className="w-full h-50 object-cover rounded-lg mb-4"
//               />
//               <h3 className="text-lg font-semibold">{product.title}</h3>
//               <p className="text-gray-600">
//                 {product.priceWithoutDiscount && (
//                   <span className="line-through text-red-500 mr-2">${product.priceWithoutDiscount}</span>
//                 )}
//                 <span>${product.price}</span>
//               </p>
//               <p className="text-sm text-gray-600">{product.inventory} items</p>
//               <button
//                 onClick={() => handleAddToCart({
//                   id: product._id,
//                   name: product.title,
//                   price: product.price,
//                   image: urlFor(product.image), // Generate image URL
//                   priceWithoutDiscount: product.priceWithoutDiscount,
//                   description: product.description,
//                   inventory: product.inventory,
//                   badge: product.badge,
//                   tags: product.tags,
//                 })}
//                 className="bg-[#029FAE] text-white py-2 px-4 rounded-full flex items-center"
//               >
//                 <img src="https://cdn-icons-png.flaticon.com/128/2543/2543369.png" alt="Add to Cart" 
//              className="h-5 w-5 mr-2" />
//                 Add to Cart
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
      
// <div className="mt-16 flex flex-wrap items-start">

//   {/* First Section: Image with Vertical Text */}
//   <div className="w-full md:w-1/2 relative pr-4">
  
//     {/* Left Image */}
//     <img
//       src="/custom-image-left.png"
//       alt="Custom Left"
   
//       className="w-full h-auto rounded-lg"
//     />
//     {/* Vertical Text */}
//     <p className="absolute  inset-y-4 left-[-40px] flex items-center transform -rotate-90 text-gray-600 font-bold text-lg whitespace-nowrap">
//       Explore new and popular styles
//     </p>
//   </div>

//   {/* Right Section: Collage */}
//   <div className="w-full md:w-1/2 grid grid-cols-2 gap-4 pl-4">
//     {['collage1', 'collage2', 'collage3', 'collage4'].map((image, index) => (
//       <img
//         key={index}
//         src={`/product${index + 5}.png`}
//         alt={`Product ${index + 5}`}
     
//         className="w-full h-auto object-cover rounded-lg"
//       />
//     ))}
//   </div>
// </div>



//        {/* Top Categories Section */}
//        <div className="mt-16">
//        <h2 className="text-2xl font-bold text-center mb-8">Top Categories</h2>
//        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">        
//         {categories.map((category) => (
//             <div key={category._id} className="relative">
//               <img
//                 src={urlFor(category.image)} // Generate image URL using the Sanity image builder
//                 alt={category.title}
                
//                 className="w-full h-full object-cover rounded-lg"
//               />
//               <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 text-white text-center py-2">
//                 <h3 className="font-semibold">{category.title}</h3>
//                 <p className="text-sm">11200</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Our Products Section */}
//       <div className="mt-16 mb-16">
//         <h2 className="text-2xl font-bold text-center mb-8">Our Products</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {/* Map through the our products fetched from Sanity */}
//           {ourProducts.map((product) => (
//             <div key={product._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
//               <img
//                 src={urlFor(product.image)} // Generate image URL using the Sanity image builder
//                 alt={product.title}
              
//                 className="w-full h-50 object-cover rounded-lg mb-4"
//               />
//               <h3 className="text-lg font-semibold">{product.title}</h3>
//               <p className="text-gray-600">${product.price}</p>
//               <button
//                 onClick={() => handleAddToCart({
//                   id: product._id,
//                   name: product.title,
//                   price: product.price,
//                   image: urlFor(product.image), // Generate image URL
//                   priceWithoutDiscount: product.priceWithoutDiscount,
//                   description: product.description,
//                   inventory: product.inventory,
//                   badge: product.badge,
//                   tags: product.tags,
//                 })}
//                 className="bg-[#029FAE] text-white py-2 px-4 rounded-full flex items-center"
//               >
//                 <img src="https://cdn-icons-png.flaticon.com/128/2543/2543369.png" alt="Add to Cart" 
//               className="h-5 w-5 mr-2" />
//                 Add to Cart
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;





'use client';
import React, { useEffect, useState } from 'react';
import { useCart } from '../context/cartContext';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'; // Import the image URL builder
import { FaSearch } from 'react-icons/fa';
// Create a Sanity client instance
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-01-01',
  useCdn: true, // Enable CDN for faster response
});

// Create an image URL builder
const builder = imageUrlBuilder(client);

// Function to generate image URLs
const urlFor = (source: any) => builder.image(source).width(400).url(); // Use the builder to generate the image URL

const Hero = () => {
  const { addToCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [ourProducts, setOurProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [searchQuery, setSearchQuery] = useState<string>(''); // Search query state

  // Fetch products and categories from Sanity
  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        // Fetch categories
        const categoriesQuery = '*[_type == "categories"]';
        const categoriesData = await client.fetch(categoriesQuery);
        setCategories(categoriesData);

        // Fetch products with additional fields (description, inventory, etc.)
        const productsQuery = '*[_type == "products"]{_id, title, price, priceWithoutDiscount, image, category->, description, inventory, badge, tags}';
        const productsData = await client.fetch(productsQuery);

        setFeaturedProducts(productsData.slice(0, 5));
        setOurProducts(productsData.slice(3, 11));
      } catch (error) {
        console.error('Error fetching data from Sanity:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndCategories();
  }, []);

  // Filter products based on search query
  const filteredFeaturedProducts = featuredProducts.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredOurProducts = ourProducts.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (product: { id: string; name: string; price: number; image: string; priceWithoutDiscount: number; description: string; inventory: number; badge: string; tags: string[] }) => {
    addToCart({ ...product, quantity: 1 });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white px-4 sm:px-8 md:px-10 shadow-lg">
      {/* Hero Section */}
      <div className="relative bg-gray-200 text-black py-20 px-6 sm:px-10 md:px-12 rounded-lg">
        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">
          {/* Left Side - Text Content */}
          <div className="flex flex-col items-start space-y-4 max-w-xl">
            <p className="text-sm font-light">Welcome to Chairy</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Best Furniture Collection for your interior.
            </h1>
            <div className="mt-6">
              <a 
                href="/shop" 
                className="flex items-center bg-[#029FAE] text-white py-2 px-6 rounded-full font-semibold hover:bg-teal-600 transition"
              >
                Shop Now 
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="ml-2 h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Side - Product Image */}
          <div className="flex-shrink-0">
            <img
              src="/Product Image.png"  
              alt="Product"
              className="w-full sm:w-[400px] h-full rounded-lg"
            />
          </div>
        </div>
      </div>
            {/* Company Logo Section */}
     <div className="flex justify-center mt-8">
      <img
          src="/CompanyLogo.png" 
          alt="Company Logo"
          className="h-16 sm:h-24 rounded-full w-auto"
        />
      </div>
      {/* Search Input */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded-lg px-4 py-2 w-1/2 sm:w-1/3 lg:w-1/4 focus:outline-none focus:ring-2 focus:ring-[#029FAE]"
         
         />
                 
        
      </div>
   


      {/* Featured Products Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-center mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 px-4 lg:px-8">
          {/* Map through the filtered featured products */}
          {filteredFeaturedProducts.map((product) => (
            <div key={product._id} className="relative bg-gray-100 p-4 rounded-lg shadow-md">
              {product.badge && (
                <span className={`absolute top-2 left-2 px-2 py-1 text-xs font-bold text-white ${product.badge === 'Sales' ? 'bg-red-500' : 'bg-green-500'} rounded-full`}>
                  {product.badge.toUpperCase()}
                </span>
              )}
              <img
                src={urlFor(product.image)} // Generate image URL using the Sanity image builder
                alt={product.title}
                className="w-full h-50 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-gray-600">
                {product.priceWithoutDiscount && (
                  <span className="line-through text-red-500 mr-2">${product.priceWithoutDiscount}</span>
                )}
                <span>${product.price}</span>
              </p>
              <p className="text-sm text-gray-600">{product.inventory} items</p>
              <button
                onClick={() => handleAddToCart({
                  id: product._id,
                  name: product.title,
                  price: product.price,
                  image: urlFor(product.image), // Generate image URL
                  priceWithoutDiscount: product.priceWithoutDiscount,
                  description: product.description,
                  inventory: product.inventory,
                  badge: product.badge,
                  tags: product.tags,
                })}
                className="bg-[#029FAE] text-white py-2 px-4 rounded-full flex items-center"
              >
                <img src="https://cdn-icons-png.flaticon.com/128/2543/2543369.png" alt="Add to Cart" 
                  className="h-5 w-5 mr-2" />
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-16 flex flex-wrap items-start">

{/* First Section: Image with Vertical Text */}
 <div className="w-full md:w-1/2 relative pr-4">

   {/* Left Image */}
<img
    src="/custom-image-left.png"
    alt="Custom Left"
 
    className="w-full h-auto rounded-lg"
  />
  {/* Vertical Text */}
  <p className="absolute  inset-y-4 left-[-40px] flex items-center transform -rotate-90 text-gray-600 font-bold text-lg whitespace-nowrap">
    Explore new and popular styles
  </p>
</div>

{/* Right Section: Collage */}
<div className="w-full md:w-1/2 grid grid-cols-2 gap-4 pl-4">
  {['collage1', 'collage2', 'collage3', 'collage4'].map((image, index) => (
    <img
      key={index}
      src={`/product${index + 5}.png`}
      alt={`Product ${index + 5}`}
   
      className="w-full h-auto object-cover rounded-lg"
    />
  ))}
</div>
</div>
     {/* Top Categories Section */}
  <div className="mt-16">
<h2 className="text-2xl font-bold text-center mb-8">Top Categories</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">        
       {categories.map((category) => (
            <div key={category._id} className="relative">
              <img
                src={urlFor(category.image)} // Generate image URL using the Sanity image builder
                alt={category.title}
                
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 text-white text-center py-2">
                <h3 className="font-semibold">{category.title}</h3>
                <p className="text-sm">11200</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Our Products Section */}
      <div className="mt-16 mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Map through the filtered our products */}
          {filteredOurProducts.map((product) => (
            <div key={product._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <img
                src={urlFor(product.image)} // Generate image URL using the Sanity image builder
                alt={product.title}
                className="w-full h-50 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-gray-600">${product.price}</p>
              <button
                onClick={() => handleAddToCart({
                  id: product._id,
                  name: product.title,
                  price: product.price,
                  image: urlFor(product.image), // Generate image URL
                  priceWithoutDiscount: product.priceWithoutDiscount,
                  description: product.description,
                  inventory: product.inventory,
                  badge: product.badge,
                  tags: product.tags,
                })}
                className="bg-[#029FAE] text-white py-2 px-4 rounded-full flex items-center"
              >
                <img src="https://cdn-icons-png.flaticon.com/128/2543/2543369.png" alt="Add to Cart" 
                  className="h-5 w-5 mr-2" />
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;

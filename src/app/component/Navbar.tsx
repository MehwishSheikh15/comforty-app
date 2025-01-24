// 'use client';

// import React, { useState } from 'react';
// import Image from 'next/image';
// import { CiShoppingCart } from 'react-icons/ci';
// import { FiChevronDown } from 'react-icons/fi';
// import Link from 'next/link';
// import { HiMenu, HiX } from 'react-icons/hi';
// import { FaHeart , FaUser} from 'react-icons/fa'; // Import the order icon
// import { useCart } from '../context/cartContext';
// import { useWishlist } from '../context/wishlistContext'; // Import the wishlist hook
// import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';


// const Navbar: React.FC = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const { cart } = useCart();
//   const { wishlist } = useWishlist(); // Access wishlist from the context

//   // Calculate total items in the cart
//   const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

//   // Wishlist item count
//   const wishlistItemCount = wishlist.length;

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen((prev) => !prev);
//   };
//   const toggleDropdown = () => {
//     setIsDropdownOpen((prev) => !prev);
//   };

//   return (
//     <header className="shadow bg-indigo-950">
//       {/* Top Line */}
//       <div className="bg-indigo-950 text-white text-sm">
//         <div className="container opacity-70 mx-auto flex justify-between items-center px-4 py-2">
//           <span>✓ Free Shipping On All Orders Over $50</span>
//           <div className="flex items-center gap-4">
//             <div className="flex items-center hover:underline">
//               <span>Eng</span>
//               <FiChevronDown className="w-4 h-4 ml-1 text-gray-300" />
//             </div>
//             <Link href="/Faqs" className="hover:underline">
//               FAQs
//             </Link>
//             <div className="flex items-center gap-2 hover:underline">
//               <Link href="#" className="flex items-center space-x-1">
//                 <span>Need Help</span>
//                 <svg
//                   stroke="currentColor"
//                   fill="none"
//                   strokeWidth="2"
//                   viewBox="0 0 24 24"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   height="1em"
//                   width="1em"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <circle cx="12" cy="12" r="10"></circle>
//                   <line x1="12" y1="8" x2="12" y2="12"></line>
//                   <line x1="12" y1="16" x2="12.01" y2="16"></line>
//                 </svg>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Middle Line: Logo, Cart, Wishlist, and Account */}
//       <div className="bg-gray-100">
//         <div className="container mx-auto flex justify-between items-center px-4 py-4">
//           {/* Logo */}
//           <div className="flex-1 text-center sm:text-left">
//             <div className="flex space-x-2 justify-center sm:justify-start">
//               <Image src="/Logo Icon.png" alt="logo" width={40} height={40} />
//               <span className="text-xl font-bold">Comforty</span>
//             </div>
//           </div>

//           {/* Cart Section */}
//           <Link href="/Cart">
//             <div className="flex items-center  px-3 py-1">
//               <CiShoppingCart className="h-5 w-5 text-indigo-900" />
//               <span className=" text-black text-xs font-semibold  rounded-full w-5 h-5 flex items-center justify-center">
//                 {cartItemCount}
//               </span>
//             </div>
//           </Link>
//           <div className="relative">
//             <button onClick={toggleDropdown} className="flex items-center space-x-2">
//               <FaUser className="text-indigo-900 w-6 h-6" />
//               <FiChevronDown className="text-indigo-900 w-4 h-4" />
//             </button>
//             {isDropdownOpen && (
//               <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-4 w-48 z-50">
//                 <SignedOut>
//                   <div className="flex flex-col space-y-2">
//                     <SignInButton>
//                       <button className="text-indigo-900 hover:underline">Sign In</button>
//                     </SignInButton>
//                     <Link href="/signup">
//                       <button className="text-indigo-900 hover:underline">Sign Up</button>
//                     </Link>
//                   </div>
//                 </SignedOut>
//                 <SignedIn>
//                   <div className="flex flex-col space-y-2">
//                     <UserButton />
//                   </div>
//                 </SignedIn>
//               </div>
//             )}
//           </div>

//           {/* Wishlist Section */}
//           <Link href="/Wishlist">
//             <div className="flex items-center  px-3 py-1">
//               <span className=" text-black text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
//                 {wishlistItemCount} <FaHeart className="h-10 w-10 font-extrabold text-lg text-red-500 gap-3" />
//               </span>
//             </div>
//           </Link>

          
//         </div>
//       </div>

//       {/* Bottom Line: Navigation Menu */}
//       <nav className="bg-white border-t border-b-2 border-gray-300">
//         <div className="container mx-auto w-full h-[74px] flex justify-between items-center px-4 py-4">
//           {/* Menu Items */}
//           <ul className="hidden sm:flex space-x-8 text-gray-700">
//             <li>
//               <Link href="/Home" className="text-teal-900 hover:text-teal-500">
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link href="/Shop" className="text-teal-900 hover:text-teal-500">
//                 Shop
//               </Link>
//             </li>
//             <li>
//               <Link href="/Product" className="text-teal-900 hover:text-teal-500">
//                 Product
//               </Link>
//             </li>
//             <li>
//               <Link href="/Pages" className="text-teal-900 hover:text-teal-500">
//                 Pages
//               </Link>
//             </li>
//             <li>
//               <Link href="/AboutUs" className="text-teal-900 hover:text-teal-500">
//                 About Us
//               </Link>
//             </li>
//           </ul>
//           <div className="mr-4 hover:underline hidden sm:block">
//             <Link href="/Contact" className="text-teal-900 hover:text-teal-500">
//               ContactUs: 03145531971
//             </Link>
//           </div>

//           {/* Mobile Hamburger Menu */}
//           <div className="sm:hidden flex items-center">
//             <button onClick={toggleMobileMenu}>
//               {isMobileMenuOpen ? (
//                 <HiX className="h-6 w-6 text-teal-500" />
//               ) : (
//                 <HiMenu className="h-6 w-6 text-teal-500" />
//               )}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       {isMobileMenuOpen && (
//         <div className="sm:hidden bg-white px-4 py-2 ">
//           <ul className="space-y-4 text-center text-gray-700">
//             <li>
//               <Link href="/Home" className=" text-teal-500 hover:text-teal-950 flex items-center space-x-1">
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link href="/Shop" className=" text-teal-500 hover:text-teal-950 flex items-center space-x-1">
//                 Shop
//               </Link>
//             </li>
//             <li>
//               <Link href="/Product" className=" text-teal-500 hover:text-teal-950 flex items-center space-x-1">
//                 Product
//               </Link>
//             </li>
//             <li>
//               <Link href="/Pages" className=" text-teal-500 hover:text-teal-950 flex items-center space-x-1">
//                 Pages
//               </Link>
//             </li>
//             <li>
//               <Link href="/AboutUs" className=" text-teal-500 hover:text-teal-950 flex items-center space-x-1">
//                 About Us
//               </Link>
//             </li>
//             {/* Mobile Order Link */}
//             <li>
//               <Link href="/Contact" className=" text-teal-500 hover:text-teal-950 flex items-center space-x-1">
//                 ContactUs: 035162895
//               </Link>
//             </li>
//           </ul>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Navbar;


// 'use client';

// import React, { useState } from 'react';
// import Image from 'next/image';
// import { CiShoppingCart } from 'react-icons/ci';
// import { FiChevronDown } from 'react-icons/fi';
// import Link from 'next/link';
// import { HiMenu, HiX } from 'react-icons/hi';
// import { FaHeart} from 'react-icons/fa'; // Import the order icon
// import { useCart } from '../context/cartContext';
// import { useWishlist } from '../context/wishlistContext'; // Import the wishlist hook
// import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

// const Navbar: React.FC = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const { cart } = useCart();
//   const { wishlist } = useWishlist(); // Access wishlist from the context

//   // Calculate total items in the cart
//   const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

//   // Wishlist item count
//   const wishlistItemCount = wishlist.length;

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen((prev) => !prev);
//   };
//   const toggleDropdown = () => {
//     setIsDropdownOpen((prev) => !prev);
//   };

//   return (
//     <header className="shadow bg-indigo-950">
//       {/* Top Line */}
//       <div className="bg-indigo-950 text-white text-sm">
//         <div className="container opacity-70 mx-auto flex justify-between items-center px-4 py-2">
//           <span>✓ Free Shipping On All Orders Over $50</span>
//           <div className="flex items-center gap-4">
//             <div className="flex items-center hover:underline">
//               <span>Eng</span>
//               <FiChevronDown className="w-4 h-4 ml-1 text-gray-300" />
//             </div>
//             <Link href="/Faqs" className="hover:underline">
//               FAQs
//             </Link>
//             <div className="flex items-center gap-2 hover:underline">
//               <Link href="#" className="flex items-center space-x-1">
//                 <span>Need Help</span>
//                 <svg
//                   stroke="currentColor"
//                   fill="none"
//                   strokeWidth="2"
//                   viewBox="0 0 24 24"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   height="1em"
//                   width="1em"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <circle cx="12" cy="12" r="10"></circle>
//                   <line x1="12" y1="8" x2="12" y2="12"></line>
//                   <line x1="12" y1="16" x2="12.01" y2="16"></line>
//                 </svg>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Middle Line: Logo, Cart, Wishlist, and Account */}
//       <div className="bg-gray-100">
//         <div className="container mx-auto flex justify-between items-center px-4 py-4">
//           {/* Logo */}
//           <div className="flex-1 text-center sm:text-left">
//             <div className="flex space-x-2 justify-center sm:justify-start">
//               <Image src="/Logo Icon.png" alt="logo" width={40} height={40} />
//               <span className="text-xl font-bold">Comforty</span>
//             </div>
//           </div>

//           {/* Cart Section */}
//           <Link href="/Cart">
//             <div className="flex items-center  px-3 py-1">
//               <CiShoppingCart className="h-5 w-5 text-indigo-900" />
//               <span className=" text-black text-xs font-semibold  rounded-full w-5 h-5 flex items-center justify-center">
//                 {cartItemCount}
//               </span>
//             </div>
//           </Link>
//            {/* Wishlist Section */}
//            <Link href="/Wishlist">
//             <div className="flex items-center  px-3 py-1">
//               <span className=" text-black text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
//                 {wishlistItemCount} <FaHeart className="h-10 w-10 font-extrabold text-lg text-red-500 gap-3" />
//               </span>
//             </div>
//           </Link>
//           <Link href="/login">
//           <div className="relative">
            
//   <SignedOut>
//     <div className="flex space-x-4">
//       <SignInButton>
//         <button className="text-indigo-900 hover:underline">Sign In</button>
//       </SignInButton>
    
//     </div>
//   </SignedOut>
//   <SignedIn>
//     <div className="flex space-x-4">
//       <p className="text-indigo-900">Welcome, User</p> {/* Welcome message */}
//       <UserButton />
//     </div>
//   </SignedIn>
//     </div> 
//     </Link>    
//     </div>
    
//     </div>
     
//       {/* Bottom Line: Navigation Menu */}
//       <nav className="bg-white border-t border-b-2 border-gray-300">
//         <div className="container mx-auto w-full h-[74px] flex justify-between items-center px-4 py-4">
//           {/* Menu Items */}
//           <ul className="hidden sm:flex space-x-8 text-gray-700">
//             <li>
//               <Link href="/Home" className="text-teal-900 hover:text-teal-500">
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link href="/Shop" className="text-teal-900 hover:text-teal-500">
//                 Shop
//               </Link>
//             </li>
//             <li>
//               <Link href="/Product" className="text-teal-900 hover:text-teal-500">
//                 Product
//               </Link>
//             </li>
//             <li>
//               <Link href="/Pages" className="text-teal-900 hover:text-teal-500">
//                 Pages
//               </Link>
//             </li>
//             <li>
//               <Link href="/AboutUs" className="text-teal-900 hover:text-teal-500">
//                 About Us
//               </Link>
//             </li>
//           </ul>
//           <div className="mr-4 hover:underline hidden sm:block">
//             <Link href="/Contact" className="text-teal-900 hover:text-teal-500">
//               ContactUs: 03145531971
//             </Link>
//           </div>

//           {/* Mobile Hamburger Menu */}
//           <div className="sm:hidden flex items-center">
//             <button onClick={toggleMobileMenu}>
//               {isMobileMenuOpen ? (
//                 <HiX className="h-6 w-6 text-teal-500" />
//               ) : (
//                 <HiMenu className="h-6 w-6 text-teal-500" />
//               )}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       {isMobileMenuOpen && (
//         <div className="sm:hidden bg-white px-4 py-2 ">
//           <ul className="space-y-4 text-center text-gray-700">
//             <li>
//               <Link href="/Home" className=" text-teal-500 hover:text-teal-950 flex items-center space-x-1">
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link href="/Shop" className=" text-teal-500 hover:text-teal-950 flex items-center space-x-1">
//                 Shop
//               </Link>
//             </li>
//             <li>
//               <Link href="/Product" className=" text-teal-500 hover:text-teal-950 flex items-center space-x-1">
//                 Product
//               </Link>
//             </li>
//             <li>
//               <Link href="/Pages" className=" text-teal-500 hover:text-teal-950 flex items-center space-x-1">
//                 Pages
//               </Link>
//             </li>
//             <li>
//               <Link href="/AboutUs" className=" text-teal-500 hover:text-teal-950 flex items-center space-x-1">
//                 About Us
//               </Link>
//             </li>
//             {/* Mobile Order Link */}
//             <li>
//               <Link href="/Contact" className=" text-teal-500 hover:text-teal-950 flex items-center space-x-1">
//                 ContactUs: 035162895
//               </Link>
//             </li>
//           </ul>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Navbar;

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CiShoppingCart } from 'react-icons/ci';
import { FiChevronDown } from 'react-icons/fi';
import Link from 'next/link';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaHeart } from 'react-icons/fa';
import { useCart } from '../context/cartContext';
import { useWishlist } from '../context/wishlistContext';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { cart } = useCart();
  const { wishlist } = useWishlist();

  // Calculate total items in the cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Wishlist item count
  const wishlistItemCount = wishlist.length;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <header className="shadow bg-indigo-950">
      {/* Top Line */}
      <div className="bg-indigo-950 text-white text-sm">
        <div className="container opacity-70 mx-auto flex justify-between items-center px-4 py-2">
          <span>✓ Free Shipping On All Orders Over $50</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center hover:underline">
              <span>Eng</span>
              <FiChevronDown className="w-4 h-4 ml-1 text-gray-300" />
            </div>
            <Link href="/Faqs" className="hover:underline">
              FAQs
            </Link>
            <div className="flex items-center gap-2 hover:underline">
              <Link href="#" className="flex items-center space-x-1">
                <span>Need Help</span>
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Line: Logo, Cart, Wishlist, and Account */}
      <div className="bg-gray-100">
        <div className="container mx-auto flex justify-between items-center px-4 py-4">
          {/* Logo */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex space-x-2 justify-center sm:justify-start">
              <Image src="/Logo Icon.png" alt="logo" width={40} height={40} />
              <span className="text-xl font-bold">Comforty</span>
            </div>
          </div>

          {/* Cart Section */}
          <Link href="/Cart">
            <div className="flex items-center px-3 py-1">
              <CiShoppingCart className="h-5 w-5 text-indigo-900" />
              <span className="text-black text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            </div>
          </Link>

          {/* Wishlist Section */}
          <Link href="/Wishlist">
            <div className="flex items-center px-3 py-1">
              <FaHeart className="h-5 w-5 text-red-500" />
              <span className="text-black text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                {wishlistItemCount}
              </span>
            </div>
          </Link>

          {/* Account Section */}
          <div className="relative">
            <SignedOut>
              <div className="flex space-x-4">
                <SignInButton>
                  <button className="text-indigo-900 hover:underline">Sign In</button>
                </SignInButton>
              </div>
            </SignedOut>
            <SignedIn>
              <div className="flex space-x-4">
                <p className="text-indigo-900">Welcome, User</p>
                <UserButton />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>

      {/* Bottom Line: Navigation Menu */}
      <nav className="bg-white border-t border-b-2 border-gray-300">
        <div className="container mx-auto w-full h-[74px] flex justify-between items-center px-4 py-4">
          {/* Menu Items */}
          <ul className="hidden sm:flex space-x-8 text-gray-700">
            <li>
              <Link href="/Home" className="text-teal-900 hover:text-teal-500">
                Home
              </Link>
            </li>
            <li>
              <Link href="/Shop" className="text-teal-900 hover:text-teal-500">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/Product" className="text-teal-900 hover:text-teal-500">
                Product
              </Link>
            </li>
            <li>
              <Link href="/Pages" className="text-teal-900 hover:text-teal-500">
                Pages
              </Link>
            </li>
            <li>
              <Link href="/AboutUs" className="text-teal-900 hover:text-teal-500">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/order" className="text-teal-900 hover:text-teal-500">
                Order
              </Link>
            </li>
          </ul>
          <div className="mr-4 hover:underline hidden sm:block">
            <Link href="/Contact" className="text-teal-900 hover:text-teal-500">
              ContactUs: 03145531971
            </Link>
          </div>

          {/* Mobile Hamburger Menu */}
          {/* <div className="sm:hidden flex items-center">
            <button onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? (
                <HiX className="h-6 w-6 text-teal-500" />
              ) : (
                <HiMenu className="h-6 w-6 text-teal-500" />
              )}
            </button>
          </div> */}{/* Mobile Hamburger Menu */}
<div className="sm:hidden flex items-center">
  <button onClick={toggleMobileMenu}>
    {isMobileMenuOpen ? (
      <HiX className="h-6 w-6 text-teal-500" />
    ) : (
      <HiMenu className="h-6 w-6 text-teal-500" />
    )}
  </button>
</div>
        </div>
      </nav>

      {/* Mobile Menu */}
    
      {isMobileMenuOpen && (
  <>
    {/* Overlay */}
    <div
      className="fixed inset-0 bg-black opacity-50 z-10"
      onClick={toggleMobileMenu}
    ></div>

    {/* Menu */}
    <div className="fixed top-0 left-0 w-full h-full bg-white z-20 transform transition-all duration-300 ease-in-out">
      <div className="flex justify-end p-4">
        <button onClick={toggleMobileMenu}>
          <HiX className="h-6 w-6 text-teal-500" />
        </button>
      </div>
      <ul className="flex flex-col items-center space-y-6 text-gray-700 text-lg font-semibold">
        <li>
          <Link href="/Home" className="text-teal-500 hover:text-teal-950">
            Home
          </Link>
        </li>
        <li>
          <Link href="/Shop" className="text-teal-500 hover:text-teal-950">
            Shop
          </Link>
        </li>
        <li>
          <Link href="/Product" className="text-teal-500 hover:text-teal-950">
            Product
          </Link>
        </li>
        <li>
          <Link href="/Pages" className="text-teal-500 hover:text-teal-950">
            Pages
          </Link>
        </li>
        <li>
          <Link href="/AboutUs" className="text-teal-500 hover:text-teal-950">
            About Us
          </Link>
        </li>
        <li>
          <Link href="/Order" className="text-teal-500 hover:text-teal-950">
            Order
          </Link>
        </li>
        <li>
          <Link href="/Contact" className="text-teal-500 hover:text-teal-950">
            ContactUs: 035162895
          </Link>
        </li>
      </ul>
    </div>
  </>
)}
    </header>
  );
};

export default Navbar;

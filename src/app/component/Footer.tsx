'use client';
import { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaCcPaypal,
  FaCcVisa,
  FaCcMastercard,
} from "react-icons/fa";

const Footer: FC = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Handle the form submission
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the page from refreshing
    if (email) {
      setIsSubscribed(true); // Set subscription status to true
      setEmail(""); // Clear the input field
    }
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main content area */}
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Logo and About Section */}
        <div className="flex flex-col items-start">
          <div className="flex items-center space-x-2 text-xl font-semibold text-gray-800">
            <Image
              src="/Logo Icon.png"
              alt="Comforty Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <span>Comforty</span>
          </div>
          <p className="mt-4 text-sm text-gray-600 leading-relaxed">
            Comforty giving you the best library stool chairs,
            <br />
            at cheap prices with discounts.
            <br />
            Check out our new sales.
          </p>
          <div className="flex space-x-4 mt-6">
            <Link href="#" aria-label="Facebook">
              <FaFacebookF className="text-gray-500 hover:text-teal-500 transition-colors" size={20} />
            </Link>
            <Link href="#" aria-label="Twitter">
              <FaTwitter className="text-gray-500 hover:text-teal-500 transition-colors" size={20} />
            </Link>
            <Link href="#" aria-label="Instagram">
              <FaInstagram className="text-gray-500 hover:text-teal-500 transition-colors" size={20} />
            </Link>
            <Link href="#" aria-label="YouTube">
              <FaYoutube className="text-gray-500 hover:text-teal-500 transition-colors" size={20} />
            </Link>
          </div>
        </div>

        {/* Category Links */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Category</h3>
          <ul className="mt-4 space-y-2">
            {["Sofa", "Armchair", "Wing Chair", "Desk Chair", "Wooden Chair", "Park Bench"].map(
              (category, index) => (
                <li key={index}>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-teal-500 hover:underline transition-colors text-sm"
                  >
                    {category}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Support</h3>
          <ul className="mt-4 space-y-2">
            {["Help & Support", "Terms & Conditions", "Privacy Policy", "Help"].map((support, index) => (
              <li key={index}>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-teal-500 hover:underline transition-colors text-sm"
                >
                  {support}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Section */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Newsletter</h3>
          <form className="mt-4 flex flex-col sm:flex-row" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Your email"
              className="w-full sm:flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-r-md text-sm font-medium"
            >
              Subscribe
            </button>
          </form>
          {isSubscribed && (
            <p className="text-xs text-green-600 mt-2">
              Thank you for subscribing! You'll receive updates soon.
            </p>
          )}
          <p className="text-xs text-gray-600 mt-2">
            Enter your email to get personalized discounts and updates on our new chairs.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
          <p className="text-center sm:text-left">
            © 2024 – Comforty. Designed & Developed by{" "}
            <Link href="#" className="text-teal-500 hover:text-teal-600 transition-colors">
              Mehwish Sheikh
            </Link>
          </p>
          <div className="flex justify-center sm:justify-start space-x-4 mt-2 sm:mt-0">
            <FaCcPaypal size={32} className="text-gray-500 hover:text-teal-500 transition-colors" />
            <FaCcVisa size={32} className="text-gray-500 hover:text-teal-500 transition-colors" />
            <FaCcMastercard size={32} className="text-gray-500 hover:text-teal-500 transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

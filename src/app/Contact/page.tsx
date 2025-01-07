

'use client';              
import React, { useState } from "react";
import Head from "next/head";
import { BiSupport } from "react-icons/bi";
import { SlTrophy } from "react-icons/sl";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("Form submitted:", formData);
      alert("Thank you for contacting us!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us</title>
      </Head>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-semibold text-center text-gray-800">Get In Touch With Us</h1>
          <p className="text-gray-500 text-center mt-2 mb-12">
            For more information about our products and services, feel free to drop us an email. Our team is always here to assist you!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Section */}
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-medium text-gray-700">Address</h2>
                <p className="text-gray-600">Pakistan Karachi, Orangi Town, Sec 11/M Sufad Chock</p>
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-700">Phone</h2>
                <p className="text-gray-600">
                  Mobile: (+92) 3145531971<br />
                  Hotline: (+112) 5467877832
                </p>
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-700">Working Hours</h2>
                <p className="text-gray-600">
                  Monday - Friday: 9:00 AM - 12:00 PM<br />
                  Saturday - Sunday: 9:00 AM - 12:00 PM
                </p>
              </div>
            </div>

            {/* Right Section - Contact Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-md focus:ring focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="abc@gmail.com"
                  className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-md focus:ring focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject (Optional)</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Subject"
                  className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-md focus:ring focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Hi! I’d like to ask about..."
                  rows={4}
                  className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-md focus:ring focus:ring-teal-500 focus:border-teal-500"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-teal-500 text-white py-3 px-4 rounded-md hover:bg-teal-600 transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>

          {/* Features Section */}
          <div className="bg-gray-100 mt-16 py-8">
            <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
              {/* High Quality */}
              <div className="flex items-center space-x-6">
                <SlTrophy className="w-12 h-12 text-teal-500" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">High Quality</h3>
                  <p className="text-gray-600 text-sm">Crafted from top materials</p>
                </div>
              </div>

              {/* Warranty Protection */}
              <div className="flex items-center space-x-6">
                <IoIosCheckmarkCircleOutline className="w-12 h-12 text-teal-500" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Warranty Protection</h3>
                  <p className="text-gray-600 text-sm">Over 2 years of protection</p>
                </div>
              </div>

              {/* 24/7 Support */}
              <div className="flex items-center space-x-6">
                <BiSupport className="w-12 h-12 text-teal-500" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">24/7 Support</h3>
                  <p className="text-gray-600 text-sm">Dedicated support anytime</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;

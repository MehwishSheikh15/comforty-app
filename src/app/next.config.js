import withPWA from 'next-pwa';
/** @type {import('next').NextConfig} */

const nextConfig = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  pwa: {
    dest: 'public', // The destination folder for the service worker and related files
    register: true, // Automatically register the service worker
    skipWaiting: true, // Skip waiting for the new service worker to take control
    disable: process.env.NODE_ENV === 'development', // Disable PWA in development mode
    // next.config.js


  },
});
module.exports = {
  images: {
    domains: ['https://giaic-hackathon-template-08.vercel.app'], // Add the domain here
  },
};

export default nextConfig;

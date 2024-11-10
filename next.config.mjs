/** @type {import('next').NextConfig} */
const nextConfig = {
    // Other Next.js configurations can go here

    images: {
      domains: ['assets.aceternity.com',"api.microlink.io"], // Allow images from this external domain
    },

    // If you have other configurations, include them here
  };

  export default nextConfig;

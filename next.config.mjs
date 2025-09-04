/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add build optimizations
  swcMinify: true,
  output: 'standalone', // This reduces the final image size significantly
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        net: false,
        tls: false,
        fs: false,
      };
    }
    
    // Optimize build performance
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // vendor chunk
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
          },
        },
      },
    };
    
    return config;
  },
};

export default nextConfig;
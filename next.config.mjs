/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d3m0gx63bo3yvr.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;

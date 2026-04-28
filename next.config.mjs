/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/shop/polar-camel-ltm7201-stainless-20oz-ringneck-tumbler",
        destination:
          "/shop/polar-camel-ltm7201-stainless-steel-20oz-ringneck-tumbler-standard-lid",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

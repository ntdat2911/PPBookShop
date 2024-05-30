/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SERVER_BASE_URL: process.env.SERVER_BASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "th.bing.com",
        port: "",
        pathname: "/th/**",
      },
    ],
  },
};

export default nextConfig;

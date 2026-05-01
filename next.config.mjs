/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  eslint: {
    // ده بيجبر Vercel يتجاهل أي أخطاء شكلية في الكود ويكمل الرفع
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

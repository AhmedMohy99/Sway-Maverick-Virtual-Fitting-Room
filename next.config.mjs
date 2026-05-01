/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // ده بيسمح لـ Three.js إنه يشتغل من غير مشاكل
  transpilePackages: ['three'],
};

export default nextConfig;

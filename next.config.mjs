/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode
  reactStrictMode: true,
  
  // Explicitly set the output file tracing root to avoid lockfile warnings
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;

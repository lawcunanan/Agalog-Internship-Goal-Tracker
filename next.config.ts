import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true, // Helps catch React issues during development
	typescript: {
		ignoreBuildErrors: true, // Temporarily ignore TS errors in dev
	},
	images: {
		unoptimized: true, // Disable Next.js image optimization
	},
};

export default nextConfig;

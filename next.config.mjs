/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		minimumCacheTTL: 86400,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "graph.facebook.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "dgalywyr863hv.cloudfront.net",
				port: "",
				pathname: "/pictures/athletes/**",
			},
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "d3nn82uaxijpm6.cloudfront.net",
				port: "",
				pathname: "/assets/avatar/**",
			},
		],
	},
	async headers() {
		return [
			{
				source: "/",
				headers: [
					{
						key: "Cache-Control",
						value: "max-age=30, s-maxage=30, stale-while-revalidate=30",
					},
					{
						key: "CDN-Cache-Control",
						value: "max-age=60",
					},
					{
						key: "Vercel-CDN-Cache-Control",
						value: "max-age=60",
					},
				],
			},
		];
	},
};

import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
	dest: "public",
	// disable: process.env.NODE_ENV === "development",
	disable: true,
});

export default withPWA(nextConfig);

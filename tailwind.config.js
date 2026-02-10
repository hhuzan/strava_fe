/** @type {import('tailwindcss').Config} */
const config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: "class",
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				primary: "rgb(var(--color-primary) / <alpha-value>)",
				secondary: "rgb(var(--color-secondary) / <alpha-value>)",
				accent: "rgb(var(--color-accent) / <alpha-value>)",
				bg: "rgb(var(--color-bg) / <alpha-value>)",
				text: "rgb(var(--color-text) / <alpha-value>)",
				surface: "rgb(var(--color-surface) / <alpha-value>)",
				muted: "rgb(var(--color-muted) / <alpha-value>)",
			},
		},
	},
	plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // You can define your custom colors here
        primary: {
          // Example: GitHub dark theme colors
          DEFAULT: '#0d1117', // Dark background
          light: '#161b22',   // Lighter background
          text: '#c9d1d9',    // Primary text
          accent: '#58a6ff',  // Links and accents
        },
        secondary: {
          DEFAULT: '#21262d', // Card backgrounds
          hover: '#30363d',   // Hover states
          text: '#8b949e',    // Secondary text
        },
      },
      fontFamily: {
        sans: ['Cascadia', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config; 
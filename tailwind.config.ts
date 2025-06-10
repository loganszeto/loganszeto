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
        primary: '#1f1f28', // Dark background
        secondary: '#2a2a37', // Slightly lighter background
        accent: '#e6c384', // Your gold accent color
        'gray-custom': '#7c7c7c', // Your custom gray
        'text-primary': '#c8c093', // Primary text color
      },
      backgroundColor: {
        'page': '#1f1f28',
      },
      textColor: {
        'default': '#c8c093',
        'muted': '#7c7c7c',
        'accent': '#e6c384',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['Cascadia Code', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config; 
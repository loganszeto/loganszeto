import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#141414', // Very dark background
        secondary: '#1a1a1a', // Slightly lighter background
        'text-primary': '#c8c8c8', // Light gray text
        'text-muted': '#969696', // Muted gray text
      },
      backgroundColor: {
        'page': '#141414',
      },
      textColor: {
        'default': '#c8c8c8',
        'muted': '#969696',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'Times', 'serif'],
        mono: ['Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config; 
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkNavy: {
          light: "#3C3C5A",
          DEFAULT: "#1A1A2E",
          dark: "#0F0F1E",
        },
        deepBlue: {
          light: "#2A3A5E",
          DEFAULT: "#16213E",
          dark: "#0D1729",
        },
        mutedBlue: {
          light: "#506486",
          DEFAULT: "#0F3460",
          dark: "#071D39",
        },
        crimsonRed: {
          light: "#F27584",
          DEFAULT: "#E94560",
          dark: "#991D38",
        },
        lightGrey: {
          light: "#FFFFFF",
          DEFAULT: "#F9F9F9",
          dark: "#E6E6E6",
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Barlow Condensed'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
      colors: {
        brand: {
          orange: "#F97316",
          dark: "#0F0F0F",
          card: "#1A1A1A",
          muted: "#2A2A2A",
          border: "#333333",
        },
      },
    },
  },
  plugins: [],
};
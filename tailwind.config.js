/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1c2434", // Dark blue/slate
        secondary: "#3c50e0", // Vibrant blue
        accent: "#f9f9f9",
        danger: "#dc3545",
        success: "#219653",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

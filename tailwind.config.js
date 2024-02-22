/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgba(255, 215, 0)',      // Example primary color (60%)
        secondary: 'rgba(9, 35, 39)',    // Example secondary color (30%)
        tertiary: 'rgba(11, 83, 81)',     // Example tertiary color (10%)
      },
    },
  },
  plugins: [],
}


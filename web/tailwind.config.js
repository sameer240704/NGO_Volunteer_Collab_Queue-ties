/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust according to your file structure
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2C72B5',    // Main blue color
        secondary: '#F5F3F2',  // Light cream background
        accent: '#41A1EC',     // Lighter blue for buttons and hover states
      },
      fontFamily: {
        harmonique: ['Harmonique', 'sans-serif'], // Ensure Harmonique font is loaded in your project
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#2C72B5',
          200: '#A7C6E7',
          300: '#7DA9D6',
          400: '#5491C5',
          500: '#2C72B5',
          600: '#256DAF',
          700: '#1E6099',
          800: '#175B83',
          900: '#0F4E6D',
        },
        secondary: {
          100: "#F5F3F2"
        },
        accent: {
          100: "#41A1EC"
        }
      },
    },
  },
  plugins: [],
};

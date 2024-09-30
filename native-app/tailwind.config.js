/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#364423",
          200: "#dee8cf",
          300: "#36D080",
          400: "#4a9f2f"
        },
        secondary: {
          100: "#f2f3ed",
          200: "#b0b0b0"
        },
      },
    },
  },
  plugins: [],
};

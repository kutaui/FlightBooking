/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    screens: {
      "sm": {
        min: "360px",
        max: "700px",
      },
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {

        "2xl": "1400px",
      },
    },
    extend: {

    },
  },
  plugins: [require("tailwindcss-animate")],
}
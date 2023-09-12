/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        dark: 'rgb(22 17 25/1)',
        darker: 'rgb(22 17 25/0.5)',
      }
    },
  },
  plugins: [],
}
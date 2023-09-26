/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        dark: 'rgba(52,53,65,1)',
        darker: 'rgba(52,53,68,1)',
      },
      height: {
        dvh: '100dvh',
      },
      maxHeight: {
        messagesH: 'calc(100dvh - 8rem)',
      },
    },
  },
  plugins: [],
}
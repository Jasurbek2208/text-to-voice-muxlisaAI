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
        opacityDark: "rgba(52,53,68, .5)",
        opacityWhite: "rgb(243 244 246 / .5)",
      },
      height: {
        dvh: '100dvh',
      },
      maxHeight: {
        dvh: '100dvh',
        messagesH: 'calc(100dvh - 8rem - 1.5rem)',
      },
      minHeight: {
        dvh: '100dvh',
      },
      fill: {
        darker: 'rgba(52,53,68,1)',
      },
      textColor: {
        darker: 'rgba(52,53,68,1)',
      },
      fontSize: {
        xxs: "0.70rem"
      }
    },
  },
  plugins: [],
}
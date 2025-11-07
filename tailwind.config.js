/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        'ipssi-blue': '#007bff',
        'ipssi-green': '#CCFF00',
        'ipssi-yellow': '#FFD700',
        'ipssi-lime': '#D4FF00',
        'ipssi-pink': '#fda4af',
        'ipssi-purple': '#c084fc',
      },
      boxShadow: {
        'cartoon': '0 8px 0 0 rgba(0,0,0,0.2)',
        'cartoon-sm': '0 4px 0 0 rgba(0,0,0,0.2)',
        'cartoon-hover': '0 4px 0 0 rgba(0,0,0,0.2)',
      },
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sky: {
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
        }
      },
      keyframes: {
        spin: {
          '0%': { '--rotate': '0deg' },
          '100%': { '--rotate': '360deg' },
        },
        grow: {
          '0%': { '--fill-percentage': '99%' },
          '100%': { '--fill-percentage': '0%' },
        },
        'fade-out': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        'cycle-colors': {
          '0%': { '--border-color': '#5ddcff' },
          '50%': { '--border-color': '#3c67e3' },
          '100%': { '--border-color': '#f059eb' },
        }
      },
      animation: {
        spin: 'spin 2s ease-in-out infinite', // Changed from linear to ease-in-out
        'gradient-border': 'spin 2s linear infinite, grow 4s linear forwards, cycle-colors 4s ease-in-out infinite alternate',
        'fade-out': 'fade-out 1.5s ease-out forwards',
      }
    },
  },
  plugins: [],
}
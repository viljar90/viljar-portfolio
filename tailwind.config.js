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
        },
        'lively-scale-in': {
          '0%': { transform: 'scale(0.01)', opacity: '0' },
          '80%': { transform: 'scale(1.2)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'scale-out': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.01)', opacity: '0' },
        },
        'click-bounce': {
          '0%': { transform: 'scale(0.1)' },
          '80%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
        // --- ADD THIS NEW KEYFRAME ---
        'text-bounce': {
          '0%': { transform: 'scale(1)' },
          '40%': { transform: 'scale(0.9)' },
          '80%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        }
      },
      animation: {
        spin: 'spin 2s ease-in-out infinite',
        'gradient-border': 'spin 2s linear infinite, grow 4s linear forwards, cycle-colors 4s ease-in-out infinite alternate',
        'fade-out': 'fade-out 1.5s ease-out forwards',
        'scale-in': 'lively-scale-in 0.3s ease-out',
        'scale-out': 'scale-out 0.3s ease-out forwards',
        'click-bounce': 'click-bounce 0.3s ease-out',
        'text-bounce': 'text-bounce 0.3s ease-in-out',
      }
    },
  },
  plugins: [],
}
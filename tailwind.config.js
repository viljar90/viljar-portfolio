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
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        error: 'var(--color-error)',
        'text-base': 'var(--color-text-base)',
        'text-muted': 'var(--color-text-muted)',
        'text-interactive-muted': 'var(--color-text-interactive-muted)',
        'border-interactive': 'var(--color-border-interactive)',
        'icon-static': 'var(--color-icon-static)',
        'icon-base': 'var(--color-icon-base)',
        'icon-interactive': 'var(--color-icon-interactive)',
        'bg-base': 'var(--color-bg-base)',
        'bg-overlay': 'var(--color-bg-overlay)',
        'bg-muted': 'var(--color-bg-muted)',
        'anim-1': 'var(--color-anim-1)',
        'anim-2': 'var(--color-anim-2)',
        'anim-3': 'var(--color-anim-3)',
      },
      scale: {
        '103': '1.03',
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
          '0%': { '--border-color': 'var(--color-anim-1)' },
          '50%': { '--border-color': 'var(--color-anim-2)' },
          '100%': { '--border-color': 'var(--color-anim-3)' },
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
        'text-bounce': {
          '0%': { transform: 'scale(1)' },
          '40%': { transform: 'scale(0.9)' },
          '80%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        'slide-in-from-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-from-left': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-out-to-left': {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(-100%)', opacity: '0' },
        },
        'slide-out-to-right': {
            '0%': { transform: 'translateX(0)', opacity: '1' },
            '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
      },
      animation: {
        spin: 'spin 2s ease-in-out infinite',
        'gradient-border': 'spin 2s linear infinite, grow 4s linear forwards, cycle-colors 4s ease-in-out infinite alternate',
        'fade-out': 'fade-out 1.5s ease-out forwards',
        'scale-in': 'lively-scale-in 0.3s ease-out',
        'scale-out': 'scale-out 0.3s ease-out forwards',
        'click-bounce': 'click-bounce 0.3s ease-out',
        'text-bounce': 'text-bounce 0.3s ease-in-out',
        shake: 'shake 0.5s ease-in-out',
        'slide-in-right': 'slide-in-from-right 0.4s ease-out forwards',
        'slide-in-left': 'slide-in-from-left 0.4s ease-out forwards',
        'slide-out-left': 'slide-out-to-left 0.4s ease-out forwards',
        'slide-out-right': 'slide-out-to-right 0.4s ease-out forwards',
      }
    },
  },
  plugins: [],
}
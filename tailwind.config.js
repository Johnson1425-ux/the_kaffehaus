/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Inter', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        gold: {
          300: '#f0d080',
          400: '#e6c040',
          500: '#d4a017',
          600: '#b8860b',
        },
        charcoal: {
          800: '#1a1a1a',
          900: '#0d0d0d',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'fade-in': 'fadeIn 1s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

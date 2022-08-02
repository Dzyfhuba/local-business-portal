/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{tsx,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#21BB00',
        secondary: '#9900BB',
        base: '#FFF5F5'
      },
    },
  },
  important: true,
  plugins: [],
}

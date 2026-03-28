/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: '#D4AF37',
          pink: '#E8B4B8',
          beige: '#F5F5DC',
          cream: '#FCF8F4',
          dark: '#3D1C1F',
          light: '#FFF5F6',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'serif'],
        decorative: ['Cinzel Decorative', 'Cinzel', 'serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

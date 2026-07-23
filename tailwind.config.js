/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'matrix-green': '#00ff41',
        'matrix-dark': '#0a0e27',
        'matrix-darker': '#0d1117',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      colors: {
        'primary': '#10B981',
        'secondary': '#3B82F6',
      }
    },
  },
  plugins: [],
}
